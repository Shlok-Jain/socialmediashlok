import React from 'react'
import AppContext from '../context/Context';
import { useContext,useState } from 'react';
import {useNavigate} from 'react-router-dom'
import snackBar from '../snackBar';
import axios from 'axios';
const config = require('../config.json')

export const AddPost = () => {

    const context = useContext(AppContext)
    const {make_request,Fetch_user,user,show_loading,hide_loading} = context;
    const navigate = useNavigate()

        Fetch_user(true)

    const [file, setFile] = useState([])

    const upload_img_modal_show = function(){
        document.getElementById('modal_container').style.display = 'flex'
        document.getElementById('add_post_uploadimg').style.display = 'block'
    }
    const upload_img_modal_hide = function(){
        document.getElementById('modal_container').style.display = 'none'
        document.getElementById('add_post_uploadimg').style.display = 'none'
    }
    function handleFiles(e) {
        const fileList = document.getElementById("uploaded_image_shower");
        if (e.target.files.length >5) {
            snackBar('max 5 images allowed',3000)
        }
        else if(e.target.files.length == 0){
            snackBar('no images selected',3000)
        }
        else {
          fileList.innerHTML = "";
          const list = document.createElement("ul");
          list.classList.add('flex')
          list.classList.add('flex-col')
          list.classList.add('items-center')
          list.classList.add('justify-center')
          fileList.appendChild(list);
          for (let i = 0; i < e.target.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = URL.createObjectURL(e.target.files[i]);
            img.width = 260;
            img.classList.add('mt-[20px]')
            img.onload = function() {
              URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
          }
        }
    }
    
    const send_form = async function(){
        show_loading()
        const formdata = new FormData()
        for(let i=0;i<=Object.keys(user).length;i++){
            formdata.append(`file${i}`,file[i])
        }
        formdata.append('title',document.getElementById('add-post-title').value)
        formdata.append('desc',document.getElementById('add-post-desc').value)
        formdata.append('tags',document.getElementById('add-post-tags').value)
        await axios.post(config.host_server + '/general/addpost', formdata,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
              'authtoken': localStorage.getItem('authtoken')
            }
        }
        ).then((data)=>{
            if(!data.data.success){
                snackBar(data.data.error,4000)
            }
            else{
                snackBar('Post added',3000)
            }
            hide_loading()
            navigate('/')
        })
    }


  return (
    <React.Fragment>
        <div id="modal_container">
            <div id="add_post_uploadimg" className='mt-[100px] bg-white w-[90%] rounded-[10px] m-2 p-2 flex flex-col items-center justify-center'>
                <div id="uploaded_image_shower" className='m-2 max-h-[300px] overflow-auto'>
                    Uploaded images will show up here
                </div>
                <input type="file" id='image_input' multiple accept='image/png, image/gif, image/jpeg, image/jpg' onChange={(e) => { setFile(e.target.files);handleFiles(e); }} />
                <label htmlFor="image_input" className='w-full m-2 p-2 border-2 hover:bg-green-500 transition all rounded-[10px] border-black text-center cursor-pointer'>Upload images</label>
                <button className="close_profile_pic_editor w-[80px] h-[40px] text-white hover:bg-blue-800 transition-all p-2 rounded-[10px] bg-blue-600" onClick={() => upload_img_modal_hide()}>Ok</button>
            </div>
        </div>
        <div className="add_post_container flex flex-col items-start justify-center border-black border-[1px] rounded-[20px] p-5 m-3">
        <span className='text-3xl text-center w-full m-5'>Add a new post</span>
            <input type="text" id='add-post-title' placeholder='Enter Title' className='m-2 p-2 w-full bg-transparent text-2xl rounded-[10px] focus:border-[#6bdcff] outline-none border-[#576dff] transition-all border-2'/>
            <span className='w-full m-2 p-2 border-2 border-dashed rounded-[10px] border-black text-center cursor-pointer' onClick={()=>upload_img_modal_show()}>Upload images</span>
            <textarea placeholder='Enter Description' id='add-post-desc' className='m-2 p-2 w-full bg-transparent text-2xl rounded-[10px] focus:border-[#6bdcff] outline-none border-[#576dff] transition-all border-2' rows={5}/>
            <input type="text" placeholder='Enter Tags' id='add-post-tags' className='m-2 p-2 w-full bg-transparent text-2xl rounded-[10px] focus:border-[#6bdcff] outline-none border-[#576dff] transition-all border-2'/>
            <span className="text-sm mx-2">seperate two tags by commas</span>
            <button className="w-[80px] h-[40px] text-white hover:bg-blue-800 transition-all m-2 p-2 rounded-[10px] bg-blue-600" onClick={()=>send_form()}>Post</button>
        </div>
    </React.Fragment>
  )
}
