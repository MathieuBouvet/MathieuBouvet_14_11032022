import { Outlet, Link, useLocation } from "react-router-dom";
import useFlipTransition from "../../hooks/useFlipTransition";

import "./layout.css";

const Layout = () => {
  const ref = useFlipTransition();
  const location = useLocation();

  return (
    <>
      <header className="top-bar">
        <img src="/logo.svg" alt="hrnet" />
        <h1 className="app-title">
          <Link to="/">HRnet</Link>
        </h1>
        <nav className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create employee
              </Link>
              {location.pathname === "/" && (
                <div ref={ref} className="active-marker"></div>
              )}
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                View Employees
              </Link>
              {location.pathname === "/employees" && (
                <div ref={ref} className="active-marker"></div>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-column-container">
        <Outlet />
      </main>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
