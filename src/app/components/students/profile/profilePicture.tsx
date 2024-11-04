"use client";

import { Button } from '@/components/ui/button';
import { onUpload, showProfile } from '@/lib/action';
import ProfileImages from '@/lib/models/userImage';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';

const UploadCareButtonNoSSR = dynamic(() => import('./uploadProfilePicture'), {
  ssr: false,
});

interface ProfilePictureProps {}

const ProfilPicture: FC<ProfilePictureProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    if (session?.user.studentNo) {
      fetchProfileImage();
    }
  }, [session?.user.studentNo, router]);

  return (
    <>
      {loading ? (
        <div className="animate-pulse bg-gray-300 h-56 w-56 rounded-full" />
      ) : userImage ? (
        <Image
          src={userImage}
          alt="User_Image"
          layout="responsive"
          width={500} 
          height={500}
        />
      ) : (
        <UploadCareButtonNoSSR onUpload={onUpload} />
      )}
    </>
  );
};

export default ProfilPicture;
