const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">


      {/* TITLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-10 w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Contact Us
        </h2>
        <p className="text-gray-600 max-w-xl">
          We’d love to hear from you! Reach out to us with any questions
          or support requests.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 pb-12 grid lg:grid-cols-2 gap-8 flex-grow">

        {/* LEFT - FORM */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Send Us a Message
          </h3>
          <p className="text-gray-500 mb-6">
            Fill out the form below and we will get back to you.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>

            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT - CONTACT INFO */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Contact Information
          </h3>

          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 text-white p-3 rounded-full">
                ✉️
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-500">
                  support@photogallery.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 text-white p-3 rounded-full">
                📞
              </div>
              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p className="text-gray-500">
                  +91 9876543210
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 text-white p-3 rounded-full">
                📍
              </div>
              <div>
                <p className="font-semibold text-gray-700">Location</p>
                <p className="text-gray-500">India</p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-4">
              <span className="bg-blue-600 text-white p-2 rounded-md">f</span>
              <span className="bg-sky-500 text-white p-2 rounded-md">t</span>
              <span className="bg-pink-500 text-white p-2 rounded-md">i</span>
              <span className="bg-blue-800 text-white p-2 rounded-md">in</span>
            </div>

          </div>
        </div>
      </section>


  

    </div>

  )
}

export default Contact