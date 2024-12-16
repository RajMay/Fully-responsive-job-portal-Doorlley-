import React from 'react';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription logic here
  };

  return (
    <footer className="bg-black text-white p-8">
      {/* Rainbow border glow effect */}
      <div className="rounded-lg bg-black p-8 relative mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-50 blur-xl" />
        <div className="relative bg-black rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">
              Doorlly <span className='text-[#6A38C2]'>Services at your door.</span>
            </h2>
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="px-4 py-2 rounded-lg bg-white text-black flex-grow md:flex-grow-0 md:w-64"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg border border-white hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Company Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Doorlly</h3>
          <ul className="space-y-3">
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/features" className="hover:text-gray-300">Features</a></li>
            <li><a href="/works" className="hover:text-gray-300">Works</a></li>
            <li><a href="/career" className="hover:text-gray-300">Career</a></li>
          </ul>
        </div>

        {/* Help Column */}
  

        {/* Resources Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-3">
            <li><a href="/ebooks" className="hover:text-gray-300">Free serives</a></li>
            <li><a href="/ebooks" className="hover:text-gray-300">Solution</a></li>

            <li><a href="/ebooks" className="hover:text-gray-300">How to Use</a></li>

          
           
          </ul>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Links</h3>
          <ul className="space-y-3">
            <li><a href="/ebooks" className="hover:text-gray-300">Office</a></li>
            <li><a href="/tutorial" className="hover:text-gray-300">Contact</a></li>
            <li><a href="/blog" className="hover:text-gray-300">Support</a></li>
           
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;