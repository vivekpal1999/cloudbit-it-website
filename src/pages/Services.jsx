import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Zap,
  Cloud,
  TrendingUp,
  Shield,
  Lightbulb,
  Users,
  Server,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";

/* -------------------- Services Data -------------------- */
const services = [
  {
    title: "Web Development",
    desc: "High-performance, responsive websites using React, Next.js, and TailwindCSS.",
    icon: Code,
  },
  {
    title: "Mobile Apps",
    desc: "Android & iOS cross-platform apps with React Native & Flutter.",
    icon: Zap,
  },
  {
    title: "Cloud Engineering",
    desc: "AWS, Azure, GCP architecture, IaC, and scalable cloud solutions.",
    icon: Cloud,
  },
  {
    title: "AI & Data",
    desc: "Data pipelines, ML models, and automation to power your business.",
    icon: TrendingUp,
  },
  {
    title: "Security & Compliance",
    desc: "Security audits, pen testing, and compliance consulting.",
    icon: Shield,
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful and intuitive user interfaces for web & mobile.",
    icon: Lightbulb,
  },
  {
    title: "Enterprise Software",
    desc: "Custom backend systems, microservices, and enterprise-grade apps.",
    icon: Server,
  },
  {
    title: "DevOps & SRE",
    desc: "CI/CD pipelines, monitoring, and infrastructure reliability.",
    icon: Users,
  },
  {
    title: "Email & CRM Automation",
    desc: "Automate workflows, email campaigns, and customer interactions.",
    icon: Mail,
  },
  {
    title: "Geolocation & Maps",
    desc: "Integrate maps, GPS tracking, and geospatial analytics.",
    icon: MapPin,
  },
  {
    title: "Wallet & Payment Systems",
    desc: "Secure wallet integration, payments, and transactions.",
    icon: DollarSign,
  },
  {
    title: "Time Management Tools",
    desc: "Track tasks, schedules, and optimize productivity.",
    icon: Clock,
  },
  {
    title: "Quality & Testing",
    desc: "Automated tests, QA pipelines, and bug tracking.",
    icon: CheckCircle,
  },
];

/* -------------------- Floating Particle Effect -------------------- */
const generateParticles = (count = 20) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(
      <div
        key={i}
        className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    );
  }
  return particles;
};

/* -------------------- Floating 3D Motion -------------------- */
const float3D = {
  animate: {
    y: [-10, 10, -10],
    rotateX: [0, 15, 0],
    rotateY: [0, -15, 0],
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------- Main Component -------------------- */
export default function Services() {
  return (
    <section
      id="services"
      className="relative py-32 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">{generateParticles(25)}</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-4">
            Our Services
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            End-to-end digital solutions crafted with modern engineering, cloud architecture,
            AI, and automation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer perspective-1000"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
              }}
            >
              {/* 3D Card */}
              <motion.div
                variants={float3D}
                animate="animate"
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
              >
                {/* Icon */}
                <div className="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-12 h-12 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">{service.desc}</p>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />

                {/* Floating Gradient Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Start Your Project Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
