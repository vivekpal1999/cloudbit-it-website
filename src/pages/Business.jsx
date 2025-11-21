// src/pages/Business.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Briefcase, Cpu, Cloud, Users } from "lucide-react";

const services = [
  {
    title: "Digital Transformation",
    desc: "Modernize your business with cloud-native and AI-powered solutions.",
    icon: Cpu,
  },
  {
    title: "Web & Mobile Apps",
    desc: "Custom development for web and mobile platforms.",
    icon: Cloud,
  },
  {
    title: "Consulting",
    desc: "Expert guidance for IT strategy and implementation.",
    icon: Briefcase,
  },
  {
    title: "Team Collaboration",
    desc: "Boost productivity with team communication and project management tools.",
    icon: Users,
  },
];

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO, TechCorp",
    feedback:
      "Cloudbit Digital IT Solutions transformed our business with their innovative solutions. Highly recommended!",
  },
  {
    name: "Mark Spencer",
    role: "CTO, InnovateX",
    feedback:
      "Professional, reliable, and extremely talented team. Our apps are now faster and more scalable.",
  },
  {
    name: "Sara Lee",
    role: "Founder, Startup Hub",
    feedback:
      "Amazing consulting services. Their insights helped us streamline processes and increase revenue.",
  },
];

export default function Business() {
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-6 py-24 overflow-hidden">
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-blue-400 rounded-full"
          initial={{ x: Math.random() * 1200 - 600, y: Math.random() * 1200 - 600, opacity: 0 }}
          animate={{
            x: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
            y: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
            opacity: [0, 0.3, 0],
          }}
          transition={{ duration: 15 + i, repeat: Infinity, ease: "linear", delay: i }}
        />
      ))}

      {/* Header */}
      <motion.h1
        className="text-6xl font-extrabold text-center text-blue-900 mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Business Solutions
      </motion.h1>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        {services.map((service, index) => (
          <motion.div
            key={index}
            ref={cardRef}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all cursor-pointer"
          >
            <service.icon className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-bold text-blue-700 mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto mb-24">
        <motion.h2
          className="text-4xl font-bold text-blue-900 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <p className="text-gray-800 mb-4">"{testi.feedback}"</p>
              <p className="font-semibold text-blue-700">{testi.name}</p>
              <p className="text-gray-500 text-sm">{testi.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="max-w-4xl mx-auto bg-blue-600 text-white rounded-3xl p-12 text-center shadow-xl hover:shadow-2xl transition-shadow"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="mb-6">Contact us today and take your digital solutions to the next level!</p>
        <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
          Get Started
        </button>
      </motion.div>

      {/* Floating Glow Circles */}
      <div className="absolute -top-40 -left-40 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse-slow delay-500" />

      {/* Background Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-blue-300 to-transparent opacity-30"
            style={{ left: `${i * 16}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
