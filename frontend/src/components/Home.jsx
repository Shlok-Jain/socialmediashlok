import React, { useEffect } from 'react'
import AppContext from '../context/Context';
import { useContext,useState } from 'react';
import { ShowPosts } from './ShowPosts';


export const Home = () => {

  const [count, setCount] = useState(5)
  const [posts, setPosts] = useState([])
  const context = useContext(AppContext)
  const {make_request,Fetch_user,user,show_loading,hide_loading} = context;


    
  return (
    <React.Fragment>
      
      <ShowPosts/>
      
    </React.Fragment>
  )
}
