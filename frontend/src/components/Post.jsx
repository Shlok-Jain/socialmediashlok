import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import snackBar from '../snackBar'
import { PostThumbnail } from './PostThumbnail'
import { useContext } from 'react';
import AppContext from '../context/Context';

const config = require('../config.json')

export const Post = () => {
    const context = useContext(AppContext)
    const {show_loading,hide_loading} = context;
    const params = useParams()
    const [post, setPost] = useState([])

    useEffect(()=>{
        show_loading()
        axios({
            method:'GET',
            url:config.host_server+'/general/getpostbyid',
            params:{id:params.id}
        }).then((res)=>{
            if(!res.data.success){
                snackBar(res.data.error,4000)
            }
            else{
                setPost(res.data.post)
                console.log(res.data.post)
            }
            hide_loading()
        })
    },[])
  return (
      <React.Fragment>
          {post.map((post)=>{
              return <PostThumbnail post={post}/>
          })}
          
      </React.Fragment>
  )
}
