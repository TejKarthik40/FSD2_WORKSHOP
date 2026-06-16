
import { useState } from "react";
import {z} from "zod";

let userschema = z.string().min(6,"username must need min of 6 characters").max(16,"max limit 16 characters")
let passwordschema = z.string().min(8,"password must need min of 8 characters").max(16,"max limit 16 characters")

let validate = (schema,value)  =>{
    if(!value)return ""
    let result = schema.safeParse(value) // safeParse returns an object with success and error properties
    if(result.success){
        return ""
    }
    return result.error.issues[0].message
}

function Login(){
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')

    let sendDetails = async (e) => {
        console.log("entered into fetch")
        e.preventDefault();
        let jwttoken = localStorage.getItem("token")
        let res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization :`Bearer ${jwttoken}`
            },
            body: JSON.stringify({ username, password })
        });
        let data = await res.json();
        alert(data.msg);
    }

    return (
        <>
        <section style={{textAlign: "center"}}>
            <h1 class = "text-3xl font-bold underline">Login</h1>
            <br/>
            <form onSubmit={sendDetails}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
                <br/>
                <p>{validate(userschema, username)}</p>
                <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <br/>
                <p>{validate(passwordschema, password)}</p>
                <br />
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Login</button>    
            </form>
        </section>
        </>
    )
}
export default Login