import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/upcoming.module.css'

function Upcoming() {

    const [sessions,setSessions] = useState()
    const userID = window.localStorage.getItem('user_session_id')

    async function fetch_Sessions() {
        try{
            const response = await axios.post('/user/get-sessions', { id: userID })
            setSessions(response.data)
            console.log(response.data)
        }
        catch(err){
            console.log("Session fetch error - ",err)
        }
    }

    useEffect(()=>{
        fetch_Sessions()
    },[])


    return (
        <div className={styles.upcomingContainer}>
          <div className={styles.header}>
            <h2>Upcoming Sessions</h2>
          </div>
          <div className={styles.sessionList}>
            {sessions && sessions.length > 0 ? (
              sessions.map((session, ind) => (
                <div key={ind} className={styles.sessionItem}>
                  <p className={styles.sessionTopic}>{session.session_topic}</p>
                  <p className={styles.sessionDate}>{session.session_start.substring(0, 10)}</p>
                  <p className={styles.sessionTime}>{session.session_start.substring(11)}</p>
                  <p>to</p>
                  <p className={styles.sessionEndDate}>{session.session_end.substring(0, 10)}</p>
                  <p className={styles.sessionEndTime}>{session.session_end.substring(11)}</p>
                  <Link to={session.session_link} target='_blank' className={styles.sessionLink}>Join Meeting</Link>
                </div>
              ))
            ) : (
              <p>No upcoming sessions found.</p>
            )}
          </div>
        </div>
    )
}

export default Upcoming