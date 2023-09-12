import axios from 'axios'
import React,{useEffect, useState} from 'react'
import snackBar from '../snackBar'
import { useContext } from 'react';
import AppContext from '../context/Context';

const config = require('../config.json')

export const LikeButton = (props) => {

  const [liked, setLiked] = useState(false)

  const context = useContext(AppContext)
    const {make_request, Fetch_user,show_loading,hide_loading,user} = context;
    useEffect(()=>{

      if(user.includes(props.post._id)){
        setLiked(true)
      }
    },[])

    const [like_count, setLike_count] = useState(props.post.likes)
    const send_req = function(){
        axios({
            method:'POST',
            url:config.host_server+'/general/like',
            headers:{'authtoken':localStorage.getItem('authtoken')},
            data:{
                id:props.post._id
            }
        }).then((res)=>{
          if(!res.data.success){
            snackBar('something went wrong')
          }
          else{
            setLike_count(res.data.like_count)
            Fetch_user()
          }
        })
    }
    const share = function(){
        if (navigator.share) {
            navigator.share({
              title: props.post.title,
              url: config.host_client+`/post/${props.post._id}`
            })
            .catch(console.error);
          } else {
            navigator.clipboard.writeText(config.host_server+`/post/${props.post._id}`)
            snackBar('Link copied',3000)
          }
    }


  return (
      <React.Fragment>
<hr />
    <button className='w-[30px] h-[30px] my-1 mx-2' onClick={()=>{if(localStorage.getItem('authtoken')){let newstate = !liked ; setLiked(newstate);}else{snackBar('Login to continue',3000)}}}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" onClick={()=>{send_req()}} hidden={liked} focusable="false" style={{'width':'100%',"height":"100%"}}><g className="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" className="style-scope yt-icon"></path></g></svg>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" onClick={()=>{send_req()}} hidden={!liked} focusable="false" className="style-scope yt-icon" style={{'width':'100%',"height":"100%"}}><g className="style-scope yt-icon"><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z" className="style-scope yt-icon"></path></g></svg>
        {like_count}
    </button>
    <button className='w-[30px] h-[30px] my-1 mx-2' onClick={()=>share()}>
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{'width':'100%',"height":"100%"}}><g mirror-in-rtl="" className="style-scope yt-icon"><path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z" className="style-scope yt-icon"></path></g></svg>
    Share
    </button>
      </React.Fragment>
  )
}
