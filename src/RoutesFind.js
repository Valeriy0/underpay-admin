import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Banners } from './pages/banners';
import { ProductsPage } from './pages/products';
import { CategoriesPage } from './pages/categories';
import { AuthPage } from './pages/auth';
import { MainPage } from './pages/main';
import { ItemsPage } from './pages/items';

export const RoutesFind = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/banners' element={<Banners />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/items' element={<ItemsPage />} />
      </Routes>
    </Router>
  );
};
