import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";


export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-100 font-[Poppins]">
            <div className="sm:w-[85%] sm:h-[90%] lg:w-[50%] lg:h-[70%] flex sm:flex-col lg:flex-row">
                <div className="sm:w-[100%] sm:h-[30%] lg:w-[35%] lg:h-[100%] bg-[#6586f1] sm:rounded-none lg:rounded-l-lg">
                </div>
                <div className="sm:w-[100%] sm:h-[70%] lg:w-[65%] lg:h-[100%] bg-white sm:rounded-none lg:rounded-r-lg flex flex-col justify-center gap-7 py-5">
                    <h1 className="sm:text-2xl lg:text-3xl text-center font-semibold">Welcome to Connekt!</h1>
                    <form className="flex flex-col gap-5 px-4 lg:w-[95%]" onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-2 w-[100%] py-3 px-2">
                            <Mail />
                            <input 
                            type="email" 
                            placeholder="Email" 
                            className="outline-none border-b-[0.5px] border-b-gray-400 pb-2 sm:w-[80%] lg:w-[100%]"
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className="flex justify-center gap-2 w-[100%] py-3 px-2">
                            <Lock />
                            <div className="sm:w-[80%] lg:w-[100%] flex flex-col gap-1">
                                <input 
                                type="password" 
                                placeholder="Password"  
                                className="outline-none border-b-[0.5px] border-b-gray-400 pb-2"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                                <a href="" className="text-blue-600">Reset password</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 w-[100%] py-3 px-2">
                            <button className="p-2 bg-[#6586f1] hover:bg-[#87a3ff] transition duration-300 rounded-full sm:w-[80%] lg:w-[90%] text-white cursor-pointer" type="submit">Login</button>
                            <p>Don&apos;t have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}