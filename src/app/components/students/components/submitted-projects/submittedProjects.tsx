import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { FC } from 'react'
import { FiCheckCircle } from "react-icons/fi";

interface SubmittedProjects {
    title : string
    link : string
    submissionDate : any
    _id : number
}

interface submittedProjectsProps {
    submittedProjects : SubmittedProjects[]
}

const SubmittedProjects: FC<submittedProjectsProps> = ({submittedProjects}) => {
  return (
   <>
     {
         submittedProjects.map((project) => (
            <>
              <Card
                key={project._id}
                className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 w-full md:w-full"
              >
                <div className="flex-grow ">
                  <CardHeader>
                    <CardTitle className="font-bold text-xl text-gray-900">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="w-full break-words whitespace-normal overflow-hidden text-ellipsis text-gray-700">
                      {project.link}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-2">
                    <p className="text-gray-600">
                      <strong>Submission Date:</strong>{" "}
                      {new Date(
                        project.submissionDate
                      ).toLocaleDateString()}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="flex-shrink-0">
                  <FiCheckCircle className="text-green-500 text-4xl" />
                </CardFooter>
              </Card>
              <div className="sm:h-4 hidden md:block"></div>
            </>
          ))
     }
   </>
  )
}

export default SubmittedProjects