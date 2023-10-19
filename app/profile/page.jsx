'use client'
import { useState,useEffect } from "react"
import {useSession} from 'next-auth/react'
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const ProfilePage = () => {
    const router=useRouter();
    const { data: session } = useSession();
    const [myPost,setMypost]=useState([])
    const handleEdit=(post)=>{
         router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete= async(post)=>{
        const ifconfirmed=confirm(
            "Are you sure you want to delete this prompt?"
        )
        if(ifconfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                  method: "DELETE",
                });
        
                const filteredPosts = myPost.filter((item) => item._id !== post._id);
        
                setMypost(filteredPosts);
              } catch (error) {
                console.log(error);
              }
        }
    }
   const fetchPost= async()=>{
 
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
  
      const temp= await response.json()
      setMypost(temp)
   }
   useEffect(()=>{
    if(session?.user.id)
        fetchPost();
    
    
      
   },[session?.user.id])
   console.log(session)
  return (
    <>
    
    
    <Profile
   name="My"
  desc="Welcome to your personalised profile page"
  data={myPost}
 handleEdit={handleEdit}
 handleDelete={handleDelete}/>
   </>
 )

}

export default ProfilePage