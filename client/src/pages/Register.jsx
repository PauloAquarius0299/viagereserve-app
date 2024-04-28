import React, { useState, useEffect } from 'react'
import "../styles/Register.scss"
import {useNavigate} from 'react-router-dom';
import addImage from '../assets/addImage.png'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });
    

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0]: value,
        });
    };

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === '')
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const register_form = new FormData()

            for(var key in formData){
                register_form.append(key, formData[key])
            }

            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                body: register_form
            })

            if(response.ok){
                navigate('/login')
            }
        } catch (err){
            console.log('Resgister failed', err.message)
        }
    }


  return (
    <div className='register'>
        <div className='register-content'>
            <form className='register-content-form' onSubmit={handleSubmit}>
                <input 
                placeholder='Seu Nome'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                />
                <input 
                placeholder='Sobrenome'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                />
                <input type="email" 
                placeholder='Digite seu Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                />
                <input type="password" 
                placeholder='Digite sua Senha'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                />
                <input type="password" 
                placeholder='Confirme sua Senha'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
                {!passwordMatch && (
                    <p style={{ color: "red" }}>Passwords are not matched!</p>
                )}

                <input type="file" 
                id='image'
                name='profileImage'
                accept='image/*'
                style={{display: 'none'}}
                onChange={handleChange}
                required
                />
                <label htmlFor="image">
                    <img src={addImage} alt="add profile picture" />
                    <p>Carregar sua foto</p>
            </label>

            {formData.profileImage && (
                <img 
                src={URL.createObjectURL(formData.profileImage)}
                alt='profile photo'
                style={{ maxWidth: '80px'}}
                />
            )}
            <button type='submit' disabled={!passwordMatch}>Registrar</button>
            </form>
            <a href="/login">Você possui uma conta? Clique Aqui!</a>
        </div>
    </div>
  )
}

export default Register