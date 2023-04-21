import { useState } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
    return <form className="flex flex-col items-center justify-center w-screen gap-5" onSubmit={(e) => {
        e.preventDefault();
        console.log("this,", e.target.name.value)
        axios.post('/api/users', { name: e.target.name.value }).then(res => {
            setUser(res.data);
        })
    }}>
        <input placeholder="What's your name?" name="name" className="p-2 border-2"></input>
        <button type="submit">Start</button>
    </form>
}