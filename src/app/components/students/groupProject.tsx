"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, UserPlus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { submitGroupProject } from "@/lib/action"
import { Session } from "next-auth"

interface TeamMember {
  id: string
  name: string
  studentNumber: string
}

// interface SessionType {
//     Name : string,
//     studentNo : number;
// }

interface Props {
    session : Session | null
}

export default function GroupProject({session} : Props) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [name, setName] = useState("")
  const [studentNumber, setStudentNumber] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [hostedLink, setHostedLink] = useState("")

//   console.log(session?.user,"drearr")

  const addTeamMember = () => {
    if (name && studentNumber) {
        if(teamMembers.length > 2){
            toast.error("You have added maximum team members!!!")
            setName("")
            setStudentNumber("")
            return;
        }else{
            setTeamMembers([...teamMembers, { id: Date.now().toString(), name, studentNumber }])
            setName("")
            setStudentNumber("")
            toast(`${name} has been added to the team.`)
        }
    }
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const submitProject = async () => {
    if (projectName && projectDescription && teamMembers.length > 0) {
      const response = await submitGroupProject({
        projectName,
        projectDescription,
        githubLink,
        hostedLink,
        teamMembers,
        leaderStudentNo: session?.user.studentNo,
        leaderName: session?.user.name,
      });

      if (response.success) {
        toast("Your project has been successfully submitted.");
        setName("")
        setStudentNumber("")
        setTeamMembers([])
        setProjectName("")
        setGithubLink("")
        setHostedLink("")
        setProjectDescription("")
      } else {
        toast.error(response.message);
      }
    } else {
      toast("Failed to submit project!!!");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Team Project Submission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add Team Members</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="studentNumber">Student Number</Label>
                <Input
                  id="studentNumber"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="Enter student number"
                  required
                />
              </div>
            </div>
            <Button onClick={addTeamMember} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <AnimatePresence>
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between bg-secondary p-3 rounded-md"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.studentNumber}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeTeamMember(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Project Details</h2>
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                required
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="githubLink">Github Link</Label>
              <Input
                id="githubLink"
                value={githubLink}
                required
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="hostedLink">Hosted Link (Optional)</Label>
              <Input
                id="hostedLink"
                value={hostedLink}
                onChange={(e) => setHostedLink(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                required
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your project"
                rows={4}
              />
            </div>
          </div>

          <Button onClick={submitProject} className="w-full bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" /> Submit Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}