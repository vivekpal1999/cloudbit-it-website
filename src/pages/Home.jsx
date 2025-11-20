import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Zap,
  Shield,
  TrendingUp,
  Lightbulb,
  DollarSign,
  Clock,
  CheckCircle,
  Users,
  Server,
  Code,
  Cloud,
  Mail,
  MapPin,
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const letterVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const float3D = {
  animate: {
    y: [-20, 15, -20],
    rotateX: [0, 15, 0],
    rotateY: [0, -15, 0],
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
  },
};

const card3DHover = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: 20,
    rotateY: -20,
    scale: 1.1,
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    transition: { duration: 0.4, type: "spring", stiffness: 300 },
  },
};

/* -------------------- Counter Hook -------------------- */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (percentage < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return [count, ref];
};

/* -------------------- Floating Particles -------------------- */
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{ x: Math.random() * 100 + "%", y: -100 }}
          animate={{
            y: ["0%", "120%"],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
          style={{ left: `${i * 15}%` }}
        />
      ))}
    </div>
  );
};

/* -------------------- Main Home Component -------------------- */
export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const partnersRef = useRef(null);

  // Auto scroll partners
  useEffect(() => {
    const el = partnersRef.current;
    if (!el) return;
    let pos = 0;
    let raf;
    const step = () => {
      pos += 0.5;
      if (pos > el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Form state
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", company: "", message: "" });
    }, 4000);
  };

  // Data
  const services = [
    { title: "Website Development", desc: "High-performance, SEO-friendly websites using React & Next.js", icon: Code },
    { title: "Mobile Apps", desc: "Cross-platform apps with React Native & Flutter", icon: Zap },
    { title: "Cloud Engineering", desc: "AWS/Azure/GCP architecture, IaC, autoscaling", icon: Cloud },
    { title: "AI & Data", desc: "Data pipelines, ML models, automation", icon: TrendingUp },
    { title: "DevOps & SRE", desc: "CI/CD, monitoring, observability", icon: Server },
    { title: "Security & Compliance", desc: "Security audits, pen testing & compliance", icon: Shield },
    { title: "Enterprise Software", desc: "Custom backends, microservices", icon: Code },
    { title: "E-commerce Platforms", desc: "Scalable storefronts with conversion", icon: TrendingUp },
    { title: "UI/UX Design", desc: "Design systems, brand identity", icon: Lightbulb },
    { title: "Performance Optimisation", desc: "Lighthouse, bundling & runtime improvements", icon: Zap },
    { title: "Managed Services", desc: "24/7 support and operations", icon: Users },
    { title: "Consulting & Strategy", desc: "Product strategy, roadmaps", icon: Lightbulb },
  ];

  const [count300, ref300] = useCountUp(300);
  const [count150, ref150] = useCountUp(150);
  const [count10, ref10] = useCountUp(10);

  const title = "Cloudbit";
  const subtitle = "Smart Digital IT Solutions";

  return (
    <div className="w-full min-h-screen font-sans antialiased text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <header className="relative bg-gradient-to-br from-sky-700 via-indigo-700 to-violet-800 text-white overflow-hidden">
        <Particles />
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-6 py-28 lg:py-36">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={containerVariants} initial="hidden" animate="show">
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                  <motion.span className="block">
                    {title.split("").map((char, i) => (
                      <motion.span key={i} variants={letterVariant} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <motion.span variants={letterVariant} className="block text-yellow-300 text-3xl lg:text-5xl mt-4">
                    {subtitle.split("").map((char, i) => (
                      <motion.span key={i} className="inline-block" transition={{ delay: 0.8 + i * 0.05 }}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>

                <motion.p variants={itemUp} className="mt-8 text-xl max-w-2xl leading-relaxed">
                  Build secure, scalable and intelligent products with a team that ships fast and thinks long-term.
                </motion.p>

                <motion.div variants={itemUp} className="mt-10 flex flex-wrap gap-6">
                  <motion.a href="#contact" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-yellow-400 text-gray-900 rounded-full font-bold flex items-center gap-3 hover:bg-yellow-300 transition shadow-xl">
                    Start a Project <Zap className="w-6 h-6" />
                  </motion.a>
                  <motion.a href="#services" whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="px-10 py-5 border-2 border-white/40 rounded-full backdrop-blur transition">
                    Explore Services
                  </motion.a>
                </motion.div>

                <motion.div variants={itemUp} className="mt-10 flex gap-6 flex-wrap">
                  {["99.9% Uptime", "300+ Projects", "150+ Clients", "10+ Years"].map((text) => (
                    <span key={text} className="inline-block bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium backdrop-blur">
                      {text}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div variants={float3D} animate="animate" style={{ perspective: 2000 }} className="relative">
                <motion.div whileHover={{ scale: 1.05, rotateY: 15 }} transition={{ duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}>
                  <img src="https://placehold.co/900x600/6366f1/ffffff?text=Cloudbit+Hero" alt="Cloudbit" className="w-full rounded-2xl shadow-2xl" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* OUR SERVICES - 3D CARDS */}
      {/* ==================== ULTRA PREMIUM OUR SERVICES - 2025 DESIGN ==================== */}
<section id="services" className="py-32 bg-gradient-to-b from-gray-50 via-white to-indigo-50 relative overflow-hidden">
  {/* Background Decoration */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-20 w-120 h-120 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-24"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        className="inline-block"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-100/60 px-6 py-2 rounded-full backdrop-blur">
          Our Services
        </span>
      </motion.div>
      <h2 className="mt-6 text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
        Built for the Future
      </h2>
      <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto font-light">
        End-to-end digital solutions powered by modern engineering, AI, and cloud-native architecture.
      </p>
    </motion.div>

    {/* Services Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="group relative"
          onMouseMove={(e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }}
        >
          {/* Main Card */}
          <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden
                          transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-4
                          before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/5 before:via-purple-500/5 before:to-pink-500/5 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
            
            {/* Gradient Border Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
            
            {/* Floating Orb Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                 style={{
                   background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15) 0%, transparent 50%)`
                 }} />

            {/* Icon Container */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 
                              flex items-center justify-center shadow-2xl 
                              group-hover:scale-110 transition-transform duration-500
                              animate-pulse group-hover:animate-none">
                <service.icon className="w-11 h-11 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl -z-10 
                              scale-0 group-hover:scale-100 transition-transform duration-700" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {service.desc}
            </p>

            {/* Bottom Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className="mt-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA at Bottom */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mt-20"
    >
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
      >
        Start Your Project Today
        <Zap className="w-7 h-7" />
      </motion.a>
    </motion.div>
  </div>
</section>

      {/* END-TO-END IT SOLUTIONS */}
      <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              End-to-End IT Solutions
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              We don’t just build websites — we deliver complete digital transformation with enterprise-grade engineering.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {[
                { title: "Full-Stack Development", icon: Code, color: "from-indigo-500 to-blue-600" },
                { title: "Mobile App Development", icon: Zap, color: "from-yellow-500 to-orange-600" },
                { title: "Cloud Architecture & Migration", icon: Cloud, color: "from-sky-500 to-cyan-600" },
                { title: "AI & Machine Learning", icon: TrendingUp, color: "from-purple-500 to-pink-600" },
                { title: "DevOps & Automation", icon: Server, color: "from-green-500 to-emerald-600" },
                { title: "Cybersecurity & Compliance", icon: Shield, color: "from-red-500 to-rose-600" },
              ].map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-9 h-9" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.title.includes("Full-Stack") && "React, Next.js, Node.js, NestJS, Python/Django — pixel-perfect, scalable applications"}
                      {service.title.includes("Mobile") && "Native iOS/Android or cross-platform with React Native & Flutter"}
                      {service.title.includes("Cloud") && "AWS, Azure, GCP — lift-and-shift or cloud-native from day one"}
                      {service.title.includes("AI") && "LLM integration, predictive analytics, computer vision, automation"}
                      {service.title.includes("DevOps") && "CI/CD, Kubernetes, Terraform, GitOps, observability"}
                      {service.title.includes("Cybersecurity") && "Penetration testing, SOC2, ISO 27001, HIPAA, PCI-DSS"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-10">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-8">Why Top Companies Choose Us</h3>
                {["300+ Successful Projects Delivered", "150+ Enterprise & Startup Clients", "10+ Years of Engineering Excellence", "24/7 Dedicated Support Teams", "99.9% On-Time Delivery Rate", "100% Transparent Agile Process"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 my-4">
                    <CheckCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <span className="font-medium text-lg">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <h4 className="text-2xl font-bold mb-6 text-gray-900">Battle-Tested Tech Stack</h4>
                <div className="grid grid-cols-4 gap-6">
                  {["React", "Next.js", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes", "PostgreSQL"].map((tech) => (
                    <div key={tech} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-700 font-bold text-sm shadow-md">
                        {tech.slice(0, 3)}
                      </div>
                      <p className="mt-3 text-sm font-medium text-gray-700">{tech}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT WITH COUNTERS */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold">About Cloudbit</h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              We partner with ambitious companies to build modern digital products with engineering excellence.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div ref={ref300} className="p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-indigo-600">{count300}+</div>
                <div className="text-gray-600 mt-2">Projects Delivered</div>
              </div>
              <div ref={ref150} className="p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-indigo-600">{count150}+</div>
                <div className="text-gray-600 mt-2">Happy Clients</div>
              </div>
              <div ref={ref10} className="p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-indigo-600">{count10}+</div>
                <div className="text-gray-600 mt-2">Years Experience</div>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-indigo-600">24/7</div>
                <div className="text-gray-600 mt-2">Support</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="p-8 bg-white rounded-3xl shadow-xl border">
              <h3 className="text-2xl font-bold">Engineering Excellence</h3>
              <p className="mt-4 text-gray-600">Trunk-based dev • Feature flags • Full test coverage</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-xl border">
              <h3 className="text-2xl font-bold">Security First</h3>
              <p className="mt-4 text-gray-600">PCI • HIPAA • SOC2 • Regular pen tests</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLIENT RATINGS & REVIEWS */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
              <div className="text-6xl font-bold">5.0</div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-10 h-10 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl">Rated 5.0/5 by 200+ clients</p>
              <p className="text-sm opacity-90">on Clutch, Upwork & Google</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="space-y-4">
              <div className="text-6xl font-bold">150+</div>
              <p className="text-2xl font-semibold">Happy Clients</p>
              <p className="text-lg opacity-90">From startups to Fortune 500</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="space-y-4">
              <div className="text-6xl font-bold">99%</div>
              <p className="text-2xl font-semibold">Project Success Rate</p>
              <div className="w-full bg-white/20 rounded-full h-4 mt-6 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "99%" }} transition={{ duration: 2 }} viewport={{ once: true }} className="h-full bg-yellow-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-6xl font-bold leading-tight">Let’s Build<br />Something Great</h3>
            <p className="mt-6 text-xl text-gray-700">We reply within 24 hours.</p>
            <form onSubmit={handleSubmit} className="mt-12 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <input placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-4 border rounded-xl text-lg" />
                <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="p-4 border rounded-xl text-lg" />
              </div>
              <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full p-4 border rounded-xl text-lg" />
              <textarea placeholder="Message" rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full p-4 border rounded-xl text-lg"></textarea>
              <div>
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ["0 0 20px rgba(99,102,241,0.4)", "0 0 40px rgba(99,102,241,0.8)", "0 0 20px rgba(99,102,241,0.4)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-12 py-6 bg-indigo-600 text-white text-xl rounded-full font-bold hover:bg-indigo-700 transition shadow-2xl">
                  Send Message
                </motion.button>
                {sent && <p className="mt-4 text-green-600 text-xl font-bold animate-pulse">Message Sent! We'll reply soon</p>}
              </div>
            </form>
          </motion.div>
          <div className="space-y-8">
            <h3 className="text-4xl font-bold">Find Us</h3>
            <img src="https://placehold.co/800x500?text=Map" alt="map" className="w-full rounded-2xl shadow-xl" />
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3"><MapPin className="w-6 h-6" /> Mumbai, Maharashtra, India</div>
              <div className="flex items-center gap-3"><Mail className="w-6 h-6" /> hello@cloudbit.example</div>
              <div className="flex items-center gap-3"><Clock className="w-6 h-6" /> Mon–Fri, 9:30am–7:00pm IST</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PREMIUM FOOTER ==================== */}
<footer className="bg-gray-950 text-white pt-20 pb-10 relative overflow-hidden">
  {/* Background Gradient Glow */}
  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
  
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-10 mb-16">
      
      {/* Brand + Description */}
      <div className="lg:col-span-2">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Cloudbit
        </h2>
        <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
          Smart Digital IT Solutions Partner for startups and enterprises. We build scalable, secure, and intelligent products that grow with your business.
        </p>
        <div className="flex gap-4 mt-8">
          {["Facebook", "Twitter", "LinkedIn", "Instagram", "GitHub"].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ y: -5, scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-indigo-600 transition-all duration-300"
            >
              <span className="text-sm font-medium">{social[0]}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-indigo-400">Quick Links</h3>
        <ul className="space-y-4 text-gray-400">
          {["Home", "About Us", "Services", "Portfolio", "Blog", "Contact"].map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(" ", "")}`} className="hover:text-white transition">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-indigo-400">Our Services</h3>
        <ul className="space-y-4 text-gray-400">
          {["Web Development", "Mobile Apps", "Cloud Solutions", "AI & ML", "DevOps", "Cybersecurity"].map((service) => (
            <li key={service}>
              <a href="#services" className="hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full"></span> {service}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-indigo-400">Get in Touch</h3>
        <div className="space-y-5 text-gray-400">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
            <p>Mumbai, Maharashtra<br />India 400001</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-400" />
            <a href="mailto:hello@cloudbit.in" className="hover:text-white">hello@cloudbit.in</a>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <p>Mon–Fri: 9:30am – 7:00pm IST</p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400">
      <p>© 2025 Cloudbit. All rights reserved. Made with passion in India</p>
      
      <div className="flex gap-8 text-sm">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Cookie Policy</a>
      </div>

      {/* Trust Badges */}
      <div className="flex gap-6 items-center">
        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
          SSL Secured
        </span>
        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30">
          GDPR Ready
        </span>
      </div>
    </div>
  </div>

  {/* Floating Accent */}
  <motion.div
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10"
  />
  <motion.div
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -bottom-32 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10"
  />
</footer>
</div>
  );
}
