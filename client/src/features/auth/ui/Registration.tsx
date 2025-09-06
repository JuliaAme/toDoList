import type { JSX } from 'react'
import React, { useState } from 'react';
import requestAxios, { setAccessToken } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';


type RegistrationProps={
}
const Registration= ({setUser}: RegistrationProps): JSX.Element =>{
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password.trim() === cpassword.trim()) {
                const { data } = await requestAxios.post('/auth/registration', { name, email, password});
                if (data.message === 'success') {
                    setUser(data.user);
                    setAccessToken(data.accessToken);
                    navigate('/');
                }
                return;
        }
            setError('Password not the same');
            return;
        } catch (data) {
            setError(data.response.data.message);
        }
    }
  return (
      <div>
          <h1>Registration</h1>
          <form onSubmit={onHandleSubmit}>
              <label htmlFor='name'>
                <input type='text' placeholder='name' value={name} onChange={(event)=>setName(event.target.value)}/>  
              </label>
              <label htmlFor='email'> 
                 <input type='email' placeholder='email' value={email} onChange={(event)=>setEmail(event.target.value)}/> 
              </label>
              <label htmlFor='password'>
                 <input type='password' placeholder='password' value={password} onChange={(event)=>setPassword(event.target.value)}/> 
              </label>
              <label htmlFor='password'>
                  <input type='password' placeholder='check password' value={cpassword} onChange={(event)=>setCPassword(event.target.value)}/>
        </label>
              <span>{error && <p>{error}</p>}</span>
              <button type='submit'>Register</button>
          </form>
      </div>
  );

}
export default Registration

