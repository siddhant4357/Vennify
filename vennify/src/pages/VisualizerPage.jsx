import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import MathLines from '../components/MathLines';

const VisualizerPage = () => {
  const [sets, setSets] = useState({
    A: { name: 'Set A', elements: new Set(), rawInput: '' },
    B: { name: 'Set B', elements: new Set(), rawInput: '' },
    C: { name: 'Set C', elements: new Set(), rawInput: '' }
  });

  const [currentOperation, setCurrentOperation] = useState(null);
  const [result, setResult] = useState(new Set());
  const [viewType, setViewType] = useState('three');
  const diagramRef = useRef(null);

  // Add new state for question builder
  const [questionInput, setQuestionInput] = useState('');
  const [parsedQuestion, setParsedQuestion] = useState(null);
  const [isQuestionEvaluated, setIsQuestionEvaluated] = useState(false);

  const twoSetOperations = [
    { name: 'Union (A ∪ B)', fn: (a, b) => new Set([...a, ...b]) },
    { name: 'Intersection (A ∩ B)', fn: (a, b) => new Set([...a].filter(x => b.has(x))) },
    { name: 'Difference (A - B)', fn: (a, b) => new Set([...a].filter(x => !b.has(x))) },
    { name: 'Difference (B - A)', fn: (a, b) => new Set([...b].filter(x => !a.has(x))) },
    { name: 'Symmetric Difference', fn: (a, b) => new Set([...[...a].filter(x => !b.has(x)), ...[...b].filter(x => !a.has(x))]) },
    { 
      name: 'Is A ⊆ B?', 
      fn: (a, b) => new Set([Array.from(a).every(x => b.has(x))]),
      isBoolean: true 
    },
    { 
      name: 'Is B ⊆ A?', 
      fn: (a, b) => new Set([Array.from(b).every(x => a.has(x))]),
      isBoolean: true 
    }
  ];

  const threeSetOperations = [
    { name: 'Union (A ∪ B ∪ C)', fn: (a, b, c) => new Set([...a, ...b, ...c]) },
    { name: 'Intersection (A ∩ B ∩ C)', fn: (a, b, c) => new Set([...a].filter(x => b.has(x) && c.has(x))) },
    { name: 'A ∩ B - C', fn: (a, b, c) => new Set([...a].filter(x => b.has(x) && !c.has(x))) },
    { name: '(A ∪ B) ∩ C', fn: (a, b, c) => new Set([...new Set([...a, ...b])].filter(x => c.has(x))) },
    { 
      name: 'Is A ⊆ B ⊆ C?', 
      fn: (a, b, c) => new Set([
        Array.from(a).every(x => b.has(x)) && 
        Array.from(b).every(x => c.has(x))
      ]),
      isBoolean: true 
    }
  ];

  // Add operator buttons config
  const operatorButtons = [
    { symbol: 'A', type: 'set' },
    { symbol: 'B', type: 'set' },
    { symbol: 'C', type: 'set' },
    { symbol: '∪', type: 'operator', name: 'Union' },
    { symbol: '∩', type: 'operator', name: 'Intersection' },
    { symbol: '-', type: 'operator', name: 'Difference' },
    { symbol: '(', type: 'bracket' },
    { symbol: ')', type: 'bracket' },
    { symbol: '⊆', type: 'operator', name: 'Subset' },
  ];

  const handleSetChange = (setKey, value) => {
    const elements = new Set(value.split(',').map(x => x.trim()).filter(Boolean));
    setSets(prev => ({
      ...prev,
      [setKey]: { 
        ...prev[setKey], 
        elements,
        rawInput: value
      }
    }));
  };

  const handleSetNameChange = (setKey, name) => {
    setSets(prev => ({
      ...prev,
      [setKey]: { ...prev[setKey], name }
    }));
  };

  const handleOperation = (operation) => {
    setCurrentOperation(operation.name);
    const { A, B, C } = sets;
    if (viewType === 'two') {
      setResult(operation.fn(A.elements, B.elements));
    } else {
      setResult(operation.fn(A.elements, B.elements, C.elements));
    }
  };

  const clearAll = () => {
    setSets({
      A: { name: 'Set A', elements: new Set(), rawInput: '' },
      B: { name: 'Set B', elements: new Set(), rawInput: '' },
      C: { name: 'Set C', elements: new Set(), rawInput: '' }
    });
    setCurrentOperation(null);
    setResult(new Set());
  };

  const downloadDiagram = () => {
    const svg = document.querySelector('#venn-diagram svg');
    // Create a clone of the SVG for download
    const clonedSvg = svg.cloneNode(true);
    
    // Adjust opacities for download
    clonedSvg.querySelectorAll('stop').forEach(stop => {
      const currentOpacity = parseFloat(stop.getAttribute('stop-opacity'));
      stop.setAttribute('stop-opacity', Math.min(currentOpacity * 1.5, 1.0));
    });
    
    clonedSvg.querySelectorAll('circle').forEach(circle => {
      const currentOpacity = parseFloat(circle.style.fillOpacity);
      circle.style.fillOpacity = Math.min(currentOpacity * 1.5, 1.0);
    });

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(clonedSvg);
    const blob = new Blob([source], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'venn-diagram.svg';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  const evaluateExpression = (expression) => {
    try {
      const evaluateSimpleExpression = (tokens) => {
        const stack = [];
        let result = null;

        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          
          if (token === 'A' || token === 'B' || token === 'C') {
            if (!sets[token]?.elements) {
              throw new Error(`Set ${token} is not defined`);
            }
            if (result === null) {
              result = new Set([...sets[token].elements]);
            } else {
              const operator = stack.pop();
              if (!operator) throw new Error('Missing operator');
              
              switch (operator) {
                case '∪':
                  result = new Set([...result, ...sets[token].elements]);
                  break;
                case '∩':
                  result = new Set([...result].filter(x => sets[token].elements.has(x)));
                  break;
                case '-':
                  result = new Set([...result].filter(x => !sets[token].elements.has(x)));
                  break;
                case '⊆':
                  result = new Set([Array.from(result).every(x => sets[token].elements.has(x))]);
                  break;
              }
            }
          } else if (token === '∪' || token === '∩' || token === '-' || token === '⊆') {
            stack.push(token);
          }
        }
        return result;
      };

      // Recursively evaluate nested parentheses
      const evaluateParentheses = (tokens) => {
        const stack = [];
        const output = [];

        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i] === '(') {
            // Find matching closing parenthesis
            let count = 1;
            let j = i + 1;
            let inner = [];
            
            while (j < tokens.length && count > 0) {
              if (tokens[j] === '(') count++;
              if (tokens[j] === ')') count--;
              if (count > 0) inner.push(tokens[j]);
              j++;
            }

            if (count !== 0) {
              throw new Error('Mismatched parentheses');
            }

            // Recursively evaluate inner expression
            const innerResult = evaluateParentheses(inner);
            output.push(innerResult);
            i = j - 1; // Skip processed tokens
          } else if (tokens[i] !== ')') {
            output.push(tokens[i]);
          }
        }

        // Evaluate the resulting expression
        return evaluateSimpleExpression(output);
      };

      // Clean and tokenize expression
      const tokens = expression
        .replace(/([()∪∩\-⊆])/g, ' $1 ')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      // Start evaluation
      return evaluateParentheses(tokens);

    } catch (error) {
      console.error('Expression evaluation error:', error);
      alert(`Invalid expression: ${error.message}`);
      return new Set();
    }
  };

  useEffect(() => {
    if (!diagramRef.current) return;

    // Clear previous diagram
    d3.select(diagramRef.current).selectAll("*").remove();

    const width = 500;
    const height = 500;
    const radius = 100;

    const svg = d3.select(diagramRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    // Define gradients
    const defs = svg.append("defs");
    
    // Gradient for Set A
    const gradientA = defs.append("radialGradient")
      .attr("id", "gradientA")
      .attr("cx", "40%")
      .attr("cy", "40%")
      .attr("r", "60%");
    gradientA.append("stop").attr("offset", "0%").attr("stop-color", "#60A5FA").attr("stop-opacity", 0.8);
    gradientA.append("stop").attr("offset", "100%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0.5);

    // Gradient for Set B
    const gradientB = defs.append("radialGradient")
      .attr("id", "gradientB")
      .attr("cx", "40%")
      .attr("cy", "40%")
      .attr("r", "60%");
    gradientB.append("stop").attr("offset", "0%").attr("stop-color", "#A78BFA").attr("stop-opacity", 0.8);
    gradientB.append("stop").attr("offset", "100%").attr("stop-color", "#8B5CF6").attr("stop-opacity", 0.5);

    // Gradient for Set C
    const gradientC = defs.append("radialGradient")
      .attr("id", "gradientC")
      .attr("cx", "40%")
      .attr("cy", "40%")
      .attr("r", "60%");
    gradientC.append("stop").attr("offset", "0%").attr("stop-color", "#34D399").attr("stop-opacity", 0.8);
    gradientC.append("stop").attr("offset", "100%").attr("stop-color", "#059669").attr("stop-opacity", 0.5);

    // Draw circles for each set
    const circles = viewType === 'three' 
      ? [
          { x: -70, y: -40, gradient: "url(#gradientA)", label: sets.A.name },
          { x: 70, y: -40, gradient: "url(#gradientB)", label: sets.B.name },
          { x: 0, y: 80, gradient: "url(#gradientC)", label: sets.C.name }
        ]
      : [
          { x: -50, y: 0, gradient: "url(#gradientA)", label: sets.A.name },
          { x: 50, y: 0, gradient: "url(#gradientB)", label: sets.B.name }
        ];

    // Draw circles
    circles.forEach(circle => {
      svg.append("circle")
        .attr("cx", circle.x)
        .attr("cy", circle.y)
        .attr("r", radius)
        .style("fill", circle.gradient)
        .style("fill-opacity", 0.5)
        .style("stroke", "white")
        .style("stroke-width", 1)
        .on("mouseover", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill-opacity", 0.8);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill-opacity", 0.5);
        });

      // Add labels
      svg.append("text")
        .attr("x", circle.x)
        .attr("y", circle.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "white")
        .style("font-size", "14px")
        .text(circle.label);
    });

    // Add size indicators
    circles.forEach((circle, i) => {
      const set = Object.values(sets)[i];
      svg.append("text")
        .attr("x", circle.x)
        .attr("y", circle.y + 20)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text(`Size: ${set.elements.size}`);
    });

    // Add intersection indicators if there are elements
    if (currentOperation) {
      const resultText = svg.append("text")
        .attr("x", 0)
        .attr("y", -height/2 + 30)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "14px")
        .text(`${currentOperation}: ${[...result].join(', ')}`);
    }

    // Update the displayElements function
    const displayElements = (elements, x, y) => {
      const elementArray = Array.from(elements);
      if (elementArray.length === 0) return;

      // Create a container for the elements
      const container = svg.append("g")
        .attr("transform", `translate(${x}, ${y})`);

      // Improved background for better visibility
      container.append("rect")
        .attr("x", -40)  // Increased width
        .attr("y", -10)
        .attr("width", 80) // Increased width
        .attr("height", elementArray.length * 20 + 8) // Increased height
        .attr("rx", 4)
        .attr("fill", "rgba(0, 0, 0, 0.7)") // Darker background
        .attr("stroke", "rgba(255, 255, 255, 0.2)");

      // Display elements with better spacing
      elementArray.forEach((element, i) => {
        container.append("text")
          .attr("x", 0)
          .attr("y", i * 20) // Increased spacing
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("fill", "white")
          .style("font-size", "14px") // Larger font
          .style("font-weight", "500") // Bolder text
          .text(element);
      });
    };

    // Update the element positions inside useEffect
    if (viewType === 'three') {
      const AB = new Set([...sets.A.elements].filter(x => sets.B.elements.has(x)));
      const BC = new Set([...sets.B.elements].filter(x => sets.C.elements.has(x)));
      const AC = new Set([...sets.A.elements].filter(x => sets.C.elements.has(x)));
      const ABC = new Set([...AB].filter(x => sets.C.elements.has(x)));
      
      // Display single set elements
      displayElements(
        new Set([...sets.A.elements].filter(x => !sets.B.elements.has(x) && !sets.C.elements.has(x))),
        -120, -60
      ); // A only
      displayElements(
        new Set([...sets.B.elements].filter(x => !sets.A.elements.has(x) && !sets.C.elements.has(x))),
        120, -60
      ); // B only
      displayElements(
        new Set([...sets.C.elements].filter(x => !sets.A.elements.has(x) && !sets.B.elements.has(x))),
        0, 120
      ); // C only

      // Display intersections
      displayElements(ABC, 0, 0); // Center (ABC)
      displayElements(
        new Set([...AB].filter(x => !sets.C.elements.has(x))),
        0, -80
      ); // AB only
      displayElements(
        new Set([...BC].filter(x => !sets.A.elements.has(x))),
        80, 40
      ); // BC only
      displayElements(
        new Set([...AC].filter(x => !sets.B.elements.has(x))),
        -80, 40
      ); // AC only
    } else {
      // Two sets view
      const intersection = new Set([...sets.A.elements].filter(x => sets.B.elements.has(x)));
      
      displayElements(
        new Set([...sets.A.elements].filter(x => !sets.B.elements.has(x))),
        -100, 0
      ); // A only
      displayElements(intersection, 0, 0); // AB intersection
      displayElements(
        new Set([...sets.B.elements].filter(x => !sets.A.elements.has(x))),
        100, 0
      ); // B only
    }

  }, [sets, currentOperation, result, viewType]);

  // Add example questions with more complex expressions
  const exampleQuestions = [
    'A ∪ B',
    'A ∩ B',
    '( A ∪ B ) ∩ C',
    'A - ( B ∩ C )',
    '( A ∪ B ) - ( B ∩ C )',
    'A ⊆ B',
    '( A ∩ B ) ∪ C'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MathLines />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Set Operation Visualizer
        </h1>

        {/* Mobile-first grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
              {/* View Type Selector */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">View Type</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setViewType('two')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewType === 'two' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Two Sets
                  </button>
                  <button
                    onClick={() => setViewType('three')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewType === 'three' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Three Sets
                  </button>
                </div>
              </div>

              {/* Question Builder */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Question Builder</h3>
                
                {/* Expression Input */}
                <div className="mb-4">
                  <div className="bg-gray-700 rounded-lg p-3 mb-2 min-h-[40px] break-all">
                    {questionInput || 'Click buttons to build expression'}
                  </div>
                  
                  {/* Operator Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {operatorButtons.map((btn) => (
                      <button
                        key={btn.symbol}
                        onClick={() => setQuestionInput(prev => prev + ' ' + btn.symbol + ' ')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          btn.type === 'set' 
                            ? 'bg-blue-500/20 hover:bg-blue-500/30'
                            : btn.type === 'operator'
                            ? 'bg-purple-500/20 hover:bg-purple-500/30'
                            : 'bg-gray-600/20 hover:bg-gray-600/30'
                        }`}
                      >
                        {btn.symbol}
                      </button>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        try {
                          const result = evaluateExpression(questionInput);
                          setResult(result);
                          setCurrentOperation(questionInput);
                          setIsQuestionEvaluated(true);
                        } catch (error) {
                          // Add error handling UI
                          alert('Invalid expression. Please check your input.');
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      Evaluate
                    </button>
                    <button
                      onClick={() => {
                        setQuestionInput('');
                        setIsQuestionEvaluated(false);
                      }}
                      className="px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Example Questions */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Example Questions</h4>
                  <div className="flex flex-wrap gap-2">
                    {exampleQuestions.map((example) => (
                      <button
                        key={example}
                        onClick={() => setQuestionInput(example)}
                        className="px-3 py-1 text-sm bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Section */}
              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                {Object.entries(sets)
                  .filter(([key]) => viewType === 'three' || key !== 'C')
                  .map(([key, set]) => (
                    <div key={key} className="space-y-2">
                      <input
                        type="text"
                        placeholder={`${set.name} name`}
                        value={set.name}
                        onChange={(e) => handleSetNameChange(key, e.target.value)}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Enter elements (comma-separated)"
                        value={set.rawInput}
                        onChange={(e) => handleSetChange(key, e.target.value)}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                ))}
              </div>

              {/* Operations Section */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="space-y-6">
                  {viewType === 'two' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Two-Set Operations</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {twoSetOperations.map((op) => (
                          <button
                            key={op.name}
                            onClick={() => handleOperation(op)}
                            className="px-4 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            {op.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {viewType === 'three' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Three-Set Operations</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {threeSetOperations.map((op) => (
                          <button
                            key={op.name}
                            onClick={() => handleOperation(op)}
                            className="px-4 py-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
                          >
                            {op.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Result Section */}
              {currentOperation && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Result: {currentOperation}</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    {currentOperation.startsWith('Is') ? (
                      <div className={`font-bold ${
                        [...result][0] ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {[...result][0] ? 'True' : 'False'}
                      </div>
                    ) : (
                      [...result].join(', ') || 'Empty set'
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Venn Diagram Section */}
          <div className="xl:sticky xl:top-4">
            <div className="bg-gray-800 rounded-xl p-6">
              <div id="venn-diagram" ref={diagramRef} className="w-full max-w-[500px] mx-auto aspect-square" />
              
              <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Region Guide</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {viewType === 'three' ? (
                    <>
                      <div>• Center: A ∩ B ∩ C</div>
                      <div>• Top: A ∩ B</div>
                      <div>• Right: B ∩ C</div>
                      <div>• Left: A ∩ C</div>
                    </>
                  ) : (
                    <div>• Center: A ∩ B</div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={downloadDiagram}
                  className="px-4 py-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  Download Diagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;