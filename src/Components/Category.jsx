import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {IoMdRefresh} from "react-icons/io"
import axiosInstance from '../service/Axiosconfig';
const CategorySidebar = ({ onCategorySelect,onPriceSelect,onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;





  useEffect(() => {

    axios.get(`${baseURL}/categories/`, {
     })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

  }, []);

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const handlePriceChange = (price) => {
    onPriceSelect(price)
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    onFilterChange({ size: e.target.value });
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    onFilterChange({ brand: e.target.value });
  };
  const reset =()=>{
    onCategorySelect(null);
    setIsCategoryOpen(false)
  }

  return (
    <div className="md:w-1/4 p-6 bg-white rounded-lg overflow-y-auto">
      <div className='flex justify-between'>
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Filters</h3>
      <button onClick={reset} className="text-2xl font-semibold text-gray-700  mb-6"><IoMdRefresh />
      </button>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-600 cursor-pointer" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          Categories
        </h4>
        <div className={`transition-all duration-300 ${isCategoryOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          <select
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full p-2 mt-2 bg-white border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-600 cursor-pointer" onClick={() => setIsPriceOpen(!isPriceOpen)}>
          Price Range
        </h4>
        <div className={`transition-all duration-300 ${isPriceOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          <select
            onChange={(e)=> handlePriceChange(e.target.value)}
            value={priceRange}
            className="w-full p-2 mt-2 bg-white border border-gray-300 rounded"
          >
            <option value="">Select Price Range</option>
            <option value="0-500">Rs 0 - Rs 500</option>
            <option value="500-1000">Rs 500 - Rs 1000</option>
            <option value="1000-2000">Rs 1000 - Rs 2000</option>
            <option value="2000-5000">Rs 2000 - Rs 5000</option>
            <option value="5000+">Rs 5000+</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-600 cursor-pointer" onClick={() => setIsSizeOpen(!isSizeOpen)}>
          Size
        </h4>
        <div className={`transition-all duration-300 ${isSizeOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          <select
            onChange={handleSizeChange}
            value={selectedSize}
            className="w-full p-2 mt-2 bg-white border border-gray-300 rounded"
          >
            <option value="">Select Size</option>
              <option value="0-50">S</option>
            <option value="50-100">M</option>
            <option value="100-200">L</option>
            <option value="200-500">XL</option>
            <option value="500+">XLL</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-600 cursor-pointer" onClick={() => setIsBrandOpen(!isBrandOpen)}>
          Brand
        </h4>
        <div className={`transition-all duration-300 ${isBrandOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          <select
            onChange={handleBrandChange}
            value={selectedBrand}
            className="w-full p-2 mt-2 bg-white border border-gray-300 rounded"
          >
            <option value="">Select Brand</option>
           
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
