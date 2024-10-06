"use client"

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface StudentDetailsPopupProps {
  userId: string
  Name: string
  isOpen: boolean
  onClose: () => void
}

interface Attendance {
  present: number
  absent: number
  total: number
  attendanceRate: number
}

interface Project {
  name: string
  status: number
}

interface Comment {
  id: number
  date: string
  text: string
}

export function StudentDetailsPopup({ userId, Name, isOpen, onClose }: StudentDetailsPopupProps) {
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const [attendanceResponse] = await Promise.all([
          fetch(`/api/studentAttendance?userId=${userId}`),
          // fetch(`/api/studentProject?userId=${userId}`),
          // fetch(`/api/studentComments?userId=${userId}`)
        ])

        const attendanceData = await attendanceResponse.json()
        // const projectData = await projectResponse.json()
        // const commentsData = await commentsResponse.json()

        setAttendance(attendanceData)
        // setProject(projectData)
        // setComments(commentsData)
      } catch (error) {
        console.error("Error fetching student details:", error)
      }
    }

    if (isOpen) {
      fetchStudentDetails()
    }
  }, [userId, isOpen])

  if (!attendance) return null

  const attendanceChartData = [
    { name: 'Present', value: attendance.present },
    { name: 'Absent', value: attendance.absent },
  ]

  const COLORS = ['#0088FE', '#FF8042']

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{Name}'s Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="font-semibold">Present:</div>
                    <div>{attendance.present}</div>
                    <div className="font-semibold">Absent:</div>
                    <div>{attendance.absent}</div>
                    <div className="font-semibold">Total Classes:</div>
                    <div>{attendance.total}</div>
                    <div className="font-semibold">Attendance Rate:</div>
                    <div>{attendance.attendanceRate}%</div>
                  </div>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {attendanceChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <Separator />
          {project && (
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>{project.name}</div>
                  <Progress value={project.status} className="w-full" />
                  <div className="text-sm text-muted-foreground">
                    {project.status}% Complete
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Separator /> */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-4 last:mb-0">
                    <div className="font-semibold">{comment.date}</div>
                    <div>{comment.text}</div>
                  </div>
                ))}
              </ScrollArea> */}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}