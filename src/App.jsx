import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Business from "./pages/Business";
import Career from "./pages/Career";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/business" element={<Business />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
