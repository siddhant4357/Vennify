import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MathLines from '../components/MathLines';
import { Link, useNavigate } from 'react-router-dom';

const RealWorldIllustration = ({ type }) => {
  // Original RealWorldIllustration component (unchanged)
  switch (type) {
    case 'Union':
      return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 aspect-square flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {/* Class A Students */}
            <div className="flex flex-wrap gap-2 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-sm border border-blue-400">
                  A{n}
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center my-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                ∪
              </div>
            </div>
            {/* Class B Students */}
            <div className="flex flex-wrap gap-2 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm border border-purple-400">
                  B{n}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">Combined Class Event</p>
        </div>
      );

    case 'Intersection':
      return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 aspect-square flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="mb-2 text-sm text-blue-400">Math Class</div>
              <div className="grid grid-cols-2 gap-2 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                {['A', 'B', 'C', 'D'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-sm text-purple-400">Physics Class</div>
              <div className="grid grid-cols-2 gap-2 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                {['B', 'C', 'E', 'F'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <div className="text-sm text-cyan-400 mb-2 text-center">Students in Both</div>
            <div className="flex gap-2">
              {['B', 'C'].map(student => (
                <div key={student} className="w-8 h-8 rounded-full bg-cyan-500/30 flex items-center justify-center text-xs border border-cyan-400">
                  {student}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Difference':
      return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 aspect-square flex flex-col items-center justify-center">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-blue-400 mb-2">Math Only Students</div>
              <div className="flex gap-2 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                {['A', 'D'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div>
              <div className="text-sm text-purple-400 mb-2">Physics Only Students</div>
              <div className="flex gap-2 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                {['E', 'F'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'Complement':
      return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 aspect-square flex flex-col items-center justify-center">
          <div className="w-full p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 mb-4">
            <div className="text-sm text-gray-400 mb-2 text-center">All Students</div>
            <div className="grid grid-cols-4 gap-2">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(student => (
                <div key={student} className="w-8 h-8 rounded-full bg-gray-600/30 flex items-center justify-center text-xs">
                  {student}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <div className="text-sm text-blue-400 mb-2 text-center">Not in Math Class</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['E', 'F', 'G', 'H'].map(student => (
                <div key={student} className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">
                  {student}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Symmetric Difference':
      return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 aspect-square flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="mb-2 text-sm text-blue-400">Math Only</div>
              <div className="flex flex-wrap gap-2 justify-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                {['A', 'D'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-sm text-purple-400">Physics Only</div>
              <div className="flex flex-wrap gap-2 justify-center p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                {['E', 'F'].map(student => (
                  <div key={student} className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <div className="text-sm text-cyan-400 mb-2">Students in Either (But Not Both)</div>
            <div className="flex flex-wrap gap-2 justify-center p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
              {['A', 'D', 'E', 'F'].map(student => (
                <div key={student} className="w-8 h-8 rounded-full bg-cyan-500/30 flex items-center justify-center text-xs">
                  {student}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// New component for practice questions
const PracticeQuestion = ({ operation }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Questions based on operation type
  const questions = {
    'Union': {
      question: "If A = {1, 3, 5, 7} and B = {2, 3, 5, 8}, what is A ∪ B?",
      options: [
        "{1, 2, 3, 5, 7, 8}",
        "{3, 5}",
        "{1, 2, 3, 5, 7, 8, 9}",
        "{1, 7, 2, 8}"
      ],
      correctIndex: 0,
      explanation: "The union includes all elements from both sets, without duplicates."
    },
    'Intersection': {
      question: "If A = {1, 3, 5, 7} and B = {2, 3, 5, 8}, what is A ∩ B?",
      options: [
        "{1, 2, 3, 5, 7, 8}",
        "{3, 5}",
        "{ }",
        "{1, 7}"
      ],
      correctIndex: 1,
      explanation: "The intersection contains only elements present in both sets."
    },
    'Difference': {
      question: "If A = {1, 3, 5, 7} and B = {2, 3, 5, 8}, what is A - B?",
      options: [
        "{1, 7}",
        "{2, 8}",
        "{3, 5}",
        "{1, 2, 7, 8}"
      ],
      correctIndex: 0,
      explanation: "A - B contains elements that are in A but not in B."
    },
    'Complement': {
      question: "If U = {1, 2, 3, 4, 5, 6, 7, 8} and A = {1, 3, 5, 7}, what is A′?",
      options: [
        "{2, 4, 6, 8}",
        "{1, 3, 5, 7}",
        "{1, 2, 3, 4, 5, 6, 7, 8}",
        "{ }"
      ],
      correctIndex: 0,
      explanation: "The complement contains all elements in the universal set that are not in A."
    },
    'Symmetric Difference': {
      question: "If A = {1, 3, 5, 7} and B = {2, 3, 5, 8}, what is A △ B?",
      options: [
        "{3, 5}",
        "{1, 2, 7, 8}",
        "{1, 2, 3, 5, 7, 8}",
        "{1, 3, 5, 7, 2, 8}"
      ],
      correctIndex: 1,
      explanation: "The symmetric difference contains elements in either set, but not in both."
    }
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsCorrect(index === questions[operation].correctIndex);
    setShowAnswer(true);
  };

  const reset = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
      <h4 className="font-semibold text-blue-300 mb-3">Practice Question</h4>
      <p className="text-gray-300 mb-4">{questions[operation].question}</p>
      
      <div className="space-y-2 mb-4">
        {questions[operation].options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedAnswer === index 
                ? isCorrect 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
                : 'bg-gray-700/50 border border-gray-600/30 hover:bg-gray-700'
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showAnswer && (
        <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </p>
          <p className="text-gray-300 text-sm mt-1">{questions[operation].explanation}</p>
          <button 
            className="mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

const PracticeDialog = ({ operation, isOpen, onClose }) => {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [result, setResult] = useState([]);

  if (!isOpen) return null;

  const calculateResult = (operation, a, b) => {
    switch (operation.toLowerCase()) {
      case 'union':
        return [...new Set([...a, ...b])];
      case 'intersection':
        return a.filter(item => b.includes(item));
      case 'difference':
        return a.filter(item => !b.includes(item));
      case 'complement':
        const universal = Array.from({ length: 10 }, (_, i) => i + 1);
        return universal.filter(item => !a.includes(item));
      case 'symmetric difference':
        return [...a.filter(item => !b.includes(item)), ...b.filter(item => !a.includes(item))];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl p-6 relative text-white border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Practice: {operation}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Set A</label>
            <input
              type="text"
              placeholder="Enter numbers separated by commas"
              className="w-full rounded-lg p-3 bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={(e) => {
                const values = e.target.value.split(',').map(v => v.trim());
                setSetA(values);
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Set B</label>
            <input
              type="text"
              placeholder="Enter numbers separated by commas"
              className="w-full rounded-lg p-3 bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={(e) => {
                const values = e.target.value.split(',').map(v => v.trim());
                setSetB(values);
              }}
            />
          </div>

          <button
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white
                      transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            onClick={() => setResult(calculateResult(operation, setA, setB))}
          >
            Calculate Result
          </button>

          <div className="rounded-lg p-4 bg-gray-800 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Result</h3>
            <div className="rounded-lg p-4 bg-gray-900">
              {result.length > 0 ? (
                <p className="text-blue-400">&#123;{result.join(', ')}&#125;</p>
              ) : (
                <p className="text-gray-500">Result will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TheoryPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const setOperations = [
    {
      name: "Union",
      symbol: "∪",
      notation: "A ∪ B",
      definition: "The union of two sets A and B is the set of elements that are in A, in B, or in both A and B.",
      example: {
        setA: "A = {1, 2, 3, 4}",
        setB: "B = {3, 4, 5, 6}",
        result: "A ∪ B = {1, 2, 3, 4, 5, 6}"
      },
      realWorld: "Like combining two groups of students from different classes into one group for a school event."
    },
    {
      name: "Intersection",
      symbol: "∩",
      notation: "A ∩ B",
      definition: "The intersection of two sets A and B is the set of elements that are common to both A and B.",
      example: {
        setA: "A = {1, 2, 3, 4}",
        setB: "B = {3, 4, 5, 6}",
        result: "A ∩ B = {3, 4}"
      },
      realWorld: "Like finding students who take both Mathematics and Physics classes."
    },
    {
      name: "Difference",
      symbol: "-",
      notation: "A - B",
      definition: "The difference of sets A and B (A - B) is the set of elements that are in A but not in B.",
      example: {
        setA: "A = {1, 2, 3, 4}",
        setB: "B = {3, 4, 5, 6}",
        result: "A - B = {1, 2}\nB - A = {5, 6}"
      },
      realWorld: "Like finding students who take Mathematics but don't take Physics."
    },
    {
      name: "Complement",
      symbol: "′",
      notation: "A′",
      definition: "The complement of set A is the set of all elements in the universal set that are not in A.",
      example: {
        setA: "A = {1, 2, 3, 4}",
        universal: "U = {1, 2, 3, 4, 5, 6, 7, 8}",
        result: "A′ = {5, 6, 7, 8}"
      },
      realWorld: "Like finding all students who are not in the Mathematics class."
    },
    {
      name: "Symmetric Difference",
      symbol: "△",
      notation: "A △ B",
      definition: "The symmetric difference of sets A and B is the set of elements that are in either A or B, but not in both.",
      example: {
        setA: "A = {1, 2, 3, 4}",
        setB: "B = {3, 4, 5, 6}",
        result: "A △ B = {1, 2, 5, 6}"
      },
      realWorld: "Like finding students who take either Mathematics or Physics, but not both subjects."
    }
  ];

  // Filter operations based on search term
  const filteredOperations = searchTerm 
    ? setOperations.filter(op => 
        op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        op.definition.toLowerCase().includes(searchTerm.toLowerCase()))
    : setOperations;

  const scrollToOperation = (name) => {
    const element = document.getElementById(`operation-${name}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(name);
      
      // Highlight effect
      setTimeout(() => {
        setActiveSection(null);
      }, 2000);
    }
  };



  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-gray-900 text-white">
      <MathLines />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vennify</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/visualizer" className="text-gray-300 hover:text-white transition-colors">Visualizer</Link>
              <Link to="/theory" className="text-gray-300 hover:text-white transition-colors">Learn</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            </div>
            <button className="md:hidden text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="pt-24 pb-6 bg-gradient-to-b from-blue-900/20 to-transparent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Set Theory Guide
              </h1>
              <p className="text-lg mb-8 text-gray-300">
                A comprehensive guide to understanding set operations with visual examples and practical applications.
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search operations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-800 bg-opacity-50 text-white"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {searchTerm && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {filteredOperations.map(op => (
                    <button
                      key={op.name}
                      onClick={() => {
                        scrollToOperation(op.name);
                        setSearchTerm('');
                      }}
                      className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    >
                      {op.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Quick Navigation */}
              <div className="mb-8 p-4 rounded-lg flex gap-2 flex-wrap bg-gray-900 bg-opacity-50">
                {setOperations.map(op => (
                  <button
                    key={op.name}
                    onClick={() => scrollToOperation(op.name)}
                    className="px-3 py-1 rounded-full text-sm transition-colors bg-gray-800 hover:bg-gray-700 text-gray-300"
                  >
                    {op.name} {op.symbol}
                  </button>
                ))}
              </div>

              {/* Set Operations */}
              <div className="space-y-16">
                {setOperations.map((op, index) => (
                  <div 
                    key={index} 
                    id={`operation-${op.name}`} 
                    className={`relative group scroll-mt-32 transition-all duration-500 ${
                      activeSection === op.name ? 'scale-[1.02]' : ''
                    }`}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur ${activeSection === op.name ? 'opacity-40' : 'opacity-20'}`}></div>
                    <div className="relative p-8 rounded-xl bg-gray-900 bg-opacity-50">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                          {op.name}
                        </span>
                        <span className="text-3xl ml-3 text-purple-400">{op.notation}</span>
                      </h2>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-blue-400">Definition</h3>
                          <p className="mb-4 text-gray-300">{op.definition}</p>
                          
                          <div className="p-4 mb-4 rounded-lg bg-gray-800 bg-opacity-50">
                            <h3 className="text-lg font-semibold mb-2 text-purple-400">Example</h3>
                            <div className="space-y-1 font-mono text-sm">
                              <p className="text-gray-300">{op.example.setA}</p>
                              <p className="text-gray-300">{op.example.setB}</p>
                              {op.example.universal && (
                                <p className="text-gray-300">{op.example.universal}</p>
                              )}
                              <p className="mt-2 text-blue-400">{op.example.result}</p>
                            </div>
                          </div>
                          
                          {/* Practice section */}
                          <PracticeQuestion operation={op.name} />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-blue-400">Real World Application</h3>
                          <p className="mb-4 text-gray-300">
                            {op.realWorld}
                          </p>

                          {/* Visual Representation */}
                          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-gray-400 mb-4">Visual Example</h4>
                            <RealWorldIllustration type={op.name} />
                          </div>

                          {/* Interactive Practice */}
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">Try it yourself</h4>
                            <div className="p-4 rounded-lg bg-gray-800 bg-opacity-50">
                              <button 
                                className="w-full py-3 rounded-lg text-sm transition-all bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
                                onClick={() => {
                                  setCurrentOperation(op.name);
                                  setIsPracticeOpen(true);
                                }}
                              >
                                Open Interactive Practice
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4 inline-block ml-2" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <PracticeDialog 
          operation={currentOperation}
          isOpen={isPracticeOpen}
          onClose={() => {
            setIsPracticeOpen(false);
            setCurrentOperation(null);
          }}
        />

        <Footer />
      </div>
    </div>
  );
};

export default TheoryPage;