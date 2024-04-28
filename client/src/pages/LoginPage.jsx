import React, {useState} from 'react'
import '../styles/Login.scss';
import {setLogin} from '../redux/state'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch ('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      const loggedIn = await response.json()

      if(loggedIn){
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }
    } catch (err){
      console.log('login failed', err.message)
    }
  }

  return (
    <div className='login'>
      <div className='login-content'>
        <form className='login-content-form' onSubmit={handleSubmit}>
          <input 
          type='email'
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <input 
          type='password'
          placeholder='Digite sua senha'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />
          <button type='submit'>Acessar</button>
        </form>
        <a href='/register'>Você ainda não tem uma conta? Clique Aqui!</a>
      </div>
    </div>
  )
}

export default LoginPage