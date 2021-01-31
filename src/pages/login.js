import { useState } from 'react'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import NavbarBlank from '../components/NavbarBlank'
import Layout from '../components/Layout'

function Login() {
    const router = useRouter()
    const [cookie, setCookie] = useCookies(["token"])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        console.log(formData);

        fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) }).then((res) => {
            if(res.ok) {
                return res.json();
            }
        }).then((body) => {
            if(body.token) {
                setCookie("token", body.token, {path: "/"});

                if(body.isProducer) {
                    router.push('/producer');
                } else {
                    router.push('/events');
                }
            }
        });   
    }

    return <><NavbarBlank></NavbarBlank><Layout><form className="floatingForm" onSubmit={submit}>
        <h2 className="formName">Login</h2>
        <label>Email</label>
        <input placeholder="Email" type="email" name="email" onChange={handleInputChange} required></input>
        <label>Password</label>
        <input placeholder="Password" type="password" name="password" onChange={handleInputChange} required></input>
        <button className="submitButton">Submit</button>
    </form></Layout></>
}

export default Login