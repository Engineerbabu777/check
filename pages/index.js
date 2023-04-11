
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useUserInfo from '@/hooks/useUserInfo';
import UsernameForm from '@/components/UsernameForm';

const Home = () => {
 
   const {data:session,status:sessionStatus} = useSession();
   const router = useRouter();
   const {userInfo , setUserInfo , status} = useUserInfo();

   useEffect(()=>{
     console.log("USERNAME -> " ,userInfo?.userDoc);
     console.log("username -> " ,session?.user);

   },[sessionStatus]);

   if(status === "loading"){
    return 'loading';
   }
// Redirect back to login page if user not available!

if(!!userInfo && !userInfo?.userDoc?.username){
  return <UsernameForm />
  }
  
  if(!userInfo){
    router.push('/login');
    return 'no user';
  }


  return (

 <>
 { !!userInfo && (
  <>
  Welcome {userInfo?.userDoc?.username} to Home Page !
  </>
 )

 }
 </>   
 

  )
}

export default Home
