import React, { useState } from 'react'

// คอมโพเนนต์สำหรับแสดงผลข้อมูลที่ส่ง
const SurveyResult = ({ formData, onNewSurvey }) => {
  return (
    <div className="result-container">
      <h2>ขอบคุณสำหรับการตอบแบบสำรวจ!</h2>
      <div className="result-info">
        <p><strong>ชื่อ:</strong> {formData.name}</p>
        <p><strong>อีเมล:</strong> {formData.email}</p>
        <p><strong>ภาพยนตร์ที่ชื่นชอบ:</strong> {formData.favoriteMovie}</p>
        {formData.opinion && (
          <p><strong>ความคิดเห็น:</strong> {formData.opinion}</p>
        )}
      </div>
      <button className="btn primary" onClick={onNewSurvey}>ทำแบบสำรวจใหม่</button>
    </div>
  )
}

// คอมโพเนนต์สำหรับช่องกรอกข้อมูลในฟอร์ม
const FormFields = ({ formData, handleChange, errors }) => {
  return (
    <div className="form-fields">
      <div className="form-group">
        <label htmlFor="name">ชื่อ: <span className="required">*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">อีเมล: <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="favoriteMovie">ภาพยนตร์ที่ชื่นชอบ: <span className="required">*</span></label>
        <select
          id="favoriteMovie"
          name="favoriteMovie"
          value={formData.favoriteMovie}
          onChange={handleChange}
          className={errors.favoriteMovie ? 'error' : ''}
        >
          <option value="">-- กรุณาเลือก --</option>
          <option value="action">แอคชั่น</option>
          <option value="comedy">ตลก</option>
          <option value="drama">ดราม่า</option>
          <option value="horror">สยองขวัญ</option>
          <option value="scifi">ไซไฟ</option>
        </select>
        {errors.favoriteMovie && <p className="error-text">{errors.favoriteMovie}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="opinion">ความคิดเห็นเพิ่มเติม:</label>
        <textarea
          id="opinion"
          name="opinion"
          value={formData.opinion}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>
    </div>
  )
}

// คอมโพเนนต์สำหรับปุ่มในฟอร์ม
const ButtonGroup = ({ onReset }) => {
  return (
    <div className="button-group">
      <button type="submit" className="btn primary">ส่งแบบสำรวจ</button>
      <button type="button" className="btn secondary" onClick={onReset}>รีเซ็ต</button>
    </div>
  )
}

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteMovie: '',
    opinion: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    favoriteMovie: ''
  })

  // เพิ่ม state สำหรับติดตามว่าฟอร์มถูกส่งแล้วหรือไม่
  const [isSubmitted, setIsSubmitted] = useState(false)
  // เพิ่ม state สำหรับเก็บข้อมูลที่ส่ง
  const [submittedData, setSubmittedData] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }

    if (name === 'email' && value.trim() !== '') {
      if (!isValidEmail(value)) {
        setErrors({
          ...errors,
          email: 'รูปแบบอีเมลไม่ถูกต้อง'
        })
      }
    }
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = { name: '', email: '', favoriteMovie: '' }

    if (!formData.name.trim()) {
      newErrors.name = 'โปรดใส่ชื่อของคุณ'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'โปรดใส่อีเมลของคุณ'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    }

    if (!formData.favoriteMovie) {
      newErrors.favoriteMovie = 'กรุณาเลือกหนังที่คุณชอบ'
    }

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    const hasErrors = 
      newErrors.name !== '' || 
      newErrors.email !== '' || 
      newErrors.favoriteMovie !== '';
    
    if (!hasErrors) {
      console.log('ข้อมูลที่ส่ง:', formData)
      // บันทึกข้อมูลที่ส่งและเปลี่ยนสถานะเป็นส่งแล้ว
      setSubmittedData({...formData})
      setIsSubmitted(true)
    } else {
      console.log('กรุณาตรวจสอบข้อมูลให้ถูกต้อง', newErrors)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      favoriteMovie: '',
      opinion: ''
    })
    setErrors({
      name: '',
      email: '',
      favoriteMovie: ''
    })
  }

  const handleNewSurvey = () => {
    handleReset()
    setIsSubmitted(false)
    setSubmittedData(null)
  }

  // แสดงหน้าผลลัพธ์หลังจากส่งแบบสำรวจ
  if (isSubmitted && submittedData) {
    return <SurveyResult formData={submittedData} onNewSurvey={handleNewSurvey} />
  }

  // แสดงแบบฟอร์ม
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <FormFields 
          formData={formData} 
          handleChange={handleChange}
          errors={errors}
        />
        
        <ButtonGroup onReset={handleReset} />
      </form>
    </div>
  )
}

export default SurveyForm