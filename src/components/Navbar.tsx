import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import "./Navbar.css";
import logo from "../assets/react.svg";

const navRoutes = ["/register", "/signin"];

export default function Navbar() {
  const location = useLocation();
  const show = navRoutes.includes(location.pathname);
  const logout = useLogout();
  const { setAuth } = useAuth();

  const handleLogout = async () => {
    setAuth && setAuth({});
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {show ? (
        ""
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-background-radial-gradient mb-5">
          <div className="container-fluid mx-5">
            <div className="navbar-brand">
              <img
                src={logo}
                alt="logo"
                style={{ width: "auto", height: "50px" }}
                className="d-inline-block align-text-top"
              />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  className={`${
                    location.pathname === "/carouselAccueil" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/carouselAccueil">
                    <span>Page d'accueil</span>
                  </NavLink>
                </li>
                <li
                  className={`${
                    location.pathname === "/carouselActualite" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/carouselActualite">
                    <span>Page d'actualités</span>
                  </NavLink>
                </li>
                <li
                  className={`${
                    location.pathname === "/actualites" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/actualites">
                    <span>Actualités</span>
                  </NavLink>
                </li>
                <li
                  className={`${
                    location.pathname === "/projets" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/projets">
                    <span>Projets</span>
                  </NavLink>
                </li>
                <li
                  className={`${
                    location.pathname === "/emails" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/emails">
                    <span>Messages reçus</span>
                  </NavLink>
                </li>
                <li
                  className={`${
                    location.pathname === "/admins" ? "active" : ""
                  } nav-item`}
                >
                  <NavLink to="/admins">
                    <span>Paramètres compte</span>
                  </NavLink>
                </li>
              </ul>
              <div>
                <button
                  className="logout-button ms-2"
                  onClick={handleLogout}
                  style={{ backgroundColor: "#33186B" }}
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
