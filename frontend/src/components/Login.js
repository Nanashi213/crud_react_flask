import { useState, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext';

function Login() {
  const { setToken } = useContext(TokenContext);
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })
  
  const navigate = useNavigate();

  function logMeIn(event) {
    axios({
      method: "POST",
      url:"http://localhost:5000/token",
      data:{
        email: loginForm.email,
        password: loginForm.password
       }
    })
    .then((response) => {
      setToken(response.data.access_token);
      navigate('/main'); // Redirige al usuario a la página de perfil
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        alert("datos errados")}
    })

    setloginForm(({
      email: "",
      password: ""}))

    event.preventDefault()
  }
  
  function handleChange(event) { 
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div>
      <h1>Login</h1>
        <form className="login">
          <input onChange={handleChange} 
                type="email"
                text={loginForm.email} 
                name="email" 
                placeholder="Email" 
                value={loginForm.email} />
          <input onChange={handleChange} 
                type="password"
                text={loginForm.password} 
                name="password" 
                placeholder="Password" 
                value={loginForm.password} />
        
        <button onClick={logMeIn}>Submit</button>
      </form> 
    </div>
  );
}

export default Login;
