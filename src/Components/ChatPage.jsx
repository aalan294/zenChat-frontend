import Welcome from './Welcome'
import ChatContainer from './ChatContainer'

const ChatPage = ({currentUser,currentChat,setCurrentChat,socket}) => {
  return (
    <div>
      {currentChat===undefined?(<Welcome currentUser={currentUser} />):(<ChatContainer socket ={socket}  currentChat={currentChat} currentUser={currentUser} setCurrentChat={setCurrentChat} />)}
      </div>
  )
}

export default ChatPage