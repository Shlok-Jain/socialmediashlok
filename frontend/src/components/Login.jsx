import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../context/Context';
import snackBar from '../snackBar'
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    document.title = 'Login'
    const context = useContext(AppContext)
    const {make_request, Fetch_user,show_loading,hide_loading} = context;
    let navigate = useNavigate();

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const send_form = function(){
        show_loading()

        if(window.navigator.onLine){
            make_request('/auth/login',
                'POST',
                {'Content-Type':'application/json'},
                JSON.stringify({name:name,password:password}),
                async(respone)=>{
                        const json = await respone.json()
                        if(!json.success){
                            snackBar(json.error,4000)
                        }
                        else{
                            localStorage.setItem('authtoken',json.authtoken)
                            snackBar('Logged In',3000)
                            navigate('/')
                            Fetch_user()
                        }
                        hide_loading()
                })
        }
        else{
            snackBar('you are offline',5000)
        }
    }

  return (
    <div className="my-5 flex flex-col">
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-[rgb(71, 71, 71);] px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>

            <input 
                onChange={(e)=>{setName(e.target.value)}}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Username" />

            <input 
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" />

            <button
            id='login_button'
                onClick={()=>send_form()}
                className="w-full text-center h-[40px] rounded bg-green-500 text-white hover:bg-green-700 focus:bg-green-700 outline-none transition-all my-1"
            >Login</button>

        </div>

        <div className=" my-6">
            Don't have an account?
            <Link onClick={()=>props.setProgress(100)} className="no-underline border-black text-blue-500 m-2" to="/signup">
                Sign Up
            </Link>.
        </div>
    </div>
</div>
  )
}
