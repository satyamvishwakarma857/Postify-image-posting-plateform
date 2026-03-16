import React, { useState, useEffect } from 'react'
import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL
import { BsThreeDotsVertical } from "react-icons/bs";


const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            caption: "Beautiful scenery",
        }
    ])

    useEffect(() => {

        axios.get(`${backendUrl}/posts`)
            //`${process.env.MONGODB_URI}/posts`
            .then((res) => {

                setPosts(res.data.data)
                // console.log(res.data)

            })


    }, [])

    const getAllPosts = ()=>{
        axios.get(`${backendUrl}/posts`)
            //`${process.env.MONGODB_URI}/posts`
            .then((res) => {

                setPosts(res.data.data)
                // console.log(res.data)

            })

    }

    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (id) => {
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id);
        }
    };

    const deletePost = async (id) => {
        await axios.delete(`${backendUrl}/post/${id}`);
        alert("Post deleted");
        getAllPosts();
    };


    return (

        <section className='feed-section' >

            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card' >


                            <div className="post-header">
                                <BsThreeDotsVertical onClick={() => toggleMenu(post._id)} />

                                {activeMenu === post._id && (
                                    <div className="menu">
                                        <button className='button1' onClick={() => deletePost(post._id)}>Delete</button>
                                    </div>
                                )}
                            </div>




                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }

        </section>

    )
}

export default Feed