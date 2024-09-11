import React, { useState } from "react";
import {Api} from "../api/api";
import { setLocalStorageItem } from "../helper/helper";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        let payload = {
            username,
            password
        }

        Api.login(payload).then((res)=>{
            console.log(res.data)
            setLocalStorageItem('token',res?.data?.token);
            navigate('/blogs')
        })
    }

    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
            <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-blue-900 text-center hidden md:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                        }}
                    ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className=" flex flex-col items-center">
                        <div className="text-center">
                            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                                Blog App Login
                            </h1>
                            <p className="text-[12px] mt-2 text-gray-500">
                                Create your account
                            </p>
                        </div>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                <input
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    placeholder="Enter your username"
                                />
                                <input
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    onClick={handleLogin}
                                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    {/* <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg> */}
                                    <span className="ml-3">Login</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Don't have an account?
                                    <a href="/signup">
                                        <span className="text-blue-900 font-semibold">Sign up</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
