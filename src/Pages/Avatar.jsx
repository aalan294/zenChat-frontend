import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import Load from '../assets/loader.gif'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../Utils/api'
import axios from 'axios'

const Avatar = () => {
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
        }
    },[])
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const [avatars,setAvatars] = useState([])
    const [selectedAvatars,setSelectedAvatars] = useState(undefined)
    const toastOption = {
        position:'bottom-right',
        autoClose: 8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    const setProfilePicture=async()=>{
        try {
            if(selectedAvatars===undefined){
                toast.error("select a profile avatar to proceed",toastOption)
            }
            else{
                let local = await JSON.parse(localStorage.getItem('chat-app-user'))
                const headers = {
                    Authorization: `Bearer ${local.token}`,
                  }
                const {data} = await api.put(`users/avatar/${local._id}`,{isAvatarImage:true,AvatarImage:avatars[selectedAvatars]},{headers})
                if(data.status === false){
                    toast.error(data.message,toastOption)
                }
                if(data.status === true){
                    localStorage.setItem('chat-app-user',JSON.stringify(data.user))
                    console.log(data.user)
                    navigate('/')
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        const svgToDataUri = (svgData) => {
            return `data:image/svg+xml;base64,${btoa(svgData)}`;
        };
        const get = async()=>{
            try {
                let data = []
             for(let i=0;i<4;i++){
                 const response = await axios.get(`https://api.multiavatar.com/45678945/${Math.round(Math.random()*1000)}`)
                 data.push(svgToDataUri(response.data))
                 console.log(svgToDataUri(response.data))
                 await new Promise(resolve => setTimeout(resolve, 500))
             }
             setAvatars(data)
             setLoader(false)
            } catch (error) {
                console.log(error.message)
            }
        
        }   
      get();
    },[])
    

  return (
    <>
        {(loader)?(<Container>
                    <img src={Load} alt="" />
                </Container>):(
                    <Container>
                        <div className="title-container">
                            <h1>Choose an Avatar for Profile Picture</h1>
                        </div>
                        <div className="avatars">
                            {
                                avatars.map((item, index) => (
                                    <div key={index} className={`avatar ${selectedAvatars === index ? "selected" : ""}`}>
                                        <img src={item} alt="" onClick={() => { setSelectedAvatars(index)}} />
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={()=>setProfilePicture()}>Set Profile Picture</button>
                    </Container>
                )}
        
        <ToastContainer />
    </>
  )
}
const Container = styled.div`
    height:100vh ;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5rem;
    align-items: center;
    background-color: #0e0e1a;
    color: white;
    .title-container{
        h1{
            text-align: center;
            color: inherit;
        }
    }
    .avatars{
        display: flex;
        justify-content:space-evenly;
        align-items: center;
        width: 100%;
        .avatar{
            width: 6rem;
            border: 5px solid transparent;
            border-radius: 50%;
            img{
                object-fit: cover;
            }
            @media only screen and (max-width: 600px){//mobile screen
                width: 4rem;
                img{
                    width: 100%;
                }
            }
        }
        .selected{
            border: 5px solid blue;
        }
    }
    button{
        padding: 0.7rem 3rem;
        border-radius: 0.4rem;
        font-size: 1rem;
        background-color: #9d429d;
        color: white;
    }

`
export default Avatar