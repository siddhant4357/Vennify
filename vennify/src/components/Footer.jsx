import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="py-12 bg-gray-900 bg-opacity-60">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigate</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/visualizer" className="text-gray-400 hover:text-blue-400 transition-colors">Visualizer</Link></li>
              <li><Link to="/theory" className="text-gray-400 hover:text-blue-400 transition-colors">Learn</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:siddhantsankesara@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  contact@vennify.com
                </a>
              </li>
              <li>
                <a href="https://github.com/siddhant4357/Vennify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span className="text-white font-bold">Vennify</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Vennify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;