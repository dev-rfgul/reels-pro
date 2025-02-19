"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(confirmPassword!==password){
            setError("Your password does not match")
        }
        try {
            const res= await fetch('/api/auth/register',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            })
            const data=res.json()
            if(!res.ok){
                setError("registration failed")
            }
            router.push('/login')
        } catch (error) {
            
        }
    }
    return (
        <div>Register</div>
    )
}

export default Register