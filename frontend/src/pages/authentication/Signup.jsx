import { Lock, Mail, FileDigit, User, VenusAndMars, Phone, Calendar, ArrowLeftFromLine  } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        regNo: "",
        email: "",
        password: "",
        dob: new Date(),
        gender: "",
        phoneNo: 9999999999,
        instagram: ""
    });
    const [page, setPage] = useState(1);
    
    const inputFields = {
        field1: [
            { question: "Name", type: "text", name: "name", required: true, icon: <User />,  },
            { question: "Registration number", type: "text", name: "regNo", required: true, icon: <FileDigit /> },
            { question: "Email", type: "email", name: "email", required: true, icon: <Mail /> },
            { question: "Password", type: "password", name: "password", required: true, icon: <Lock /> }
        ],
        field2: [
            { question: "DOB", type: "date", name: "dob", required: true, icon: <Calendar /> },
            { question: "Gender", type: "text", name: "gender", required: true, icon: <VenusAndMars /> },
            { question: "Phone number", type: "number", name: "phoneNo", required: true, icon: <Phone /> },
            { question: "Instagram handle", type: "string", name: "instagram", required: false, icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg> },
        ]
    };
    
    const handlePage = () => setPage(page + 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        page > 3 ? setPage(1) : null
        console.log(page);
        console.log(formData)
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-100 font-[Poppins]">
            <div className="sm:w-[85%] sm:h-[90%] lg:w-[50%] lg:h-[70%] flex sm:flex-col lg:flex-row">
                <div className="sm:w-[100%] sm:h-[30%] lg:w-[35%] lg:h-[100%] bg-[#6586f1] sm:rounded-none lg:rounded-l-lg">
                    <p className="py-3 text-white flex justify-center gap-2">
                        <Link to="/"><ArrowLeftFromLine /></Link>
                        Back To Login
                    </p>
                </div>
                <div className="sm:w-[100%] sm:h-[70%] lg:w-[65%] lg:h-[100%] bg-white sm:rounded-none lg:rounded-r-lg flex flex-col justify-center gap-7 py-5">
                    <div className="w-[100%] h-[20%] flex justify-center items-center">
                        <p className="py-1 text-center rounded-lg border-[1px] border-[#6586f1] bg-[#6586f1] h-fit w-7 text-white">1</p>
                        <span className={`border-y-[1px] border-[#6586f1] w-24 h-1 ${page >= 2 ? 'bg-[#6586f1]' : null}`}></span>
                        <p className={`py-1 text-center rounded-lg border-[1px] border-[#6586f1] w-7 h-fit text-[#6586f1] ${page >= 2 && 'bg-[#6586f1] text-white'}`}>2</p>
                        <span className={`border-y-[1px] border-[#6586f1] w-24 h-1 ${page >= 3 ? 'bg-[#6586f1]' : null}`}></span>
                        <p className={`py-1 text-center rounded-lg border-[1px] border-[#6586f1] w-7 h-fit text-[#6586f1] ${page >= 3 && 'bg-[#6586f1] text-white'}`}>3</p>
                    </div>
                    <form className="flex flex-col px-4 w-[95%] h-[80%]" onSubmit={handleSubmit}>
                        {page === 1 && inputFields.field1.map((field, index) => 
                            <div key={index} className="flex justify-center gap-2 w-[100%] py-3 px-2">
                                {field.icon}
                                <input type={field.type} placeholder={field.question} className="outline-none border-b-[0.5px] border-b-gray-400 pb-1 sm:w-[80%] lg:w-[100%]" name={field.name} onChange={handleChange} required={field.required}/>
                            </div>
                        )}
                        {page === 2 && inputFields.field2.map((field, index) => 
                            <div key={index} className="flex justify-center gap-2 w-[100%] py-3 px-2">
                                {field.icon}
                                {field.name !== "gender" ? <input type={field.type} placeholder={field.question} className="outline-none border-b-[0.5px] border-b-gray-400 pb-1 sm:w-[80%] lg:w-[100%]" name={field.name} onChange={handleChange} required={field.required}/> :
                                <select name={field.name} required={field.required} className="outline-none border-b-[0.5px] border-b-gray-400 pb-1 sm:w-[80%] lg:w-[100%]" onChange={handleChange}>
                                    <option>{field.question}</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>}   
                            </div>
                        )}
                        {page === 3 && 
                        <>
                            <div className="flex flex-col gap-2 w-[100%] py-3 px-2">
                                <label htmlFor="profile-pic" className="mb-2 inline-block">Profile picture {'(Optional)'}</label>
                                <input className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:cursor-pointer file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-[#87a3ff] focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-bg-[#6586f1] dark:text-neutral-200 dark:file:bg-[#6586f1] dark:file:text-neutral-100 dark:focus:border-primary cursor-pointer" type="file" id="profile-pic" accept="image/png, image/jpg"/>
                            </div>
                            <div className="flex gap-2 w-[100%] py-3 px-2">
                                <input type="checkbox" name="" required/>
                                <p className="">I accept the <button className="text-blue-500 cursor-pointer">terms and conditions</button></p>
                            </div>
                        </>
                        }
                        <div className="flex justify-between gap-3 w-[100%] py-3 px-2">
                            {page !== 1 ? <button className="p-2 bg-[#6586f1] rounded-full w-28 text-white enabled:cursor-pointer enabled:hover:bg-[#87a3ff] transition duration-300" onClick={() => setPage(page - 1)}>Back</button> : null}
                            <button className="p-2 bg-[#6586f1] rounded-full w-28 text-white enabled:cursor-pointer enabled:hover:bg-[#87a3ff] transition duration-300 ml-auto" onClick={handlePage} type={page === 4 ? "submit" : "button"}>{page !== 3 ? "Next": "Sign Up"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}