import {useState} from 'react';
import "./Register.css";
import {z} from "zod";

let userschema = z.string().min(6,"username must need min of 6 characters").max(16,"max limit 16 characters")
let passwordschema = z.string().min(8,"password must need min of 8 characters").max(16,"max limit 16 characters")
let emailschema = z.email().min(3,"min 3 characters")
let roleschema = z.string().min(1,"role must need min of 1 characters")

//helper function to validate the form data
let validate = (schema,value)  =>{
    if(!value)return ""
    let result = schema.safeParse(value) // safeParse returns an object with success and error properties
    if(result.success){
        return ""
    }
    return result.error.issues[0].message
}

const Register = (e) => {
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [role,setrole] = useState('')

    let handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch("https://fsd2-workshop.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username,email: email,password: password,role: role}),
        });
        let resp = await res.json();
        let token = resp.token
        localStorage.setItem("token", token);
        alert(resp.message);
        setusername("");
        setemail("");
        setpassword("");
        setrole("");
    }
    return (
        <>
        
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
            />
            <p>{validate(userschema, username)}</p>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />
            <p>{validate(passwordschema, password)}</p>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
            />
            <p>{validate(emailschema, email)}</p>

            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setrole(e.target.value)}

            />
            <p>{validate(roleschema, role)}</p>
            <button type="submit">Register</button>
        </form>
        </>
    )
}

export default Register;
