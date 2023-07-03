import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useAuth } from '../../context/auth'
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { toast } from 'react-hot-toast';


const Profile = () => {
  const [credentials,setCredentials] = useState({name:"",email:"", address:"",phone:"",password:""})
  const [auth,setAuth] = useAuth()

 
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  //useeffect
  useEffect(() => {
   const {name,email,address,phone} = auth?.user
   setCredentials({name:name,email:email, address:address,phone:phone,password:password})
  }, [])
  

  const {name,email,address,phone,password}=credentials;

  const handleSubmit =async(e)=>{
e.preventDefault();
try {
  let {data} = await axios.put('http://localhost:8080/api/v1/auth/update-user',
  { name, email,address, phone,password }
)


if(data?.success){
  setAuth({...auth,user:data?.updatedUser})
  //updating the local storage
  let ls =localStorage.getItem('auth')
  ls = JSON.parse(ls)
  ls.user = data.updatedUser
  localStorage.setItem("auth",JSON.stringify(ls))
 toast.success("Profile Updated")
}

} catch (error) {
  console.log(error)
}
  }


  return (
    <>
      <Layout title={"Profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
            <div className="form-container">
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" id="name" placeholder='Username' name="name" value={name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control" id="email" placeholder='Email Address' name="email" value={email} onChange={onChange} disabled />
  </div>
 
  <div className="mb-3">
    <input type="text" className="form-control" id="address" placeholder='Address' name="address" value={address} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="phone" placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="password" placeholder='Password' name='password' value={password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary mb-1">Update Profile</button>
</form>
   </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
