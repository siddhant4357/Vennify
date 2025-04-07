import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MathLines from '../components/MathLines';
import VennDiagram from '../components/VennDiagram';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Replace the existing animated background with MathLines */}
      <MathLines />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vennify</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#learn" className="text-gray-300 hover:text-white transition-colors">Learn</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
            <button className="md:hidden text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="min-h-screen flex items-center justify-center pt-16 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative">
            <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 animate-pulse">
                  Vennify
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 blur-xl -z-10"></div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Visualize Set Operations with Venn Diagrams
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium text-lg 
                            relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105 transform">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 group-hover:opacity-50 blur-sm transition-all duration-300 ease-out"></div>
              </button>
            </div>
            
            {/* Abstract shapes */}
            <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="absolute left-0 w-64 h-64 rounded-full border border-blue-500 opacity-20"></div>
              <div className="absolute right-0 w-80 h-80 rounded-full border border-purple-500 opacity-20"></div>
              <div className="absolute left-1/4 w-96 h-96 rounded-full border border-teal-500 opacity-10"></div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Powerful Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to master set theory concepts through interactive visualization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-xl p-8 h-full flex flex-col">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Interactive Visualizer</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                    Create custom Venn diagrams with our intuitive drag-and-drop interface. Perform operations like Union, Intersection, and Complement with real-time visual feedback.
                  </p>
                  <a href="#" className="text-blue-400 flex items-center group-hover:text-blue-300 transition-colors">
                    Explore tool
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-xl p-8 h-full flex flex-col">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Learn Set Theory</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                    Interactive tutorials and step-by-step guides to help you understand set theory concepts like never before. Master the fundamentals with visual learning.
                  </p>
                  <a href="#" className="text-purple-400 flex items-center group-hover:text-purple-300 transition-colors">
                    Start learning
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-xl p-8 h-full flex flex-col">
                  <div className="bg-gradient-to-r from-teal-400 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Community Hub</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                    Connect with fellow math enthusiasts, share diagrams, and collaborate on complex set problems. Join discussions and advance your knowledge together.
                  </p>
                  <a href="#" className="text-teal-400 flex items-center group-hover:text-teal-300 transition-colors">
                    Join community
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Visualization Section */}
        <section className="py-24 bg-gray-900 bg-opacity-70">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Visualize Complex Set Operations
                </h2>
                <p className="text-gray-300 mb-8">
                  Our intuitive interface makes it easy to create, manipulate and understand Venn diagrams. See set operations come to life with interactive animations and real-time calculations.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Union', 'Intersection', 'Complement', 'Symmetric Difference'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl shadow-xl relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-gray-800 rounded-lg p-6 flex items-center justify-center">
                  <VennDiagram />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="relative bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Ready to Visualize Your Data?
                  </h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Start creating beautiful Venn diagrams and visualizing set operations today. No credit card required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium min-w-[180px]
                            transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                    Get Started Free
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-blue-500 rounded-xl font-medium text-blue-400 min-w-[180px]
                            transition-all duration-300 hover:bg-blue-500/10">
                    Watch Demo
                  </button>
                </div>
              </div>
              
              {/* Abstract design elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-blue-500 opacity-20"></div>
                <div className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full border border-purple-500 opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;