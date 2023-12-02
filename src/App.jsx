// App.jsx
import Header from "./components/Header";
import Info from "./components/Info";
import Cards from "./components/Cards";
import "./sass/main.scss";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router"; // import Outlet and useLocation from react-router
import { useState, useEffect } from "react"; // import useState and useEffect from React

const App = () => {
  const [hideComponents, setHideComponents] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Hide components for specific routes
    setHideComponents(
      [
        "/login",
        "/register",
        "/faq",
        "/subscription",
        "/my-cars",
        "/my-profile",
        "/add-car",
        "/user-car-chart",
        "/welcomeBox",
      ].includes(location.pathname)
    );
  }, [location.pathname]);

  return (
    <div className="App">
      <Header />
      {!hideComponents && (
        <>
          <Info />
        </>
      )}
      <Outlet /> {/* This line is crucial for rendering child routes */}
      <Footer />
    </div>
  );
};

export default App;
