import { useState } from 'react'
import './App.css'
const API = import.meta.env.VITE_API_KEY;

function App() {
  const [user, setUser] = useState({firstname: '', surname: '', email: ''});
  const [error, setError] = useState(false);

  const handleFirstName = (e) => {
    e.preventDefault();
    setUser({...user, firstname: e.target.value});
}
const handleSurname = (e) => {
    e.preventDefault();
    setUser({...user, surname: e.target.value});
}
const handleEmail = (e) => {
    e.preventDefault();
    setUser({...user, email: e.target.value});
}

const isEmailValid = async (email) => {
  const res = await fetch (`https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=${API}`,
  {method: 'POST',
  body: JSON.stringify(
      {
          "email": `${email}`,
          "level": "Address",
        }
  )
  });
  const data = await res.json();
  return data;
}

const checkEmail = async (e) => {
  e.preventDefault();
  const res = await isEmailValid(user.email);
  if (res.Result === 'Valid'){
      // form submit here
      setError(false);
      console.log("Valid");
  } else {
      console.log("InValid");
      setError(true);
  }
}

  return (
    <div className='app'>
        <h1 className='header'>Data8 Email Signup</h1>
        <form className="email-form" onSubmit={checkEmail}>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-firstname" title="firstname" placeholder="please enter your firstname" onChange={handleFirstName}/>
            <label htmlFor="surname" >Surname</label>
            <input type="text" className="form-surname" title="surname" placeholder="please enter your surname" onChange={handleSurname}/>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-email" title="email" placeholder="please enter your e-mail" onChange={handleEmail}/>
            {error && <p className="email-error-message">Please enter a valid email address</p>}
            <button type="submit" className="form-button">Submit</button>
        </form>
    </div>
  )
}

export default App
