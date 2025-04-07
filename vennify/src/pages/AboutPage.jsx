import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MathLines from '../components/MathLines';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const technologies = [
    { name: 'React.js', description: 'Frontend framework for building user interfaces' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling' },
    { name: 'HTML Canvas', description: 'For interactive diagram rendering' },
    { name: 'JavaScript', description: 'Core programming language' },
    { name: 'React Router', description: 'For handling navigation' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <MathLines />

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
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-16">
          {/* About Section */}
          <section id="about" className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  About Vennify
                </h1>
                <p className="text-gray-300 text-lg mb-12">
                  Vennify is an interactive web application designed to help students visualize and understand set operations through dynamic Venn diagrams. Our platform makes complex set theory concepts intuitive and engaging through real-time visual feedback.
                </p>

                {/* Motivation */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-4 text-white">Motivation</h2>
                  <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6">
                    <p className="text-gray-300">
                      Set theory concepts can be challenging to grasp when presented only through mathematical notation. We created Vennify to bridge this gap by providing immediate visual representation of set operations, making abstract concepts concrete and memorable. Our goal is to enhance mathematical understanding through interactive visualization.
                    </p>
                  </div>
                </div>

                {/* Applicability */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-4 text-white">Where to Use</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Classroom Teaching', 'Self-Study', 'Assignments', 'Presentations'].map((item, index) => (
                      <div key={index} className="bg-gray-900 bg-opacity-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-2 text-blue-400">{item}</h3>
                        <p className="text-gray-300">Perfect tool for visualizing set operations in {item.toLowerCase()}, making complex concepts easier to understand and explain.</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How it Works */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-4 text-white">How it Works</h2>
                  <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6">
                    <ol className="text-gray-300 space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-1">1</span>
                        <p>Input your sets using our intuitive interface</p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1">2</span>
                        <p>Select the operation you want to perform (Union, Intersection, etc.)</p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mr-3 mt-1">3</span>
                        <p>Watch as the Venn diagram updates in real-time</p>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-4 text-white">Technologies Used</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {technologies.map((tech, index) => (
                      <div key={index} className="bg-gray-900 bg-opacity-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                          {tech.name}
                        </h3>
                        <p className="text-gray-300">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white">Curriculum Alignment</h2>
                  <p className="text-gray-300">
                    Vennify is designed to align with the Discrete Mathematics and Graph Theory (DMGT) syllabus, making it a perfect companion for students studying set theory and related concepts.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;