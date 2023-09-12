import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PostThumbnail } from './PostThumbnail'

const config = require('../config.json')

export const ShowPosts = () => {
    window.onload = function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(true)
    const [loading, setLoading] = useState(false)

    const getPosts = function () {
        axios({
            'method': 'GET',
            'url': config.host_server + '/general/getposts',
            'params': { count: page },
        }).then((res) => {
            var updated_posts = [...posts,res.data.posts[0]]
            // setPosts(res.data.posts)
            setPosts(updated_posts)
            // console.log(posts)
            setMax(res.data.maxlength)
            setPage(page + 1)
            setLoading(false)
        })


    }

    function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

    const loadmore = function () {
        if (!loading) {
            if(page<=max){
                getPosts()
                setLoading(true)
            }
            
        }
    }
    // getPosts() for first time

    useEffect(()=>{
        getPosts() // Anything in here is fired on component mount.

        return ()=>{
            window.onscroll = null // Anything in here is fired on component unmount.
        }
    },[])
    
    window.onscroll = function () {
        if(isScrolledIntoView(document.getElementById('infinitescrollelem'))){
            if (!loading) {
            document.getElementById('loadmore-button').click()
        }
        }
        
    }

    return (
        <React.Fragment>
            <div id="posts-container" className=' flex flex-col items-center justfy-center'>
                {posts.map((post) => {
                    return <PostThumbnail post={post} key={post._id} />
                })}

                <img src="/img/loader.gif" width={50} alt="" hidden={!loading}/>
                <button className='bg-green-500 m-2 p-2 text-xl' hidden={page>= max} id='loadmore-button' onClick={() => loadmore()}>Load More</button>
            </div>
            <div id='infinitescrollelem' className="infinitescrollelem my-3 w-full bg-red-500 h-[1px]"></div>
        </React.Fragment>
    )
}
