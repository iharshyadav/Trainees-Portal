"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { addLeader } from "@/lib/action"

export default function AddLeader() {
  const [name, setName] = useState("")
  const [studentNo, setStudentNo] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && studentNo) {
    //   console.log("Adding leader to database:", { name, studentNo })
      const saveUser = await addLeader(name , studentNo)
      if(saveUser.success){
          toast( `${name} has been successfully added as a leader.`)
          setName("")
          setStudentNo("")
      }else{
        toast(`${saveUser.message}`)
      }
    } else {
      toast("Please fill in both name and student number.")
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Leader</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter leader's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentNo">Student Number</Label>
              <Input
                id="studentNo"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
                placeholder="Enter student number"
                required
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Add Leader
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}