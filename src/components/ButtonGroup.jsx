import React from 'react'

const ButtonGroup = ({ onReset }) => {
  return (
    <div className="button-group">
      <button type="button" onClick={onReset} className="reset-button">
        <span className="reset-icon">↺</span> รีเซ็ต
      </button>
      <button type="submit" className="submit-button">
        <span className="submit-icon">✓</span> ส่งแบบสำรวจ
      </button>
    </div>
  )
}

export default ButtonGroup 