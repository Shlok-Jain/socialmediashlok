import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import AppContext from '../context/Context';
import snackBar from '../snackBar';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const config = require('../config.json')

export const EditProfile = () => {
  const context = useContext(AppContext)
  const {make_request, Fetch_user,user,show_loading,hide_loading} = context;
  const [file, setFile] = useState("")
  const navigate = useNavigate();

  Fetch_user(true)
  useEffect(()=>{
  document.getElementById('edit_username').value = JSON.parse(user).name
  })

  const profile_pic_btn_click = function () {
    document.getElementById('modal_container').style.display = 'flex'
    document.getElementById('profile_pic_editor').style.display = 'flex'
  }
  const profile_pic_btn_cancel = function () {
    document.getElementById('modal_container').style.display = 'none'
    document.getElementById('profile_pic_editor').style.display = 'none'
  }
  const edit_profile_pic = async function () {
    show_loading();
    const formdata = new FormData()
    formdata.append('file', file)
    const res = await axios.post(config.host_server + '/editprofile/profile_pic', formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authtoken': localStorage.getItem('authtoken')
        }
      }).then(async (data) => {
        if (!data.data.success) {
          snackBar(data.data.error, 4000)
        }
        else {
          navigate('/editprofile')
          snackBar('Data updated successfully',3000)
          Fetch_user(true)
        }
        hide_loading();
      })
  }
  const name_edit_click = function(){
    show_loading();
    make_request('/editprofile/name','POST',{ 'Content-Type': 'application/json', 'authtoken': localStorage.getItem('authtoken') },
    JSON.stringify({'name':document.getElementById('edit_username').value}),
    async (response)=>{
      const json = await response.json()
      if(!json.success){
        snackBar(json.error,4000)
      }
      else{
          navigate('/editprofile')
          Fetch_user(true)
          snackBar('Data updated successfully',3000)
          // window.location.reload()
      }
      hide_loading();
    }
    )
  }
  const display_image = function(e){
    var output = document.getElementById('display_img');
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  return (
    <>
      <div id="modal_container">
        <div id="profile_pic_editor" className='m-3 flex flex-col w-2/5'>
          <img id='display_img' width={100} height={100} style={{'margin':'5px','borderRadius':'50%'}} src='/img/upload-img.png'/>
          <label htmlFor="image_input" className='w-[80%] p-2 border-2 border-dashed rounded-[10px] border-black text-center cursor-pointer'>Choose Files</label>
          <input type="file" id='image_input' accept='image/png, image/gif, image/jpeg, image/jpg' onChange={(e) => { setFile(e.target.files[0]);display_image(e); }} />
          <div className="text-xs m-2">Only .png, jpg, jpeg and gif file accepted</div>
          <button onClick={() => edit_profile_pic()} className='m-2 bg-[#00ffaa] rounded-full p-2 w-[100px] transition-all hover:bg-[#02d16a]'>Submit</button>
          <button className="close_profile_pic_editor w-[80px] h-[40px] text-white hover:bg-blue-800 transition-all relative bottom-[-30px] p-2 rounded-[10px] bg-blue-600" onClick={() => profile_pic_btn_cancel()}>Cancel</button>
        </div>
      </div>

      <div className="name_edit text-2xl m-2">
        Edit Your username:
        <input
          id="edit_username"
          type="text"
          className="block border border-grey-light w-[50%] p-3 rounded m-2 text-xl"
          placeholder="Username" />
        <button onClick={() => name_edit_click()} className='text-xl m-1 bg-[#00ffaa] rounded-full p-2 w-[100px] transition-all hover:bg-[#02d16a]'>Submit</button>
      </div>
      <div className="profile_picture_edit m-2 text-2xl">
        Profile Picture: <button className='text-blue-500 m-1' onClick={() => profile_pic_btn_click()}>Change</button>
        <img src={`${JSON.parse(user).profile_pic}`} className='w-[160px]' alt="" />

      </div>
    </>
  )
}
