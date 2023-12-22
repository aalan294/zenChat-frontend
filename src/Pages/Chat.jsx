import React, { useEffect, useState, useRef } from 'react'
import {io} from 'socket.io-client'
import styled from 'styled-components'
import Contacts from '../Components/Contacts'
import ChatPage from '../Components/ChatPage'
import { useNavigate } from 'react-router-dom'
import api from '../Utils/api'
import { ToastContainer,toast } from 'react-toastify'

const Chat = () => {
  const navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState(undefined)
  const [contacts,setContacts] = useState([])
  const [currentChat,setCurrentChat] = useState(undefined)
  const [loader,setLoader] = useState(false)
  const socket = useRef()
  const toastOption = {
    position:'bottom-right',
    autoClose: 8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
    else{
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')))
      setLoader(true)
    }
  },[])
  useEffect(()=>{
    if(currentUser){
      socket.current = io("https://zenchat-backend.onrender.com")
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser])
  useEffect(()=>{
    const fetch = async()=>{
      try {
        if(currentUser){
          const {data} = await api.get(`/users/${currentUser._id}`)
          if(data.status===false){
            toast.error(data.message,toastOption)
          }
          else{
            setContacts(data.data)
          }
        }
      } catch (error) {
        toast.error(error.message,toastOption)
      }
    }
    fetch()
  },[currentUser])

  const changeChat=(chat)=>{
    setCurrentChat(chat)
  }

  return (
    <>
    <Container>
      <div className={`container `}>
              <div className={`mobile-contacts ${currentChat!==undefined?"cont":""}`}>
              <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat}  />
              </div>
              <div className={`mobile-chat ${currentChat?"chat":""}`}>
              <ChatPage currentUser={currentUser} currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket} />
            </div>
        </div>
    </Container>
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131326;
  .container{
    height: 85vh;
    width: 90vw;
    display: grid;
    grid-template-columns: 25% 75%;
    background-color: #0f0f1d;
    .mobile-contacts{
          overflow: hidden;
          height: 100%;
        }
    @media only screen and (max-width: 1200px){//mobile screen
        grid-template-columns: 45% 55%;
    }
    @media only screen and (max-width: 900px){//mobile screen
        grid-template-columns: 40% 60%;
    }
    @media only screen and (max-width: 600px){//mobile screen
        grid-template-columns: 100% 0%;
        .mobile-chat{
          display: none;
        }
        .cont{
          display: none;
        }
        .chat{
          display: contents;
        }
    }
  }
`
export default Chat