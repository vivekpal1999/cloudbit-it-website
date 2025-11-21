import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <Logo className="w-40 h-10" />
        </Link>

        <div className="space-x-6 text-lg text-white">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/services" className="hover:text-yellow-400">Services</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
<Link to="/business" className="hover:text-blue-600">Business</Link>
<Link to="/career" className="hover:text-blue-600">Career</Link>

          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
