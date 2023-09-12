import React, { useEffect, useState } from 'react'
import snackBar from '../snackBar'
import axios from 'axios'
import { LikeButton } from './LikeButton'
import { Link } from 'react-router-dom'
const config = require('../config.json')

export const PostThumbnail = (props) => {

    const img_arr = props.post.photos
    const [index, setIndex] = useState(0)
    const [src, setSrc] = useState(img_arr[0])
    const [desc, setDesc] = useState(props.post.description.substring(0,250))
    // const [author, setAuthor] = useState({})
    useEffect(() => { setSrc(img_arr[index]) }, [index])


useEffect(()=>{
(function (window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    /**
     * Fires swiped event if swipe detected on touchend
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
        var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);    // default 500ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
        var changedTouches = e.changedTouches || e.touches || [];

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (yDiff > 0) {
                eventType = 'swiped-up';
            }
            else {
                eventType = 'swiped-down';
            }
        }

        if (eventType !== '') {

            var eventData = {
                dir: eventType.replace(/swiped-/, ''),
                touchType: (changedTouches[0] || {}).touchType || 'direct',
                xStart: parseInt(xDown, 10),
                xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                yStart: parseInt(yDown, 10),
                yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
            };

            // fire `swiped` event event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

            // fire `swiped-dir` event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    /**
     * Records current location on touchstart event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    /**
     * Records location diff in px on touchmove event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for attributeName
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

}(window, document));

document.getElementById(`carousel-${props.post._id}`).addEventListener('swiped-left',e=>{
    document.getElementById(`next-${props.post._id}`).click()
    console.log('left')
})
document.getElementById(`carousel-${props.post._id}`).addEventListener('swiped-right',e=>{
    document.getElementById(`previous-${props.post._id}`).click()
})

})

const readmore = function(){
    setDesc(props.post.description)
    document.getElementById(`readmore-${props.post._id}`).style.display = 'none'
}

//test swipe functionality on mobile


    return (
        <div className='postthumbnail my-5 p-2 bg-[rgba(255,255,255,0.5)] rounded-[10px]' >

            <Link to={`/user/${props.post.author.name}`} className="author flex">
                <div className="author-pic m-1">
                    <img src={props.post.author.profile_pic} width={35} className='rounded-full border-2 border-black' />
                </div>
                <div className="author-name m-1 h-[35px] flex items-center justify-center">
                    {props.post.author.name}
                </div>
            </Link>

            <div className="post-title m-1 text-3xl">{props.post.title}</div>

            <div className="image-carousel select-none" hidden={img_arr.length === 0} >
                <div className="image-container flex items-center justify-center h-[320px] bg-[#abcbff] rounded-[10px]" id={`carousel-${props.post._id}`}>
                    {props.post.photos.map((img, i) => {
                        return (<img src={img} hidden={!(index === i)} style={{ 'maxHeight': '320px' }} />)
                    })}


                </div>
                <div className="controls flex p-2" style={{ 'position': 'relative', 'top': '-177px' }}>
                    <button className="btn-previous w-fit cursor-pointer" onClick={() => { setIndex((prevstate) => prevstate - 1) }} hidden={src === img_arr[0]} disabled={src === img_arr[0]} id={`previous-${props.post._id}`}>
                        <img src="/img/previous.png" width={50} />
                    </button>
                    <button className="btn-next w-fit cursor-pointer" onClick={() => { setIndex((prevstate) => prevstate + 1) }} hidden={src === img_arr[img_arr.length - 1]} disabled={src === img_arr[img_arr.length - 1]} id={`next-${props.post._id}`} style={{ 'marginLeft': 'auto' }}>
                        <img src="/img/next.png" width={50} />
                    </button>
                </div>

            </div>

            <div className="description">
                {desc} <div onClick={()=>readmore()} id={`readmore-${props.post._id}`} className='text-blue-400 cursor-pointer'>...Read More</div>
            </div>
            <LikeButton post={props.post} />

        </div>
    )
}
