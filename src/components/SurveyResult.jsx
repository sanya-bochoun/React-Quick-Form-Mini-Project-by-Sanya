import React from 'react'
import Header from './Header'

const SurveyResult = ({ formData, onNewSurvey }) => {
  return (
    <div className="form-container">
      <Header />
      
      <div className="result-container">
        <div className="success-message">
          <span className="success-icon">✓</span> ส่งแบบสำรวจสำเร็จ!
        </div>
        
        <div className="result-content">
          <div className="result-item">
            <span className="result-label">ชื่อ</span>
            <span className="result-value">{formData.name}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">อีเมล</span>
            <span className="result-value">{formData.email}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">หนังที่เลือก</span>
            <span className="result-value">{formData.favoriteMovie}</span>
          </div>
          
          {formData.opinion && (
            <div className="result-item">
              <span className="result-label">ความคิดเห็น</span>
              <span className="result-value">{formData.opinion}</span>
            </div>
          )}
        </div>
        
        <button onClick={onNewSurvey} className="new-survey-button">
          <span className="refresh-icon">↺</span> ทำแบบสำรวจใหม่
        </button>
      </div>
    </div>
  )
}

export default SurveyResult 