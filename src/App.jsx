// App.jsx
import Header from "./components/Header";
import Info from "./components/Info";
import "./sass/main.scss";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router"; // import Outlet and useLocation from react-router
import { useState, useEffect } from "react"; // import useState and useEffect from React

const App = () => {
  const [hideComponents, setHideComponents] = useState(false);
  const location = useLocation();

  const matchPath = (pattern, path) => {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");
    if (patternParts.length !== pathParts.length) {
      return false;
    }
    return patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index]);
  };



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
        "/welcomeBox",
        "/user-car-chart/:carId",
        "/forgetPassword",
        "/change-password"
      ].some(path => matchPath(path, location.pathname))
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
