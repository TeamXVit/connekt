import { Lock, Mail } from 'lucide-react';


export default function Authentication() {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-100 font-[Open_Sans]">
            <div className="sm:w-[100%] sm:h-[100%] lg:w-[50%] lg:h-[70%] flex sm:flex-col lg:flex-row">
                <div className="sm:w-[100%] sm:h-[30%] lg:w-[35%] lg:h-[100%] bg-slate-300 sm:rounded-none lg:rounded-l-lg">

                </div>
                <div className="sm:w-[100%] sm:h-[70%] lg:w-[65%] lg:h-[100%] bg-white sm:rounded-none lg:rounded-r-lg flex flex-col gap-7 py-5">
                    <div className="flex flex-col gap-3 px-4 lg:w-[95%]">
                        <h1 className="text-2xl font-semibold">Welcome to Connekt!</h1>
                        <p className="text-lg">Welcome back! Login to proceed</p>
                    </div>
                    <div className="flex flex-col gap-5 px-4 lg:w-[95%]">
                        <div className="flex gap-2 w-[100%] py-3 px-2">
                            <Mail />
                            <input type="text" placeholder="Email" className="placeholder:text-black outline-none border-b-[0.5px] border-b-gray-400 pb-2 sm:w-[80%] lg:w-[100%]"/>
                        </div>
                        <div className="flex gap-2 w-[100%] py-3 px-2">
                            <Lock />
                            <div className="sm:w-[80%] lg:w-[100%] flex flex-col">
                                <input type="text" placeholder="Password" className="placeholder:text-black outline-none border-b-[0.5px] border-b-gray-400 pb-2"/>
                                <a href="" className="text-blue-600">Reset password</a>
                            </div>
                        </div>
                        <button className="p-2 bg-[#6586f1] rounded-full w-32 mx-auto text-white cursor-pointer" type="submit">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}