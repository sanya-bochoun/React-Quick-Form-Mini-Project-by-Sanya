import React from 'react'

const FormFields = ({ formData, handleChange, errors }) => {
  // ข้อมูลภาพยนตร์
  const movies = [
    { id: 'avatar', title: 'Avatar (2009)', director: 'James Cameron' },
    { id: 'inception', title: 'Inception (2010)', director: 'Christopher Nolan' },
    { id: 'interstellar', title: 'Interstellar (2014)', director: 'Christopher Nolan' },
    { id: 'shawshank', title: 'The Shawshank Redemption (1994)', director: 'Frank Darabont' },
    { id: 'pulp-fiction', title: 'Pulp Fiction (1994)', director: 'Quentin Tarantino' },
    { id: 'parasite', title: 'Parasite (2019)', director: 'Bong Joon-ho' }
  ]

  return (
    <>
      {/* ฟิลด์ชื่อ */}
      <div className="form-group">
        <label htmlFor="name">
          ชื่อ <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="กรุณากรอกชื่อของคุณ"
          className={errors.name ? 'error-input' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      {/* ฟิลด์อีเมล */}
      <div className="form-group">
        <label htmlFor="email">
          อีเมล <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      {/* ตัวเลือกภาพยนตร์ */}
      <div className="form-group">
        <label>เลือกหนังที่คุณชอบ <span className="required">*</span></label>
        
        {movies.map(movie => (
          <div className="radio-option" key={movie.id}>
            <input
              type="radio"
              id={movie.id}
              name="favoriteMovie"
              value={movie.title}
              checked={formData.favoriteMovie === movie.title}
              onChange={handleChange}
            />
            <label htmlFor={movie.id}>
              {movie.title}<br/>
              <span className="director">Director: {movie.director}</span>
            </label>
          </div>
        ))}
        {errors.favoriteMovie && <div className="error-message">{errors.favoriteMovie}</div>}
      </div>

      {/* ฟิลด์ความคิดเห็น */}
      <div className="form-group">
        <label htmlFor="opinion">
          ความคิดเห็นเกี่ยวกับหนัง
        </label>
        <textarea
          id="opinion"
          name="opinion"
          value={formData.opinion}
          onChange={handleChange}
          placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
          rows="4"
        ></textarea>
      </div>
    </>
  )
}

export default FormFields 