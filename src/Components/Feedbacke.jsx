import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Alice",
    feedback: "Absolutely love the designs! The quality exceeded my expectations and the fit was perfect. Will definitely shop here again!",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ben",
    feedback: "Great shopping experience. Fast delivery! Ordered on Monday and received my package by Wednesday. Impressive service!",
    image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Clara",
    feedback: "Top-notch customer service! Had a small issue with my order and their team resolved it immediately. Very professional!",
    image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
  {
    name: "David",
    feedback: "Stylish and comfortable clothing. I've bought multiple items and they've all become favorites in my wardrobe.",
    image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
  },
];

export default function CubeTestimonialSlider() {
  return (
    <section className="bg-gradient-to-br from-gray-200 to-white  py-20 flex justify-center items-center">
      <div className="max-w-lg w-full px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-10 text-gray-800">
          What Our Customers Say
        </h2>
        <div className="relative">
          <Swiper
            effect="cube"
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            autoplay={{ 
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            modules={[EffectCube, Autoplay, Pagination]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="h-80 w-full"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide
                key={i}
                className="flex flex-col items-center justify-center 
                bg-gradient-to-br  from-sky-200 backdrop-blur-sm  
                 shadow-lg p-6 transition-all duration-300
                hover:shadow-xl "
              >
                <div className="relative  flex justify-center md:justify-start mb-4 ">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20   md:ml-2 rounded-full flex justify-center  object-cover border-2 border-white/40 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-sky-700 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-700 px-4 leading-relaxed mb-4 md:pt-">
                  "{t.feedback}"
                </p>
                <p className="mt-auto font-semibold text-gray-900">— {t.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination !relative !mt-6"></div>
        </div>
      </div>
    </section>
  );
}