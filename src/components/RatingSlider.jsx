import { useState } from 'react';
import './RatingSlider.css'; // We'll create this next

const RatingSlider = () => {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  const getSliderClass = () => {
    if (value <= 25) return 'low';
    if (value <= 50) return 'medium';
    if (value <= 75) return 'high';
    return 'excellent';
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <label htmlFor="rating">Rating</label>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type="range"
        className={`slider-track ${getSliderClass()}`}
        id="rating"
        min="0"
        max="100"
        value={value}
        step="1"
        onChange={handleChange}
      />
      <div className="slider-labels">
        <span className="slider-label">Poor</span>
        <span className="slider-label">Fair</span>
        <span className="slider-label">Good</span>
        <span className="slider-label">Very Good</span>
        <span className="slider-label">Excellent</span>
      </div>
    </div>
  );
};

export default RatingSlider;