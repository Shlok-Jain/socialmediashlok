import React,{useState} from 'react'
import { useContext } from 'react';
import AppContext from '../context/Context';
import { Link } from 'react-router-dom';
import snackBar from '../snackBar'
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
    document.title = "Sign Up"
    const context = useContext(AppContext)
    const {make_request,Fetch_user,show_loading,hide_loading} = context;
    let navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const send_form = function(){
        show_loading();
        if(window.navigator.onLine){
        make_request('/auth/signup',
            'POST',
            {'Content-Type':'application/json'},
            JSON.stringify({name:name,email:email,phone:phone,password:password}),
            async(respone)=>{
                const json = await respone.json()
                if(!json.success){
                    snackBar(json.error,4000)
                }
                else{
                    localStorage.setItem('authtoken',json.authtoken)
                    snackBar('Account Created',3000)
                    navigate('/')
                    Fetch_user()
                }
                hide_loading();
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
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        placeholder="Username" />

                    <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        onChange={(e)=>{setPhone(e.target.value)}}
                        type="number"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="phone"
                        placeholder="Phone Number" />
                    <input 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Set a Password" />

                    <button
                        id='signup_button'
                        onClick={()=>{send_form();console.log('onclick')}}
                        className="w-full text-center h-[40px] rounded bg-green-500 text-white hover:bg-green-700 focus:bg-green-700 outline-none transition-all my-1"
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline text-blue-500 border-b border-grey-dark text-grey-dark m-2" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline text-blue-500 border-b border-grey-dark text-grey-dark m-2" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className=" my-6">
                    Already have an account? 
                    <Link onClick={()=>props.setProgress(100)} className="no-underline border-black text-blue-500 m-2" to="/login">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
  )
}
