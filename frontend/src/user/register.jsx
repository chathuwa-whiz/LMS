import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import content from "../content/register";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

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
                        <p>{content.description3}</p>
                    </div>
                </div>
                {/* Image */}
                <div className="hidden lg:block absolute bottom-12 left-8 lg:w-[350px] xl:w-[420px]">
                    <LazyLoad>
                        <img src="images/register_bg.png" alt="Background" />
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
                <form className="flex flex-col w-full max-w-md space-y-6">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                    />
                    <div className="relative w-full">
                        {/* Password Input */}
                        <input
                            type={showPassword ? "text" : "password"}
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
                    <input
                        type="date"
                        placeholder="Birthday"
                        className="border-b-2 border-primary3 bg-transparent w-full py-2 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-primary3 text-primary1 font-semibold py-3 rounded-lg w-full hover:bg-primary2 transition"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-primary4 text-sm mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary4 font-semibold underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
