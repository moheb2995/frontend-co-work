import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Cookies } from 'react-cookie'

const ProfileIcon = () => {
  const [show, setshow] = useState(false)
  const me = useSelector((state)=>state.slice.me)
  const [update, setupdate] = useState(false)
  const cookie = new Cookies()
  
return (
  <div className='' onClick={()=> setshow(!show)}>
    <div className="rounded-3xl min-w-[140px] p-2 px-4 bg-[#00294D] flex justify-between items-center">
      <h2 className=" text-white mx-2 ml-4 ">{me.full_name? me.full_name:'کاربر '}</h2>
      <img src={show ? '/up.png' : '/down.png'} className="w-4 h-min "/>
    </div>
    <div className="flex justify-end">
      <div className={show ? "bg-[#E2E2E2] rounded-xl text-sm mt-2 p-1 absolute " : "hidden"}>
        <Link to={'/User/Profile'}><button onClick={()=> setupdate(!update)} className='button-p '>پنل کاربری</button> <hr className='bg-[#C7C7C7]' /></Link>
        <button onClick={()=> cookie.remove('ut')} className='button-p '>خروج از حساب</button>
      </div>
    </div>
  </div>
)}
export default ProfileIcon