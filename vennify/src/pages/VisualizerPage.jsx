import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import MathLines from '../components/MathLines';
import { useNavigate, Link } from 'react-router-dom';  // Add this import at the top
import Footer from '../components/Footer'; // Add this import at the top with other imports

const VisualizerPage = () => {
  const navigate = useNavigate();  // Add this hook
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add state for mobile menu

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

  // Update the diagram dimensions and responsiveness
  useEffect(() => {
    if (!diagramRef.current) return;

    // Clear previous diagram
    d3.select(diagramRef.current).selectAll("*").remove();

    // Make diagram responsive
    const containerWidth = diagramRef.current.clientWidth;
    const width = Math.min(500, Math.min(containerWidth, window.innerWidth * 0.9));
    const height = width; // Keep aspect ratio 1:1
    const radius = width * (window.innerWidth < 640 ? 0.15 : 0.2); // Smaller radius on mobile

    const svg = d3.select(diagramRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `${-width/2} ${-height/2} ${width} ${height}`)
      .append('g');

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

    // Update circle positions based on screen size
    const circles = viewType === 'three' 
      ? [
          { x: -radius*0.7, y: -radius*0.4, gradient: "url(#gradientA)", label: sets.A.name },
          { x: radius*0.7, y: -radius*0.4, gradient: "url(#gradientB)", label: sets.B.name },
          { x: 0, y: radius*0.8, gradient: "url(#gradientC)", label: sets.C.name }
        ]
      : [
          { x: -radius*0.5, y: 0, gradient: "url(#gradientA)", label: sets.A.name },
          { x: radius*0.5, y: 0, gradient: "url(#gradientB)", label: sets.B.name }
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
   // Update the result display section
if (currentOperation) {
  const resultArray = result ? Array.from(result) : [];
  const resultText = svg.append("text")
    .attr("x", 0)
    .attr("y", -height/2 + 30)
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .style("font-size", "14px")
    .text(`${currentOperation}: ${resultArray.join(', ')}`);
}

    // Update the displayElements function
    const displayElements = (elements, x, y) => {
      // Ensure elements is iterable by converting to Array and handling null/undefined
      const elementArray = elements ? Array.from(elements) : [];
      if (elementArray.length === 0) return;

      // Create a container for the elements
      const container = svg.append("g")
        .attr("transform", `translate(${x}, ${y})`);

      // Improved background for better visibility
      container.append("rect")
        .attr("x", -40)
        .attr("y", -10)
        .attr("width", 80)
        .attr("height", elementArray.length * 20 + 8)
        .attr("rx", 4)
        .attr("fill", "rgba(0, 0, 0, 0.7)")
        .attr("stroke", "rgba(255, 255, 255, 0.2)");

      // Display elements with better spacing
      elementArray.forEach((element, i) => {
        container.append("text")
          .attr("x", 0)
          .attr("y", i * 20)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("fill", "white")
          .style("font-size", "14px")
          .style("font-weight", "500")
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  // Update the main container structure
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <MathLines />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo section - unchanged */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vennify</span>
            </div>

            {/* Desktop menu - unchanged */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/visualizer" className="text-gray-300 hover:text-white transition-colors">Visualizer</Link>
              <Link to="/theory" className="text-gray-300 hover:text-white transition-colors">Learn</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            </div>

            {/* Mobile menu button - add onClick handler */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Add Mobile Menu Panel */}
          <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 h-auto' 
              : 'opacity-0 -translate-y-full pointer-events-none h-0'
          }`}>
            <div className="container mx-auto px-6 py-4 space-y-4">
              <Link 
                to="/#features" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link 
                to="/visualizer" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Visualizer
              </Link>
              <Link 
                to="/theory" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Learn
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Rest of your content */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Venn Diagram Section */}
              <div className="xl:sticky xl:top-4 order-1 xl:order-2 w-full">
                <div className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-[95vw] mx-auto">
                  <div 
                    id="venn-diagram" 
                    ref={diagramRef} 
                    className="w-full aspect-square max-w-[min(500px,90vw)] mx-auto overflow-hidden"
                  />
                  
                  {/* Responsive Region Guide */}
                  <div className="mt-4 bg-gray-700/50 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Region Guide</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm min-w-[200px]">
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

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                    <button
                      onClick={clearAll}
                      className="px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors w-full sm:w-auto"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={downloadDiagram}
                      className="px-4 py-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors w-full sm:w-auto"
                    >
                      Download Diagram
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="space-y-6 order-2 xl:order-1">
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
                            result instanceof Set && Array.from(result)[0] ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {result instanceof Set && Array.from(result)[0] ? 'True' : 'False'}
                          </div>
                        ) : (
                          result instanceof Set ? Array.from(result).join(', ') : 'Empty set'
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default VisualizerPage;