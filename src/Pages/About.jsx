import React from 'react';
import about from '../../public/abou.jpg'
import Footer from '../Components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative bg-cover h-[60vh] text-white flex items-center justify-center" style={{ backgroundImage: "url('./about.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 text-center px-6 py-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Stylish Clothing. Timeless Elegance.
          </h1>
          <p className="text-lg md:text-2xl mb-4">
            Discover the latest trends with our unique collection of stylish clothes.
          </p>
          
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-16 px-6 max-w-7xl mx-auto md:px-12">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600">
            It all began with a passion for fashion, blending style, comfort, and sustainability. Our journey started as a small dream to offer a modern collection of clothing that transcends trends while staying affordable and accessible for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex justify-center items-center">
            <img src={about} alt="Fashion Clothing" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-600 mb-4">
              Our vision is to make everyone feel confident and stylish, no matter where they are. We believe in the power of good fashion and the impact it can have on self-expression and confidence.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600">
              Our mission is simple: to provide clothing that empowers you, makes you feel good, and is made with care for the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16  px-6 md:px-12">
        <div className="text-center max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of fashion-forward individuals trust us for their everyday wardrobe needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="text-center">
            <img src="https://via.placeholder.com/150" alt="Quality Materials" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Materials</h3>
            <p className="text-lg text-gray-600">
              We use only the finest fabrics to make sure every piece of clothing feels luxurious and lasts long.
            </p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/150" alt="Affordable Pricing" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="md:text-xl font-semibold text-gray-800 mb-2">Affordable Pricing</h3>
            <p className="text-lg text-gray-600">
              We believe fashion should be accessible, which is why we offer premium-quality clothing at competitive prices.
            </p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/150" alt="Sustainability" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-lg text-gray-600">
              Our clothing is crafted with sustainable practices that are kind to both the environment and your skin.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our happy customers who have experienced the quality and style of our clothing.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="max-w-sm bg-white rounded-lg shadow-lg mx-4 mb-8 p-6">
            <p className="text-lg text-gray-700 mb-4">"Absolutely in love with my new outfits! The fit is perfect, and I get compliments every time I wear them!"</p>
            <p className="font-semibold text-gray-800">Jessica R.</p>
            <p className="text-gray-500">Fashion Enthusiast</p>
          </div>
          <div className="max-w-sm bg-white rounded-lg shadow-lg mx-4 mb-8 p-6">
            <p className="text-lg text-gray-700 mb-4">"I love how the clothes are both stylish and sustainable. A brand I can trust!"</p>
            <p className="font-semibold text-gray-800">Mark T.</p>
            <p className="text-gray-500">Sustainable Fashion Advocate</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="">
       
        <Footer/>
      </section>
    </div>
  );
};

export default AboutPage;
