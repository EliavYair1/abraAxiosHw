import React, { useState, useEffect } from 'react';
import RegisterForm from './Registration';

const SERVER_URL = "https://abra-course-server.herokuapp.com";


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


const Items = (props) => {
  const [accessToken, setAccessToken] = useState(undefined);
const [items, setItems] = useState(undefined);

console.log(items);


// auth with the user token
const getItems = async ()=>{
  const res = await fetch(`${SERVER_URL}/items/`,{
    method:"GET",
    headers:{"Content-Type":"application/json",
    'Authorization': 'Bearer ' + accessToken},
 
  })
  // if success return the data
  if (res.status === 200) {
    const data = await res.json()
    setItems(data);
  }
   }


// fetching the token from local storage
   useEffect( () => {
    const token = localStorage.getItem("Token");
    setAccessToken(token);

}, []);


//  if token exists get the items
useEffect( () => {

    if (accessToken) {
        getItems();
    }

}, [accessToken]);



// deleting user by id
// const deleteUser = async (id)=>{
//   const res = await fetch(`${SERVER_URL}/${id}`,{
//     method:"DELETE",
//   })
//   const data = res.json()
//   console.log(data);
// }



  // registering a new user


  
  
  // // getting the token
  // const getToken = async (username,password)=>{
    //   const payload = {
      //     username : username,
      //     password:password
      //   }
      
      //     const res = await fetch(`${SERVER_URL}/api/token/`,{
        //       method:"POST",
        //       headers:{"Content-Type":"application/json"},
  //       body:JSON.stringify(payload)
  //     }) 
  //     const data = await res.json()
  //     console.log(data);
  
  //   return data.access;
  // }
  
  // // login user
  // const loginUser = async ()=>{
  //   const accessToken  = await getToken("Test","Ey355312")
  //   setAccessToken(accessToken)
  //   localStorage.setItem("Token",accessToken)
  //   console.log(accessToken);
  // }

// posting a new item
const createItem = async (name)=>{
  const payload = {
    name
  }
  const res = await fetch(`${SERVER_URL}/items/`,{
    method:"POST",
    headers:{"Content-Type":"application/json",
    'Authorization': 'Bearer ' + accessToken},
    body:JSON.stringify(payload)
 
  })
 const data = await res.json()
  console.log(data);
}


  return (  <>
  <div className='form' style={{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
<RegisterForm/>
  <br/>

  <button onClick={getItems}>get items</button>
  <button onClick={()=> createItem("eliav")}>Create Item</button>
{/* <button onClick={deleteUser()}>delete user</button> */}
  {accessToken && <p>Your access token : {accessToken} </p>}

  </div>
  </>);
}
 
export default Items;