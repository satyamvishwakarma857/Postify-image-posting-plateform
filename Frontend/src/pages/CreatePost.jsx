import React from 'react'
import axios from "axios"

import { useNavigate } from "react-router-dom"
const backendUrl = import.meta.env.VITE_BACKEND_URL


const CreatePost = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            const formData = new FormData(e.target);



            const res = await axios.post(
                `${backendUrl}/create-post`,
                formData
            )
            //`${process.env.MONGODB_URI}/create-post`

            navigate("/feed")
        } catch (err) {
            console.log(err)
            alert("Error creating post")
        }
    }


    return (
        <section className='create-post-section' >
            <h1>Create post</h1>

            <form onSubmit={handleSubmit} >

                <input type="file" name="image" accept="image/*" />
                <input type="text" name='caption' placeholder='Enter caption' required />
                <button type='submit' >Submit</button>

            </form>

        </section>
    )
}

export default CreatePost