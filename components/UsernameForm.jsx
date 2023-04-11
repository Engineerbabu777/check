

import React,{useState,useEffect} from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';



const UsernameForm = () => {
    const router = useRouter();
const [username , setusername] = useState("");
const {data:session,status:sessionStatus} = useSession();
const [redirect , setredirect] = useState(false);

const SaveUsername = async() => {
    console.log(username);
    await axios.put('/api/user',{id:session?.user?.id,newUsername:username})
    .then(()=>{
  router.reload();
    })
}

  return (
    <>
    { !session?.user?.username && (
        <>
 <div className=" flex justify-center items-center h-screen">
      
      <div className=" flex flex-col gap-3 text-twitterWhite">
        <h2 className="text-2xl">How we will indentify you 🤔❓   </h2>
        <input value={username} onChange={(e)=>setusername(e.target.value)} className="bg-twitterBorder rounded-full px-4 py-2 outline-none border-none" type="text" />
        <button onClick={SaveUsername} className="mx-8 bg-twitterBlue px-2 py-2 rounded-3xl flex items-center text-center justify-center gap-2">Continue to Home <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
       </button>
      </div>
      
      
          </div>
        </>
    )

    }
   
    </>
  )
}

export default UsernameForm
