"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Upload } from "lucide-react"
import { submitFinalProject } from "@/lib/action"
import { Session } from "next-auth"
import axios from "axios"

interface Props {
  session: Session | null
}

export default function FinalProject({ session }: Props) {
  const [projectTitle, setProjectTitle] = useState("")
  const [techStack, setTechStack] = useState("")
  const [description, setDescription] = useState("")

  const submitProject = async () => {
    if (projectTitle && techStack && description) {

    const response = await axios.post("/api/finalProject", {
        projectTitle,
        techStack,
        description,
        studentNo: session?.user.studentNo,
        name: session?.user.name,
        })
      console.log(response)
      if (response.status === 200) {
        toast("Your final project has been successfully submitted.")
        setProjectTitle("")
        setTechStack("")
        setDescription("")
      } else {
        toast.error(response.data.message as any)
      }
    } else {
      toast.error("Please fill in all fields before submitting.")
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Final Project Submission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter your project title"
              required
            />
          </div>

          <div>
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project. How did this idea come to your mind? What did you do in this project? How did you make it?"
              rows={8}
              required
            />
          </div>

          <Button onClick={submitProject} className="w-full bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" /> Submit Final Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}