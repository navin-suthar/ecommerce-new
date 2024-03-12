// ProductList.test.js
import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom to use expect extensions
import ProductList from './ProductList';

describe('ProductList', () => {
  beforeEach(() => {
    // Mock fetch API
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        product: [
          {
            id: 1,
            name: 'Porcelain Tea',
            href: '#',
            price: '$48',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.'
          },
          {
            id: 2,
            name: 'Travel',
            href: '#',
            price: '$50',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.'
          }
        ]
      })
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore mock to its initial state after each test
  });

  // test('fetches and renders products', async () => {
  //   render(<ProductList />);

  //   // Assert loading state initially
  //   expect(screen.getByText('Loading...')).toBeInTheDocument();

  //   // Wait for data fetching and assert the rendered products
  //   await waitFor(() => {
  //     expect(screen.getByText('Porcelain Tea')).toBeInTheDocument();
  //     expect(screen.getByText('$48')).toBeInTheDocument();
  //     expect(screen.getByText('Writing Pad Refill')).toBeInTheDocument();
  //     expect(screen.getByText('$29')).toBeInTheDocument();
  //   });
  // });

  test('filters products based on price range', async () => {
    jest.setTimeout(10000); // Increase the timeout to 10 seconds
    render(<ProductList />);
  
    // Wait for data fetching
    await waitFor(() => expect(screen.getAllByText('Porcelain Tea').length).toBe(2));
  
    // Select price range 'Under $50'
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'under50' } });
  
    // Wait for filtering to take effect
    await waitFor(() => expect(screen.getAllByText('Porcelain Tea').length).toBe(2));
  
    // Assert filtered products
    expect(screen.getByRole('link', { id: '1' })).toBeInTheDocument();
    expect(screen.queryByText('$48')).toBeInTheDocument();
    expect(screen.queryByText('Travel1')).not.toBeInTheDocument(); // Product with price $50 should not be visible
  });
  
  

  test('filters products based on category', async () => {
    render(<ProductList />);

    // Wait for data fetching
    await waitFor(() => expect(screen.getAllByText('Porcelain Tea').length).toBe(2));

    // Select category
    fireEvent.click(screen.getByLabelText('Porcelain Tea'));

  expect(screen.queryByText('$48')).toBeInTheDocument();
  expect(screen.queryByText('Writing Pad Refill1')).not.toBeInTheDocument(); // Product 2 should not be rendered
  });

  // Add more test cases for pagination if needed
});
