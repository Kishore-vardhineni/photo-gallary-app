import Carousel from "../components/Carousel/Carousel";
import img1 from "../assets/images/carousel4.jpg";
import img2 from "../assets/images/carousel2.jpg";
import img3 from "../assets/images/carousel3.jpg";

const Home = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-6">
        <Carousel />
      </h1>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Photo Gallery
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore beautiful moments captured from around the world.
          Discover nature, events, people, and creative photography.
        </p>

        <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg">
          Explore Gallery
        </button>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          About Our Gallery
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto">
          Our photo gallery is a collection of high-quality images shared by
          photographers and creators. You can browse different categories,
          view full-size images, and upload your own memorable moments.
        </p>
      </section>

      {/* Featured Images */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Photos
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <img
            src={img1}
            alt="mountain"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />

          <img
            src={img2}
            alt="mountain"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />

          <img
            src={img3}
            alt="lake"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />

        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Share Your Moments
        </h2>

        <p className="text-gray-600 mb-6">
          Upload your best photos and become part of our gallery community.
        </p>

        <button className="bg-green-500 hover:bg-green-600 px-6 py-3 text-white rounded-lg">
          Upload Photo
        </button>
      </section>

      
    </div>
  )
}



export default Home
