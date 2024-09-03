import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import styles from '../styles/schedule.module.css'

function Schedule() {
  const [summary, setSummary] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [error, setError] = useState('')

  const userID = window.localStorage.getItem('user_session_id')

  const [auth,setAuth] = useState(false) // make user login before scheduling a session

  const handleCreateMeet = async () => {
    if(summary==='' || startTime==='' || endTime==='')
      return alert("Enter fields")
    try {
      const response = await axios.post('/api/create-meet', {
        summary,
        startTime,
        endTime,
      })

      if(response.data.meetLink) setMeetLink(response.data.meetLink)
      setAuth(false)
      setError('')
      await axios.post('/user/add-session',{
        session_topic: summary,
        session_start: startTime,
        session_end: endTime,
        session_link: response.data.meetLink,
        id: userID
      })
      alert(`Session Added in your upcomming Sessions`)

    } catch (err) {
      setError('Login before scheduling a session')
      setAuth(true)
      setMeetLink('')
    }
  };

  const handleAuthorize = async() => {
    window.location.href = 'http://localhost:3000/auth'
  }

  return (
    <div className={styles.App}>
      <h1>Schedule Session</h1>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="summary">What is the meeting about?</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="session topic"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {!auth && <button onClick={handleCreateMeet}>Create Google Meet Link</button>}
        {auth && <button onClick={handleAuthorize}>Authorize with Google</button>}
      </div>
      {meetLink && (
        <div className={styles.result}>
          Google Meet Link: <a href={meetLink} target="_blank" rel="noopener noreferrer">{meetLink}</a>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default Schedule;