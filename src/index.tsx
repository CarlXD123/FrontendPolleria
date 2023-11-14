import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login/Login';
import reportWebVitals from './reportWebVitals';
import Register from './components/login/Register';
import Forgot from './components/login/Forgot';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import MainContent from './components/dashboard/MainContent';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';
import AddProduct from './components/admin/AddProduct';
import AddEmployee from './components/admin/AddEmployee';
import Sales from './components/admin/Sales';
import { DarkModeProvider } from '../src/components/DarkMode'; // Asegúrate de importar DarkModeProvider
import Promotions from './components/promotions/Promotions';
import AddPromotion from './components/admin/AddPromotion';
import AdminRecommendationTraining from './components/admin/AdminRecommendationTraining';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <DarkModeProvider> {/* Envuelve el Router con DarkModeProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<MainContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="menu" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addsuplier" element={<AddEmployee />} />
            <Route path="sales" element={<Sales />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="addpromotion" element={<AddPromotion />} />
            <Route path="train" element={<AdminRecommendationTraining />} />
          </Route>
        </Routes>
      </Router>
    </DarkModeProvider>
  </React.StrictMode>,
);
reportWebVitals();
