import { useState, useEffect } from "react";
import div from '../../public/product-sale.png'                                          
const DealOfTheWeek = () => {
  const calculateTimeLeft = () => {
    let difference = +new Date("2025-07-29") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100  py-10 px-6 md:px-20 flex flex-col md:flex-row items-center justify-end ">
      {/* Left Side - Categories */}
      <div className="text-left md:w-1/3 flex flex-col md:pl-32 gap-5">
        <p className="text-gray-400 text-xl">Clothings Hot</p>
        <h2 className="font-bold text-2xl md:text-4xl text-black">Shoe Collection</h2>
        <p className="text-gray-400 text-xl">Accessories</p>
      </div>

      {/* Center - Product Image with Sale Badge */}
      <div className="relative flex md:w-1/3 justify-center">
        <img
          src={div} 
          alt="Multi-pocket Chest Bag"
          className="w-72 md:w-96"
        />
        <div className="absolute md:block hidden  top-0 right-12 bg-black text-white text-sm font-bold px-6 py-2 w-20 h-20 rounded-full">
           <span className="text-base flex justify-center text-center items-center "> Sale $29.99</span>
        </div>
      </div>

      {/* Right Side - Countdown Timer */}
      <div className="text-center md:text-left flex flex-col justify-end gap-4 md:w-1/3">
        <p className="text-red-500 font-semibold uppercase">Deal of the Week</p>
        <h2 className="font-bold text-2xl md:text-3xl text-black">Multi-pocket Chest Bag Black</h2>
        <div className="flex justify-center md:justify-start text-2xl font-bold gap-5 mt-4">
          <span className="flex flex-col">{timeLeft.days} <small className="text-sm block">Days </small></span>:
          <span className="flex flex-col ">{timeLeft.hours}<small className="text-sm block">Hours</small></span>:
          <span className="flex flex-col">{timeLeft.minutes}  <small className="text-sm block">Minutes</small></span>:
          <span className="flex flex-col">{timeLeft.seconds} <small className="text-sm block">Seconds</small></span>
        </div>
        <button className="mt-5 bg-black text-white py-2 w-36 uppercase font-semibold hover:bg-gray-800">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default DealOfTheWeek;
