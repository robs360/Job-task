'use server'
import { TUser } from "@/types/types"

export const RegisterUser = async (user: TUser) => {
    try {
        console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/user/register`)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/user/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        const ressult = await res.json()
        return ressult
    }
    catch (err) {
        console.log(err)
    }
}
export const loginUser = async (userData: { email: string, password: string }) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        const ressult = await res.json()
        return ressult
    }
    catch (err) {
        console.log(err)
    }
}