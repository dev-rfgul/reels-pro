"use client"

import { Link } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'



const Header = () => {
    const { data: session } = useSession();
    const handleSignout = async () => {
        await signOut();
    }
    return (
        <div>
            <button onClick={handleSignout}>Sign Out</button>
            {
                session ? (
                    <div>Welcome</div>
                ) : (
                    <>
                        <Link href='/login'>Login</Link>
                        <Link href='/register'>Register</Link>
                    </>
                )
            }
        </div>
    )
}

export default Header