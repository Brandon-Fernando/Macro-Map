import "./Progress.css";
import { motion } from "framer-motion";

const ProgressHalfCircle = ({ percentage }) => {
  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className="half-circle-svg-wrapper">
      <svg className="half-circle-svg" viewBox="0 0 140 80">
        {/* background arc */}
        <path
          className="half-circle-bg"
          d="M 10 70 A 60 60 0 0 1 130 70"
          pathLength="100"
        />

        {/* animated progress arc */}
        <motion.path
          className="half-circle-progress"
          d="M 10 70 A 60 60 0 0 1 130 70"
          pathLength="100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - clamped }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            strokeDasharray: 100,
          }}
        />
      </svg>

      <div className="half-circle-text">
        <span className="prog-text">{clamped}%</span>
      </div>
    </div>
  );
};

export default ProgressHalfCircle;