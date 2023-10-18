"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect,useState } from "react"
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Navbar = () => {
    const userlogged=true;
    const[providers,setProviders]=useState(null)
    const[toggleDropdown,settoggleDropdown]=useState(true)
    useEffect(()=>{
       const setProviders=async()=>{
            const responnse=await getProviders();
            setProviders(responnse)
        }

        setProviders()
    },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
          <Link href="/" className="felx gap-2 flex-center">
            <Image src='/assets/images/logo.svg' alt="propmptopia" width={30} height={30} className="object-contain"/>
            <p className="logo_text">Promptopia</p>
          </Link> 
         {/* Dekstop Navigation` */}
          <div className="sm:flex hidden">
            {userlogged?
            (<div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">Create Post</Link>
                <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                <Link href="/profile">
                    <Image src="/assets/images/logo.svg" 
                    width={37} 
                    height={37}/>
                </Link>
            </div>):<>
            {providers && Object.values(providers).map((provider)=>{
                <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">
                  Sign in
                </button>
            })}
            </>}
          </div>

          {/* Mobile navigation */}
          <div className="sm:hidden flex relative ">
            {userlogged?(
                <div className="flex">
                      <Image src='/assets/images/logo.svg' 
                      alt="propmptopia"
                       width={30}
                        height={30} 
                        className="object-contain"
                        onClick={()=>{settoggleDropdown((prev)=>!prev)}}/>
                        {toggleDropdown &&(
                            <div className="dropdown">
                                <Link href="/profile"
                                 className="dropdown_link"
                                 onClick={()=>settoggleDropdown(false)}>My Profile
                                 </Link>
                                 <Link href="/create-prompt"
                                 className="dropdown_link"
                                 onClick={()=>settoggleDropdown(false)}>Create Prompt 
                                 </Link>
                                 <button type="button"
                                  onClick={()=>{settoggleDropdown(false); 
                                  signOut();}} 
                                  className="black_btn w-full mt-5">
                                    Sign Out
                                 </button>
                            </div>
                        )}
                </div>
            ):(<>
                {providers && Object.values(providers).map((provider)=>{
                    <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">
                      Sign in
                    </button>
                })}
                </>)}
          </div>
    </nav>
  )
} 

export default Navbar
