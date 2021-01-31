import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useCookies } from 'react-cookie'
import { fetcher } from '../../../utils/fetch'

import NavbarProducer from '../../../components/NavbarProducer'
import Layout from '../../../components/Layout'
import styles from '../../../components/ProducerEvent.module.css'

function Event() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(["token"])
    const { event } = router.query
    const { data, error } = useSWR('/api/producer/event?name=' + event + '&token=' + cookies.token, fetcher)

    const [formData, setFormData] = useState({
        name: false,
        description: '',
        startTime: '',
        endTime: '',
        games: []
    });

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function submit(e) {
        e.preventDefault()
        formData.token = cookies.token;
        const event = await fetch('/api/producer/event', { method: 'POST', body: JSON.stringify(formData) })
        router.push("/producer/event/"+event);
    }

    function addGame() {
        let game = {
            startTime: '', question: '', answers: ''
        }
        setFormData(prevState => ({
            games: [...prevState.games, game]
        }))
        console.log(JSON.stringify(formData))
    }

    function deleteGame(i) {
        let games = formData.games;
        games.splice(i, 1);

        setFormData(prevState => ({
            games: games
        }))
    }

    function displayInteractives() {
        if(formData.games) {
            return formData.games.map((game, i) => <div className="interactiveEditItem" key={i}>
                <div>
                    <input placeholder="Question" name={"question_"+i} required></input>
                    <div className="editQuestionGrid">
                        <input placeholder="Answer 1(Correct)" name={"answer_1_"+i} required></input>
                        <input placeholder="Answer 2" name={"answer_2_"+i} required></input>
                        <input placeholder="Answer 3(Optional)" name={"answer_3_"+i} required></input>
                        <input placeholder="Answer 4(Optional)" name={"answer_4_"+i} required></input>
                    </div>
                    <input type="datetime-local" name={"startTime_"+i} required></input>
                    <button className="deleteButton" onClick={deleteGame(i)}>Delete</button>
                </div>
            </div>)
        }
        return <></>
    }

    if (error || (!error && !data)) {
        return <><NavbarProducer></NavbarProducer><Layout>
            <div className={styles.eventGrid}>
                <div className="panel">
                    <form>
                        <label>Name</label>
                        <input placeholder="Name" name="name" onChange={handleInputChange} required></input>
                        <label>Description</label>
                        <textarea placeholder="Description" name="description" onChange={handleInputChange} required></textarea>
                        <label>Start Time</label>
                        <input type="datetime-local" name="startTime" onChange={handleInputChange} required></input>
                        <label>End Time</label>
                        <input type="datetime-local" name="endTime" onChange={handleInputChange} required></input>
                        <label>Public</label>
                        <input type="checkbox" name="public" onChange={handleInputChange} required></input>
                        <button>Update</button>
                    </form>
                </div>
                <div className="panel">
                    <button>Add Interactive</button>
                </div>
            </div>
        </Layout></>
    }

    return <><NavbarProducer></NavbarProducer><Layout>
        <div className={styles.eventGrid}>
            <div className="panel editPanel">
                <form>
                    <label>Name</label>
                    <input placeholder="Name" name="name" value={data.name} onChange={handleInputChange} required></input>
                    <label>Description</label>
                    <textarea placeholder="Description" name="description" value={data.description} onChange={handleInputChange} required></textarea>
                    <label>Start Time</label>
                    <input type="datetime-local" name="startTime" value={data.startTime} onChange={handleInputChange} required></input>
                    <label>End Time</label>
                    <input type="datetime-local" name="endTime" value={data.endTime} onChange={handleInputChange} required></input>
                    <label>Public</label>
                    <input type="checkbox" name="public" value={data.public} onChange={handleInputChange} required></input>
                    <button>Update</button>
                </form>
            </div>
            <div className="panel">
                <button onClick={addGame}>Add Interactive</button>
                {displayInteractives()}
            </div>
        </div>
    </Layout></>
}

export default Event;