import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import snackBar from '../snackBar'
import { useContext } from 'react';
import AppContext from '../context/Context';
import { PostThumbnail } from './PostThumbnail'

const config = require('../config.json')

export const UserPosts = () => {

  const context = useContext(AppContext)
    const {show_loading,hide_loading} = context;
  const params = useParams()
  const [posts, setPosts] = useState([])
  const [author, setAuthor] = useState({})

  useEffect(()=>{
    show_loading()
    axios({
      method:'GET',
      url: config.host_server+"/general/getuserposts",
      params:{'author_name':params.author_name}
    }).then((res)=>{
      if(!res.data.success){
        snackBar(res.data.error,3000)
      }
      else{
        setPosts(res.data.posts)
        setAuthor(res.data.author)
      }
      hide_loading()
    })
  },[])

  return (
    <React.Fragment>
      <div className="userdata flex p-2 m-2 bg-pink-200 rounded-[10px]">
        <div className="user_profilt_pic">
          <img src={author.profile_pic} width={250} className='rounded-full border-4 border-white' alt="Profile Picture" />
        </div>
        <div className="user_name_data flex items-center justify-start m-5 w-full text-4xl">
          {author.name}
        </div>
      </div>
      {posts.map((post)=>{
        return <PostThumbnail post={post}/>
      })}

    </React.Fragment>
  )
}

//work on this user page get req /general/getuserposts