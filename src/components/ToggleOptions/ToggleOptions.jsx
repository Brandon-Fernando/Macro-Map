import "./ToggleOptions.css"
import { motion } from "framer-motion";

const ToggleOptions = ({ option, setOption, options }) => {
  const optionWidth = 100 / options.length;
  const activeIndex = options.indexOf(option);

  return (
    <div className="toggle-options-container">
      <motion.div
        className="option-slider"
        animate={{ left: `${activeIndex * optionWidth}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        style={{ width: `${optionWidth}%` }}
      />

      {options.map((opt, index) => (
        <div
          key={opt}
          className={`option-card ${activeIndex === index ? "active" : ""}`}
          onClick={() => setOption(opt)}
        >
          <span>{opt}</span>
        </div>
      ))}
    </div>
  );
};

export default ToggleOptions;