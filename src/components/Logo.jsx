// src/components/Logo.jsx
export default function Logo({ className }) {
  return (
    <svg
      className={className}
      width="400"
      height="150"
      viewBox="0 0 400 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="150" rx="20" fill="#1E3A8A" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        <tspan x="50%" dy="-20" fontSize="70">Cloudbit</tspan>
        
        <tspan x="50%" dy="50" fontSize="50">Digital IT Solutions</tspan>
      </text>
    </svg>
  );
}
