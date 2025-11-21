// src/pages/Blog.jsx
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Calendar, Folder } from "lucide-react";

const blogPosts = [
  {
    title: "How AI is Changing IT",
    date: "Nov 2025",
    category: "Technology",
    snippet:
      "AI is transforming software development, cloud computing, and digital solutions. Companies are leveraging AI to improve productivity...",
  },
  {
    title: "Top 10 Business Trends",
    date: "Oct 2025",
    category: "Business",
    snippet:
      "Explore the latest trends driving startups and enterprises forward in 2025. Digital transformation and agile methodologies are key...",
  },
  {
    title: "Career Growth in IT",
    date: "Sep 2025",
    category: "Career",
    snippet:
      "Learn how to advance your career with tech skills and certifications. Networking and portfolio projects are essential...",
  },
  {
    title: "Cloud Computing Benefits",
    date: "Aug 2025",
    category: "Technology",
    snippet:
      "Cloud computing reduces IT costs and increases flexibility. Hybrid clouds and multi-cloud strategies are gaining popularity...",
  },
  {
    title: "Effective Remote Teams",
    date: "Jul 2025",
    category: "Business",
    snippet:
      "Remote work requires strong communication, tools, and trust. Agile practices help distributed teams succeed...",
  },
  {
    title: "Interview Tips for Developers",
    date: "Jun 2025",
    category: "Career",
    snippet:
      "Master coding interviews with problem-solving practice and understanding system design principles. Prepare well for behavioral questions...",
  },
];

const categories = ["All", "Technology", "Business", "Career"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-24 px-6 overflow-hidden">
      {/* Background particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-30"
          initial={{ x: Math.random() * 1200 - 600, y: Math.random() * 800 - 400 }}
          animate={{
            x: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
            y: [Math.random() * 800 - 400, Math.random() * 800 - 400],
          }}
          transition={{ duration: 20 + i, repeat: Infinity, ease: "linear", delay: i }}
        />
      ))}

      {/* Page Header */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-center text-blue-800 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Blog
      </motion.h1>

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={idx}
            ref={cardRef}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-shadow cursor-pointer overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <Folder className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">{post.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{post.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <p className="text-gray-700 mb-4">{post.snippet}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Read More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16 gap-4">
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-100 transition-all">
          Previous
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-100 transition-all">
          1
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-100 transition-all">
          2
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-100 transition-all">
          Next
        </button>
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-24 max-w-4xl mx-auto bg-blue-600 text-white rounded-3xl p-12 text-center shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get the latest blog updates and IT tips directly to your inbox.</p>
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-l-xl border border-white/50 focus:outline-none"
          />
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-r-xl hover:bg-gray-100 transition-all">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
