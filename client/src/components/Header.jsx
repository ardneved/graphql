import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "./assets/logo.png";

export default function Header() {
  return (
    <Nav className="navbar navbar-expand bg-light md-4 p-0">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project Management</div>
          </div>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item px-1">
              <NavLink
                to="/clients"
                className={({ isActive }) => (isActive ? "active" : "none")}
              >
                Clients
              </NavLink>
            </li>
            <li className="nav-item px-1">
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active" : "none")}
              >
                Projects
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
}
