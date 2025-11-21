// src/pages/Career.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";

const jobs = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    salary: "$15k - $20k",
    description:
      "We are looking for a skilled Frontend Developer to create stunning UI with React, TailwindCSS, and Framer Motion.",
  },
  {
    title: "Backend Developer",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "3+ years",
    salary: "$18k - $25k",
    description:
      "Join our backend team to build scalable APIs, database systems, and server-side logic using Node.js or Laravel.",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
    salary: "$12k - $18k",
    description:
      "Design beautiful and responsive interfaces, prototypes, and visual experiences for web and mobile platforms.",
  },
  {
    title: "DevOps Engineer",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "3+ years",
    salary: "$20k - $28k",
    description:
      "Automate deployments, monitor servers, and maintain cloud infrastructure using AWS, Docker, and CI/CD pipelines.",
  },
  {
    title: "AI/ML Engineer",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$25k - $35k",
    description:
      "Work on AI projects, develop ML models, and integrate intelligent solutions into our software products.",
  },
];

export default function Career() {
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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-32 px-6 overflow-hidden">
      {/* Background particles */}
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

      {/* Page Header */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-center mb-16"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
      >
        Join Our Team
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="max-w-3xl mx-auto text-center text-xl md:text-2xl mb-20 opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        Explore exciting career opportunities at Cloudbit Digital IT Solutions. We are
        committed to innovation, creativity, and professional growth.
      </motion.p>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            ref={cardRef}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">{job.title}</h2>
            </div>
            <p className="text-gray-200 mb-2">{job.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <MapPin className="w-5 h-5 text-gray-300" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Clock className="w-5 h-5 text-gray-300" />
              <span>{job.type}</span>
            </div>
            <div className="mt-4 text-gray-200">Experience: {job.experience}</div>
            <div className="mt-1 text-gray-200">Salary: {job.salary}</div>
            <button className="mt-6 w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-500 transition-all duration-300">
              Apply Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Call to action section */}
      <motion.div
        className="mt-32 max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-xl p-12 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-4">Can't find your role?</h2>
        <p className="text-gray-200 mb-6">
          We are always looking for talented people. Send your resume to{" "}
          <span className="text-yellow-400 font-bold">careers@cloudbit.com</span>
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all duration-300">
          Send Resume
        </button>
      </motion.div>

      {/* Decorative floating shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-yellow-400/20 rounded-full top-[-120px] left-[-80px] blur-3xl animate-pulse-slow"
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-400/20 rounded-full bottom-[-140px] right-[-100px] blur-3xl animate-pulse-slow delay-500"
      />
    </div>
  );
}
