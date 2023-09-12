import React from 'react'
import { useLocation } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import AppContext from '../context/Context';
import {Link} from 'react-router-dom'
import snackBar from '../snackBar'
import {faHome,faPen,faCirclePlus,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Footer = (props) => {
  const location = useLocation();
  useEffect(()=>{
    props.setProgress(99)
    setTimeout(() => {
      props.setProgress(100)
    }, 1);
  },[location])

  const context = useContext(AppContext)
  const {make_request,Fetch_user,user} = context;
  if(!JSON.parse(user).name){
    Fetch_user()
    // console.log('navbar')
  }
  const opennav = function(){
    snackBar(`Signed in as ${JSON.parse(user).name}`,3000)
  }


  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#949494] p-2">
      {localStorage.getItem('authtoken')?(
        <>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <Link className="text-xl" to='/'><FontAwesomeIcon icon={faHome}/></Link>
    <span className='text-xs cursor-pointer'>Home</span>
  </div>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <Link className="text-xl" to='/editprofile'><FontAwesomeIcon icon={faPen} /></Link>
    <span className='text-xs cursor-pointer'>Edit Profile</span>
  </div>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
  <img src={`${JSON.parse(user).profile_pic}`} width={40} className=' border-2 border-white rounded-[50%] cursor-pointer' onClick={()=>opennav()} alt='avtar'/>
  </div>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <Link className="text-xl" to='/addpost'><FontAwesomeIcon icon={faCirclePlus} /></Link>
    <span className='text-xs cursor-pointer'>Add Post</span>
  </div>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <div className="text-xl" onClick={()=>{localStorage.clear();window.location.reload()}}><FontAwesomeIcon icon={faRightFromBracket} /></div>
    <span className='text-xs cursor-pointer'>Logout</span>
  </div>
  </>
      ):(
        <>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <Link className="p-2 m-1 text-white bg-red-500 rounded-[10px] hover:bg-red-600 transition-all" to='/login'>
      Login
    </Link>
  </div>
  <div className="nav-items flex items-center flex-shrink-0 text-white mr-6 flex-col cursor-pointer">
    <Link className="p-2 m-1 text-white bg-green-500 rounded-[10px] hover:bg-green-600 transition-all" to='/signup'>
      Create Account
    </Link>
  </div>
  </>
      )}
</nav>
  )
}
