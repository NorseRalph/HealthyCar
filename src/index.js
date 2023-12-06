import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import Register from "./components/Register";
import MyProfile from "./components/Myprofile";
import CarRegistrationForm from "./components/CarRegistrationForm";
import Faq from "./components/Faq";
import MyCars from "./components/MyCars";
import Subscription from "./components/Subscription";
import UserCarChart from "./components/UserCarChart";
import WelcomeBox from "./components/WelcomeBox";
import RequireAuth from "./components/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/my-cars" element={<MyCars />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/add-car" element={<CarRegistrationForm />} />
            <Route path="/user-car-chart/:carId" element={<UserCarChart />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="welcomeBox" element={<WelcomeBox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
