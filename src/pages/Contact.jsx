// src/pages/Contact.jsx
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Mail, User, MessageCircle } from "lucide-react";

export default function Contact() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-24 overflow-hidden">
      {/* Background floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          initial={{ x: Math.random() * 1200 - 600, y: Math.random() * 1200 - 600 }}
          animate={{
            x: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
            y: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
            opacity: [0, 0.3, 0],
          }}
          transition={{ duration: 20 + i, repeat: Infinity, ease: "linear", delay: i }}
        />
      ))}

      {/* Header */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center text-white mb-12"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
      >
        Get in Touch
      </motion.h1>
      <motion.p
        className="text-center text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Have a question or want to work with us? Fill out the form below and we'll get back to you as soon as possible.
      </motion.p>

      {/* 3D Tilt Contact Card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-3xl mx-auto p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer"
      >
        {/* Floating Glows */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse-slow delay-500" />

        {/* Form Header */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Send us a Message
        </motion.h2>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="relative">
            <User className="absolute top-3 left-3 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 bg-white/10 text-white placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 w-6 h-6 text-white" />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 bg-white/10 text-white placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <MessageCircle className="absolute top-3 left-3 w-6 h-6 text-white" />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 h-40 resize-none bg-white/10 text-white placeholder-gray-300"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-blue-900 font-bold shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            {sent ? "Message Sent!" : "Send Message"}
          </motion.button>
        </motion.form>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-40"
            initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 }}
            animate={{
              x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
              y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
              opacity: [0, 0.3, 0],
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i }}
          />
        ))}

        {/* Glowing Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/30 animate-pulse-slow pointer-events-none" />
      </motion.div>
    </div>
  );
}
