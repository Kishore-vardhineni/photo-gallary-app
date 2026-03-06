const Footer = () => {
  return (
    <footer className="bg-gray-100 py-16 px-6 text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

        {/* Logo Section */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-semibold">Photo Gallery</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Memories And Gifts Of Life
          </p>
        </div>

        {/* Menu Section */}
        <div className="flex-grow flex flex-wrap md:pl-20 mt-10 md:mt-0 text-center md:text-left">

          {/* Company */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-yellow-500">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-yellow-500">
                  Contact
                </a>
              </li>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 mt-6 md:mt-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Services
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <span className="text-gray-600 hover:text-yellow-500 cursor-pointer">
                  Upload Photos
                </span>
              </li>
              <li>
                <span className="text-gray-600 hover:text-yellow-500 cursor-pointer">
                  Albums
                </span>
              </li>
              <li>
                <span className="text-gray-600 hover:text-yellow-500 cursor-pointer">
                  Share Gallery
                </span>
              </li>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 mt-6 md:mt-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Contact
            </h2>
            <nav className="list-none space-y-2">
              <li className="text-gray-600">support@photogallery.com</li>
              <li className="text-gray-600">+91 9876543210</li>
              <li className="text-gray-600">India</li>
            </nav>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-200">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Photo Gallery — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;