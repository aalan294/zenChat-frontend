import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Avatar from './Pages/Avatar'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element ={<Register />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/avatar' element ={<Avatar />} />
        <Route path='/' element ={<Chat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App