import { useState } from 'react';
import styles from '../components/Signup.module.css';
import NavbarBlank from '../components/NavbarBlank';
import Layout from '../components/Layout'

function Signup() {
    const [formData, setFormData] = useState({
        isProducer: false,
        username: '',
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        console.log(formData);
        fetch('/api/user', { method: 'POST', body: JSON.stringify(formData) })
    }

    return <><NavbarBlank></NavbarBlank><Layout><form className="floatingForm" onSubmit={submit}>
        <h2 className="formName">Create Account</h2>
        <label>Username</label>
        <input placeholder="Username" name="username" onChange={handleInputChange} required></input>
        <label>Email</label>
        <input placeholder="Email" name="email" type="email"  onChange={handleInputChange} required></input>
        <label>Password</label>
        <input placeholder="Password" type="password" name="password"  onChange={handleInputChange} required></input>
        <div className={styles.userTypes}>
            <button type="button" onClick={() => setFormData({...formData, isProducer: false})} className={!formData.isProducer ? styles.active : ""}>Viewer</button>
            <button type="button" onClick={() => setFormData({...formData, isProducer: true})} className={formData.isProducer ? styles.active : ""}>Producer</button>
        </div>
        <button className="submitButton">Submit</button>
    </form></Layout></>
}

export default Signup