'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import logo from '../../assets/google-docs.png'
import google from '../../assets/google.png'
import { signIn } from "next-auth/react"
const LoginForm = () => {
    const { register, handleSubmit } = useForm()
    const router=useRouter()
    const onSubmit = async (data: any) => {
        console.log(data);
        // const res = await signIn("credentials", {
        //     email: data.email,
        //     password: data.password,
        //     redirect: false,
        // });
        // if (res?.ok && res.url) {
        //     window.location.href = res.url;
        //     router.push('/')
        //     toast.success("Login successfully done")
        // } else {

        //     console.error("Login failed", res?.error);
        // }
    }
    return (
        <div>
            <div className="bg-white mt-16 p-8 rounded-2xl shadow-2xl w-[360px] md:w-[475px] lg:w-[420px] mx-auto space-y-6">
                <div className="flex items-center ">
                    <Image src={logo} width={56} height={56} alt="logo" className=""></Image>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                        <p className="text-sm text-gray-500">
                            Welcome back! Please enter your credentials.
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col space-y-2">
                    <label>Email</label>
                    <input type="email" {...register("email")} name="email" className="h-[44px] border border-gray-400 rounded-md px-3 text-base" />
                    <label>Password</label>
                    <input type="password" {...register("password")} name="password" className="h-[44px] border border-gray-400 rounded-md px-3 text-base" />

                    <Button className="bg-blue-500 text-[17px] hover:bg-blue-600 font-semibold w-full mt-2 h-[44px]">Login</Button>
                </form>
                <div className="space-y-3">

                    <button onClick={() => { signIn('google', { callbackUrl: 'http://localhost:3000/' }) }}

                        className="flex items-center justify-center w-full h-[45px] border border-gray-400 rounded-md space-x-3 hover:bg-gray-50 transition"
                    >
                        <Image src={google} height={24} width={24} alt="Google" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                    </button>
                </div>

                {/* Link to Register */}
                <p className="text-center text-sm text-gray-600 mt-2">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default LoginForm