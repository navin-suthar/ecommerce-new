// ProductList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  setData,
  setError,
  setPriceRange,
  setSelectedCategories,
  setCurrentPage,
  incrementSaveCount
} from './redux/productSlice';

export default function ProductList({darkMode}) {
  const dispatch = useDispatch();

  
  const handleSaveClick = () => {
    dispatch(incrementSaveCount());
  };

  const { data, error, loading, priceRange, selectedCategories, currentPage, itemsPerPage } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/6404142f-ba9f-4af7-87a7-1b77aee84615');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Response data:', data); // Log the response data to check its structure
        dispatch(setData(data.product));
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
        dispatch(setError(error));
      }
    };
  
    fetchData();
  }, [dispatch]);

  const handlePriceRangeChange = event => {
    dispatch(setPriceRange(event.target.value));
  };

  const handleCategoryChange = event => {
    const category = event.target.value;
    dispatch(setSelectedCategories(
      selectedCategories.has(category)
        ? new Set([...selectedCategories].filter(c => c !== category))
        : new Set([...selectedCategories, category])
    ));
  };

  const paginate = pageNumber => dispatch(setCurrentPage(pageNumber));

  // Apply filters
  let filteredProducts = data;
  if (priceRange !== '') {
    filteredProducts = filteredProducts.filter(product => {
      const price = parseInt(product.price.replace('$', ''));
      return (
        (priceRange === 'under50' && price < 50) ||
        (priceRange === '50to100' && price >= 50 && price <= 100) ||
        (priceRange === 'over100' && price > 100)
      );
    });
  }

  if (selectedCategories.size > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.has(product.name)
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      {/* Filter section */}
      <div className="mb-8">
        <label htmlFor="priceRange" className="block text-sm font-medium ">
          Price Range:
        </label>
        <select
          id="priceRange"
          name="priceRange"
          value={priceRange}
          onChange={handlePriceRangeChange}
          className={`mt-1 block w-full py-2 px-3 border ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">All</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Over $100</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium  mb-2">Category:</label>
        {data.map(product => product.name).map(category => (
          <div key={category} className="flex items-center">
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.has(category)}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor={category} className="text-sm ">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {currentItems.map(product => (
          <a key={product.id} href={product.href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <LazyLoadImage
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm ">{product.name}</h3>
            <p className="mt-1 text-lg font-medium ">{product.price} <button type="button" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded float-right' onClick={handleSaveClick}>Save</button></p>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex justify-center">
          <li className="mr-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
            >
              Previous
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
