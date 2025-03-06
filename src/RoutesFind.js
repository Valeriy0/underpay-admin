import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Banners } from './pages/banners';
import { ProductsPage } from './pages/products';
import { CategoriesPage } from './pages/categories';

export const RoutesFind = () => {
  return (
    <Router>
      <Routes>
        <Route path='/banners' element={<Banners />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};
