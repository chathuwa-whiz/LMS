import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import content from "../content/login";
import { useLoginMutation } from "../redux/services/userSlice";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [ login ] = useLoginMutation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = {
                email,
                password,
            };

            const result = await login(credentials).unwrap();
            console.log('Login result: ',result);
            toast.success('Login successful!');
            localStorage.setItem('token', result.token);
            navigate('/');
        } catch (error) {
            console.log('Error in login: ',error);
            toast.error(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col lg:flex-row relative lg:bg-primary3 bg-primary1 min-h-screen overflow-hidden">
            {/* Mobile Logo Area */}
            <div className="lg:hidden bg-primary3 w-full p-4 rounded-b-[40px] flex justify-center">
                <LazyLoad>
                    <img src="/icons/logo.png" width={80} alt="Logo" />
                </LazyLoad>
            </div>

            {/* Left Area */}
            <div className="hidden lg:block lg:w-1/3 xl:w-1/4 md:p-8 p-5">
                {/* Logo */}
                <div>
                    <LazyLoad>
                        <img src="/icons/logo.png" width={100} alt="Logo" />
                    </LazyLoad>
                    <div className="text-primary1 flex flex-col gap-2 text-sm md:text-lg mt-8">
                        <p>{content.description1}</p>
                        <p>{content.description2}</p>
                    </div>
                </div>
                {/* Image */}
                <div className="hidden lg:block absolute bottom-12 left-8 lg:w-[350px] xl:w-[420px]">
                    <LazyLoad>
                        <img src="images/login_bg.png" alt="Background" />
                    </LazyLoad>
                </div>
            </div>

            {/* Right Area */}
            <div className="bg-primary1 lg:w-2/3 xl:w-3/4 w-full flex flex-col items-center justify-center lg:rounded-l-[60px] px-8 md:px-20 py-10">
                {/* Title */}
                <div className="text-primary4 font-bold text-2xl md:text-4xl mb-8">
                    <h1>{content.title}</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md space-y-12">
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                    />
                    <div className="relative w-full">
                        {/* Password Input */}
                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                        />
                        {/* Toggle Button */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-0 top-2 text-primary3"
                        >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary3 text-primary1 font-semibold py-3 rounded-lg w-full hover:bg-primary2 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-primary4 text-sm mt-6">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary4 font-semibold underline">
                        Create Account
                    </a>
                </p>
            </div>
        </div>
    );
}
