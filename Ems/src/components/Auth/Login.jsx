import { useState } from "react";

export default function Login({handleLogin}) {
    // two-way binding 
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email , Password) ;
        setEmail("");
        setPassword("");
    }
    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center ">
                
                <div className="border-2 rounded-xl border-emerald-600 p-20">
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }} className="flex flex-col items-center justify-center">


                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                            value={email}
                            className="border-2 border-emerald-600 outline-none py-4 px-5 bg-transparent rounded-full text-xl placeholder:text-gray-400 " type="email" placeholder="Enter your Email" />


                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            value={Password}
                            className="border-2 border-emerald-600 outline-none py-4 px-5 bg-transparent rounded-full text-xl placeholder:text-gray-400 mt-3" type="Password" placeholder="Enter Password " />
                        <button className="border-2 border-none bg-emerald-600 outline-none py-4 px-5  rounded-full text-xl placeholder:text-white mt-5 w-full" type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </>
    )
}