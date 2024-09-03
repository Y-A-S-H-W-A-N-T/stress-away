import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from '../styles/login.module.css'

function Login() {

    const [user, setUser] = useState('Yashwant')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const Login_User = async () => {
        setLoading(true)
        if (user === '')
            return alert("Enter Credentials")

        await axios.post('/user/login', { name: user })
            .then((res) => {
                if (res.status === 200) {
                    window.localStorage.setItem('user_session_id', res.data)
                    setLoading(false)
                    navigate('/home', { replace: true })
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setUser('');
                    alert(err.response.data.msg)
                    setLoading(false)
                } else {
                    alert("Error in Login")
                    setLoading(false)
                }
            })
        setLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <input
                    className={styles.input}
                    placeholder='Enter your username'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <button
                    onClick={Login_User}
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.userList}>
                    <h2 onClick={() => setUser('Yashwant')}>USER 1</h2>
                    <h2 onClick={() => setUser('Soumya')}>USER 2</h2>
                    <h2 onClick={() => setUser('Abish')}>USER 3</h2>
                </div>
            </div>
        </div>
    )
}

export default Login