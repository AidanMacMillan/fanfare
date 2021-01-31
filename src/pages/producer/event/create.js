import { useState } from 'react'
import { useEffect } from 'react'
import NavbarProducer from '../../../components/NavbarProducer'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'

function CreateEvent() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['token']);
    const [formData, setFormData] = useState({
        name: false,
        description: '',
        startTime: '',
        endTime: ''
    });

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function submit(e) {
        if(e)
            e.preventDefault()
        formData.token = cookies.token;
        fetch('/api/producer/event', { method: 'POST', body: JSON.stringify(formData) }).then(res => {
            return res.json()
        }).then(data => {
            if(data.name)
                router.push('/producer/event/'+data.name);
        })
    }

    return <><NavbarProducer></NavbarProducer><Layout>
        <form className="floatingForm" onSubmit={submit}>
            <h2 className="formName">Create Event</h2>
            <label>Name</label>
            <input placeholder="Name" name="name" onChange={handleInputChange} required></input>
            <label>Description</label>
            <textarea placeholder="Description" name="description" onChange={handleInputChange} required></textarea>
            <label>Start Time</label>
            <input type="datetime-local" name="startTime" onChange={handleInputChange} required></input>
            <label>End Time</label>
            <input type="datetime-local" name="endTime" onChange={handleInputChange} required></input>
            <button className="submitButton">Create</button>
        </form>
    </Layout></>
}

export default CreateEvent;