"use client"

import { motion } from "framer-motion"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function NotALeader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <ShieldAlert className="w-16 h-16 mx-auto text-yellow-500 dark:text-yellow-400" />
          </motion.div>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
            Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-300">
            We're sorry, but it looks like you don't have leader privileges. This area is reserved for team leaders only.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => toast.success("Access request has been send to the admin!!, Please wait for the response!!!")} className="w-full" variant="outline">
            Request Leader Access
          </Button>
          <Button className="w-full" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}