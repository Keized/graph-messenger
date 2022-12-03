import { useMutation } from "@apollo/client";
import {FormEvent, FormEventHandler, useContext, useState } from "react";
import { AuthContext, AuthContextType, User } from "../contexts/AuthProvider";

export default function Login () {
    const { login, guest } = useContext<AuthContextType | null>(AuthContext) as AuthContextType;
    const [name, setName] = useState('Kevin');

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        login(name);
    }

    return (<div className="flex flex-col items-center justify-center h-screen">
        <div className='w-[200px]'>
                <form className=' flex flex-col p-4 gap-5' onSubmit={onSubmit}>
                    <input  className="p-3 bg-input-bg " onChange={(e) => {setName(e.target.value)}} type="text" placeholder="name" name="name" value={name} />
                    <input type="submit" className="p-3 bg-primary" value="submit"/>
                </form>
        </div>

    </div>)
}
