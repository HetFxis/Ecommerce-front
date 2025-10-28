import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import payment from '../../public/payment.png'
const Footer = () => {
    return (
        <>
            <footer className="bg-slate-100 text-gray-700">
                <section className="grid grid-cols-2  max-w-7xl mx-auto md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
                    <div>
                        <h2 className="font-bold  text-lg mb-4">About Us</h2>
                        <p className=" text-sm ">
                            We bring you the latest fashion trends at unbeatable prices. Shop
                            from our extensive range of clothes, shoes, and accessories for
                            every occasion.
                        </p>
                        <div className="mt-4">
                            <img src={payment} alt="Payment Methods" className=" max-w-xs" />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold   text-lg mb-4">Popular Categories</h2>
                        <ul className="flex flex-col gap-3">
                            <li className=" text-sm hover:  cursor-pointer">Men's Clothing</li>
                            <li className=" text-sm hover:  cursor-pointer">Women's Clothing</li>
                            <li className=" text-sm hover:  cursor-pointer">Kid's Wear</li>
                            <li className=" text-sm hover:  cursor-pointer">Footwear</li>
                            <li className=" text-sm hover:  cursor-pointer">Accessories</li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h2 className="font-bold  text-lg mb-4">Customer Support</h2>
                        <ul className="flex flex-col gap-3">
                            <li className=" text-sm hover:  cursor-pointer">Help Center</li>
                            <li className=" text-sm hover:  cursor-pointer">FAQs</li>
                            <li className=" text-sm hover:  cursor-pointer">Returns & Refunds</li>
                            <li className=" text-sm hover:  cursor-pointer">Shipping Policy</li>
                            <li className=" text-sm hover:  cursor-pointer">Contact Us</li>
                        </ul>
                    </div>

                    {/* Connect with Us */}
                    <div>
                        <h2 className="font-bold  text-lg mb-4">Connect with Us</h2>
                        <div className=' flex   gap-3 text-black'>
      
      <FaLinkedinIn className='hover:text-sky-700'/>
      <FaInstagram className='hover:text-pink-700'/>
      <FaXTwitter className='hover:text-slate-700'/>
      <  FaFacebookF className='hover:text-blue-700'/>

      </div>
                    </div>
                </section>

                {/* Bottom Footer */}
                <div className="bg-slate-200 py-4  text-center">
                    <p className=" text-sm">© 2025 Your Brand Name. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
