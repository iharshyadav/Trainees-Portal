"use client"

import { Button } from '@/components/ui/button'
import { onUpload, showProfile } from '@/lib/action'
import { ConnectToDB } from '@/lib/db'
import ProfileImages from '@/lib/models/userImage'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'



const UploadCareButtonNoSSR = dynamic(() => import('./uploadProfilePicture'), {
  ssr: false,
});


interface profilePictureProps {

}

const ProfilPicture: FC<profilePictureProps> = () => {

 const router = useRouter()

 const {data : session} = useSession();

 const [userImage, setUserImage] = useState("")

 
 useEffect(() => {
  const fetchProfileImage = async () => {
    try {
      const profileImage = await showProfile(session?.user.studentNo);
      if (profileImage) {
        setUserImage(profileImage);
        router.refresh();
      }
    } catch (error) {
      toast("Failed to fetch user image!!!");
    }
  };
  if (session?.user.studentNo) {
    fetchProfileImage();
  }
}, []);

  // const onRemoveProfileImage = async () => {
  //   const response = await onDelete()
  //   console.log(response)
  //   console.log("first")
  //   if (response) {
  //     router.refresh()
  //   }
  // }


  return (
    <>
      {userImage ? (
          <>
              <Image
            src={userImage}
            alt="User_Image"
            layout="responsive"
            width={500} 
            height={500}
          />
          </>
        ) : (
          
          <UploadCareButtonNoSSR onUpload={onUpload} />
        )}
    </>
  )
}

export default ProfilPicture