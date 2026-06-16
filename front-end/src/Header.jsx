import { Link } from "react-router-dom";
import logo from "./assets/react.svg"; // replace with your logo

function Header() {
  return (
    <>
      <header className="head">
        <img src={logo} alt="Logo" width={100} />

        <div className="nav">
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;