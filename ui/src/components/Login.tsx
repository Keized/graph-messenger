import { useMutation } from "@apollo/client";
import {FormEvent, FormEventHandler, useContext, useState } from "react";
import { AuthContext, AuthContextType, User } from "../contexts/AuthProvider";

export default function Login () {
    const { login, user } = useContext<AuthContextType | null>(AuthContext) as AuthContextType;
    const [email, setEmail] = useState('user1@email.com');
    const [password, setPassword] = useState('user1')

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        login(email, password);
    }

    return (<div className="flex flex-col items-center justify-center h-screen">
        <div className='w-[200px]'>
                <form className=' flex flex-col p-4 gap-5' onSubmit={onSubmit}>
                    <input className="p-3" type="text" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="p-3" type="text" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" className="p-3 bg-primary" value="submit"/>
                </form>
        </div>

    </div>)
}
