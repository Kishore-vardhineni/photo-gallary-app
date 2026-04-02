import {
  Camera,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Layers,
  Eye,
} from "lucide-react";

export const About = () => {
  return (
    <div className="bg-gray-50 text-gray-700">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h1>

          <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-semibold">
            Preserving Your Precious Moments
          </span>

          <p className="mt-6 text-lg leading-relaxed">
            Welcome to Photo Gallery! We are passionate about capturing the
            moments that matter most. Our platform allows you to upload,
            organize, and share your memories with ease.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              ["10+", "Years Experience"],
              ["500K+", "Happy Users"],
              ["2M+", "Photos Shared"],
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 text-center"
              >
                <h2 className="text-2xl font-bold text-blue-600">{item[0]}</h2>
                <p className="text-sm">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485"
            className="rounded-3xl shadow-xl"
            alt=""
          />
        </div>
      </section>

      {/* MISSION / VISION / WHY */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <Layers className="text-yellow-500 mb-3" size={32} />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To help you cherish and relive your special moments through a
              seamless photo sharing experience.
            </p>
          </div>

          <div>
            <Eye className="text-yellow-500 mb-3" size={32} />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>
              To be the leading photo sharing platform that connects people
              through their memories.
            </p>
          </div>

          <div>
            <Camera className="text-yellow-500 mb-3" size={32} />
            <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
            <ul className="space-y-2 mt-3">
              <li className="flex gap-2 items-center">
                <CheckCircle className="text-green-500" size={18} />
                User-Friendly Interface
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle className="text-green-500" size={18} />
                Secure & Private
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle className="text-green-500" size={18} />
                High-Quality Storage
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT + BLOG */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
        {/* CONTACT */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <Mail /> support@photogallery.com
            </p>
            <p className="flex items-center gap-3">
              <Phone /> +91 9876543210
            </p>
            <p className="flex items-center gap-3">
              <MapPin /> India
            </p>
          </div>
        </div>

        {/* BLOG */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6">Latest Blog Posts</h3>

          <ul className="space-y-4">
            {[
              "Photography Tips & Tricks",
              "Creating Beautiful Photo Albums",
              "User Spotlight: Inspiring Stories",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="text-blue-500" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="rounded-3xl shadow-xl w-full h-[250px] md:h-[350px] object-cover"
          alt=""
        />
      </section>
      
    </div>
  )
}
