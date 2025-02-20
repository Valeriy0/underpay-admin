import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Banners } from './pages/banners';
import { ProductsPage } from './pages/products';

export const RoutesFind = () => {
  return (
    <Router>
      <Routes>
        <Route path='/banners' element={<Banners />} />
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};
