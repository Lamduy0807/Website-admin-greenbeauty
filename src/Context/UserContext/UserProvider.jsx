import React, { useState } from 'react'
import { UserContext } from './UserContext'

const UserProvider = ({children}) => {

  // const [userData, setUserData] = useState();
  // const [userAvt, setUserAvt] = useState('');
  // const [userName, setUserName] = useState("")
  // const [showUpdate, setShowUpdate] = useState(false);
  // const [token, setToken] = useState("")
  const [isLogin, setIsLogin] = useState(true)
    // useEffect(()=>{
    //     getUserInfor();
    // },[])
    // const getUserInfor = () =>{
    //     try{
    //         const id = localStorage.getItem('id-admin')
    //         const tokens = localStorage.getItem('token-admin')
    //         setToken(tokens);
    //         if(id>0)
    //             getUserInformation(id,tokens).then(res=>{
    //                 setUserData(res)
    //                 setUserAvt(res.avt)
    //                 if(res.name === null)
    //                 {
    //                   setShowUpdate(true);
    //                 }
    //                 else
    //                 {
    //                   setUserName(handleSplit(res.name))
    //                 }
    //             })
    //         else{
    //           setUserName('')
    //         }
    //     }catch(error){
    //         console.log(`Error is ${error}`);
    //     }
    // }

    // const handleSplit = (val) =>{
    //     const nameArray = val.split(" ");
    //     return nameArray[nameArray.length-1]
    // }
    
  return (
    <UserContext.Provider value={{isLogin, setIsLogin}}>{children}</UserContext.Provider>
  )
}

export default UserProvider