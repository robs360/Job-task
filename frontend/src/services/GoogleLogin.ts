import axios from "axios";
import { Session } from "next-auth";
import Swal from "sweetalert2";

interface GoogleLoginProps {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  router: { push: (path: string) => void };
}

export const handleGooglelogin = async ({ session, status, router }:GoogleLoginProps) => {
    if (status === 'authenticated' && session?.user) {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/user/google/login`, {
                name: session.user.name,
                email: session.user.email,
                password: "123456",  
                image: session.user.image
            });
            
            const data = res.data;

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
               
                Swal.fire("Login Successfully Done");
                setTimeout(() => {
                    router.push('/');
                }, 1600);

            } else {
               
                Swal.fire("Login Failed");
            }
        } catch (error) {
            
            Swal.fire("Something went wrong");
        }
    }
}