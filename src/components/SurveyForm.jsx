import React, { useState } from 'react'
import FormFields from './FormFields'
import ButtonGroup from './ButtonGroup'

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
      <button className="submit-button" onClick={onNewSurvey}>ทำแบบสำรวจใหม่</button>
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