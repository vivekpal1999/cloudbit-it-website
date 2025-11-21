import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Zap,
  Cloud,
  TrendingUp,
  Lightbulb,
  Users,
  Shield,
} from "lucide-react";

/* -------------------- Animation Variants -------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
};

const float3D = {
  animate: {
    y: [-20, 15, -20],
    rotateX: [0, 15, 0],
    rotateY: [0, -15, 0],
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------- Counter Hook -------------------- */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (percentage < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return [count, ref];
};

/* -------------------- Floating Particles -------------------- */
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          initial={{ x: Math.random() * 100 + "%", y: -50 }}
          animate={{ y: ["0%", "120%"], x: [0, Math.random() * 50 - 25], opacity: [0, 1, 0] }}
          transition={{ duration: 12 + i, repeat: Infinity, ease: "linear", delay: i * 2 }}
          style={{ left: `${i * 10}%` }}
        />
      ))}
    </div>
  );
};

/* -------------------- About Component -------------------- */
export default function About() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  const [countProjects] = useCountUp(300);
  const [countClients] = useCountUp(150);
  const [countYears] = useCountUp(10);

  const services = [
    { title: "Web Development", icon: Code },
    { title: "Mobile Apps", icon: Zap },
    { title: "Cloud Solutions", icon: Cloud },
    { title: "AI & Data", icon: TrendingUp },
    { title: "UI/UX Design", icon: Lightbulb },
    { title: "Managed Services", icon: Users },
    { title: "Security & Compliance", icon: Shield },
  ];

  return (
    <section className="relative pt-24 pb-32 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 overflow-hidden">
      {/* Particles */}
      <Particles />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">About Us</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            We are an experienced IT company offering custom software solutions, website development, mobile app development, cloud solutions, and AI-powered applications.
          </p>
        </motion.div>

        {/* Counters */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center mt-12">
          <div>
            <p className="text-4xl font-bold text-blue-600">{countProjects}+</p>
            <p className="text-gray-600">Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">{countClients}+</p>
            <p className="text-gray-600">Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">{countYears}+</p>
            <p className="text-gray-600">Years</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">99.9%</p>
            <p className="text-gray-600">Uptime</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">50+</p>
            <p className="text-gray-600">Team Members</p>
          </div>
        </div>

        {/* 3D Floating Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={float3D}
              animate="animate"
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
            >
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden transition-transform duration-500">
                {/* Icon */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg mb-6">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700">High-quality {service.title.toLowerCase()} solutions for modern businesses.</p>
                {/* Bottom Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-700 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-20">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
