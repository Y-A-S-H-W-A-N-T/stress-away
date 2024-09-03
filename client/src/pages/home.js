import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';

function Home() {

  const navigate = useNavigate()

  const LogOut = async()=>{
    window.localStorage.removeItem('user_session_id')
    navigate('/',{ replace: true })
  }

  return (
    <div className={styles.container}>
      <p onClick={LogOut} style={{position: 'absolute', top: 0, right: 20, padding: '10px', backgroundColor: 'rgb(171, 67, 67)', color: 'black', cursor: 'pointer'}}>Logout</p>
      <div className={styles.leftSection}>
        <h1 className={styles.heading}>Welcome to <span style={{fontSize: '5.0rem', color: '#f99c9b'}}>StressAway</span></h1>
        <h2 className={styles.subheading}>
          At StressAway, we are revolutionizing mental health care by making online counselling more accessible for students and young adults. Our mission is to provide seamless tele-psychiatric therapy sessions that are both effective and convenient.
        </h2>
        <p className={styles.infoText}>Schedule Sessions | Join Sessions | Create Sessions</p>
      </div>
      <div className={styles.rightSection}>
        <Link to='/schedule' className={styles.linkButton}>Schedule a meeting</Link>
        <Link to='/upcoming' className={styles.linkButton}>Upcoming Sessions</Link>
      </div>
    </div>
  );
}

export default Home;
