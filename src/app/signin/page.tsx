"use client";

import React, { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SignupFormDemo() {

  const { data : session } = useSession();

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  console.log(session);

  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const studentNo = formData.get("studentNo") as string;
        const password = formData.get("password") as string;

        if (!studentNo || !password) {
          toast( "Please fill in all fields")
          return
        }

        console.log(studentNo,password)
    
       try {
        setIsLoading(true)
        const result =  await signIn("credentials", {
            studentNo,
            password,
            redirect:false
          });

          // console.log(result)

          if (result?.ok) {
            toast("Signed in successfully")
            router.push("/");
            setIsLoading(false);
            // console.log("first")
          } else {
            // console.error(result?.error);
            // console.log("firshjht")
            toast("Invalid credentials")
            setIsLoading(false);
          }

       } catch (error) {
        // console.log(error)
       }


      };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 , x : 180 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="w-full max-w-md overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <CardHeader className="space-y-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <CardTitle className="text-2xl font-bold text-center">Welcome to BDCOE</CardTitle>
              <CardDescription className="text-center text-purple-100">Sign in to your account</CardDescription>
            </CardHeader>
          </motion.div>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentNo" className="text-sm font-medium text-gray-700">Student Number</Label>
                <Input
                  id="studentNo"
                  name="studentNo"
                  placeholder="Enter your student number"
                  required
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </motion.div>
            </form>
            {/* <div className="mt-4 text-center text-sm">
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div> */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
