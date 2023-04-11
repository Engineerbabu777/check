

import axios from "axios";
import { useSession } from "next-auth/react";
import React,{useState,useEffect} from "react";

export default function useUserInfo(){
    
const [userInfo, setUserInfo] = useState(null);
const {data:session,status:sessionStatus} = useSession();
const [status,setStatus] = useState("loading");

function getUserInfo() {
    if (sessionStatus === "loading") {
      return;
    }

    if(!session?.user?.id){
        setStatus('unauthenticated');
        return;
    }

    axios.get('/api/user?id='+session?.user?.id)
    .then(({data})=>{
        setUserInfo(data);
        setStatus("done");
        console.log(data);
    }).catch((err)=>{
        console.log(err.message);
    })
}  

useEffect(()=>{
getUserInfo();
},[sessionStatus]);

return {userInfo , status , setUserInfo}
}