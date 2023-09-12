import { useState } from 'react'
import AppContext from './Context'
import snackBar from '../snackBar'
import {useNavigate} from 'react-router-dom'
const config = require('../config.json')

const AppState = (props) => {

    const [user, setUser] = useState("{}")

    const make_request = async function (url, method, headers, body, then) {
        await fetch(`${config.host_server + url}`, {
            method: method,
            headers: headers,
            body: body
        }).then(then)
    }

    const Fetch_user = async function (strict) {
        const authtoken = localStorage.getItem('authtoken')
        if (authtoken) {
            make_request('/auth/fetchuser', 'POST',
                { 'Content-Type': 'application/json', 'authtoken': authtoken },
                "",
                async (response) => {
                    const json = await response.json()
                    // console.log(json)
                    if (!json.success) {
                        snackBar(json.error, 4000)
                    }
                    else {
                        setUser(JSON.stringify(json.user))
                    }
                }
            )
        }
        else{
            if(strict){window.location.href = '/login'}
          }
    }

    const show_loading = function(){
        document.getElementById('loading-screen').style.display = 'flex'
    }
    const hide_loading = function(){
        document.getElementById('loading-screen').style.display = 'none'
    }
    

    return (
        <AppContext.Provider value={{ make_request, Fetch_user , user,show_loading,hide_loading}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState