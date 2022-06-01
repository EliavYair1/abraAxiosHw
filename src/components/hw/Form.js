import React, { useState } from 'react';
import "./Form.css"
import axiosService from '../axiosServices';

/* 
Tasks :

1. Create Register section
   For register show inputs for email/username/password/firstname/lastname. 
   on click return success or error.


2. Login section :
   Allow typing in username and password and login with these credintials.
   Save username to local storage and show "Hello {username} for then given logged in user."


3. Create item section :
    Create an input to provide name for the new item.


4. Support Delete. (https://abra-course-server.herokuapp.com/items/<id>/ with DELETE method)


5. Support rename (https://abra-course-server.herokuapp.com/items/<id>/ with PATCH method and
   { name : <name>}) patch method


6. Logout. should erase local storage.


7. BONUS : learn about AXIOS, try to change fetch to axios.
*/


const RegisterForm = () => {

const SERVER_URL = "https://abra-course-server.herokuapp.com";

const [userName,setUserName] = useState(undefined);
const [firstName, setFirstName] = useState(undefined);
const [lastName, setLastName] = useState(undefined);
const [email, setEmail] = useState(undefined);
const [password,setPassword] = useState(undefined);
const [accessToken, setAccessToken] = useState(localStorage.getItem("Token") || undefined);
const [Login, setLogin] = useState(undefined);
const [pwd, setPwd] = useState(undefined);
const [item, setItem] = useState(undefined);
const [Update, setUpdate] = useState(undefined);


// solution #1:  register new user
const Register = async () => {
  try{
    const res = await axiosService.post(`${SERVER_URL}/register/`, {
    username: userName,
    first_name: firstName,
    last_name: lastName,
    email:email,
    password: password,
    password2: password,
    })
    const data = await res.json()
    console.log(data);
  }catch(e){
    console.log(e);
  }

}


// solution #2:  login the user
const loginUser = async ()=>{
 try{

   const res = await axiosService.post(`${SERVER_URL}/api/token/`,{
     username:Login, password:pwd
    })
    setAccessToken(res.data.access)
      localStorage.setItem("Token",accessToken)
      console.log(accessToken);
  }catch(e){
    console.log(e);
  }}

  
// solution #3:  creating item for each user + adding id
  const createItem = async (name)=>{
    const res = await axiosService.post(`${SERVER_URL}/items/`,
    {name:name},
    { headers: {'Authorization': 'Bearer ' + accessToken}})
    setItem(res.data)
    console.log(res.data);
  }



// solution #4:  deleting the last user
  const deleteFunc = async (id)=>{
    try{
      const res = await axiosService.delete(`${SERVER_URL}/items/${id}/`,
      {headers:{'Authorization': 'Bearer ' + accessToken}},
      ).then(response=>console.log(response))
      console.log(res.message);
      }catch(e){
      console.log(e);
    }

  }
  

  // solution #5:  updating the name of the last user
  const PatchFunc = async (id)=>{
    try{
      const res = await axiosService.patch(`${SERVER_URL}/items/${id}/`, 
       {name:Update},
      {headers:{'Authorization': 'Bearer ' + accessToken}})
     console.log(res.data);
    }catch(e){
      console.log(e);
    }
  }


// solution #6:  logout the profile
  const logout = ()=>{
    localStorage.removeItem("Token");
  }

  return ( <>


  {/* Register form */}
    <section className='registration' >
    <h1>Registration Form</h1>
    <input className='formInput'  type="text"  value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="User Name"/>
    <input className='formInput' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name"/> 
    <input className='formInput'  type="text" value={lastName}   onChange={(e) => setLastName(e.target.value)} placeholder="LastName"/>
    <input className='formInput'  type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
    <input className='formInput'  type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
    <button className='abraBtn' style={{alignSelf:"center"}} type="submit" onClick={()=> Register()}>Register</button>
    </section>

    <hr />

    {/* login section */}
    <h1>Login Form</h1>
    <section className='loginSection'>
      <div className="inps">
    <input className='formInput'   type="text"  onChange={(e) => setLogin(e.target.value)} placeholder="User Name"/>
    <input className='formInput'   type="password"  id="password"  onChange={(e) => setPwd(e.target.value)} placeholder="Password"/>
      </div>

    <div className="logBtns">
      {/* login  btn*/}
    <button className='abraBtn' onClick={loginUser}>Login</button>
    
    {/* logout btn */}
    <button className='abraBtn' onClick={()=> logout()}>Logout</button>
    </div>
    </section>

    <hr />

    <h1>Update and Delete</h1>
    <section className='manipulateSection'>

      {/* create item */}
    <button className='abraBtn' id='itemBtn' onClick={()=>createItem(Login)}>Create Item</button>

    <div className="inputWrapper">
    <input className='formInput' placeholder='Enter the new name...' type="text" name="" onChange={(e)=>{setUpdate(e.target.value)}}  />
    </div>


    <div className='btnWrapper'>
    {/* rename */}
    <button className='abraBtn' onClick={()=>{PatchFunc(item.id)}}>change name</button>
    {/* delete */}
    <button className='abraBtn' onClick={()=>{deleteFunc(item.id)}}>delete User</button>
    </div>

    </section>

    <hr />
    </> 
    );
}
 
export default RegisterForm;