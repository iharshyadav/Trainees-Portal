import { FC } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { FiCheckCircle } from 'react-icons/fi';

interface skeletonSubmittedProps {
  
}

const SkeletonSubmitted: FC<skeletonSubmittedProps> = ({}) => {
  return (
    <div className="mt-8 w-full">
    <div className="flex flex-col w-full md:flex-row md:flex-wrap md:justify-between space-y-4 md:space-y-0 md:space-x-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="flex w-full flex-col md:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-lg animate-pulse"
        >
          <div className="flex-grow">
            <CardHeader>
              <CardTitle className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
              <CardDescription className="h-4 w-full bg-gray-200 rounded" />
            </CardHeader>
            <CardContent className="mt-2">
              <p className="h-4 w-1/2 bg-gray-300 rounded"></p>
            </CardContent>
          </div>
          <CardFooter className="flex-shrink-0">
            <FiCheckCircle className="text-green-500 text-4xl opacity-30" />
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
  )
}

export default SkeletonSubmitted