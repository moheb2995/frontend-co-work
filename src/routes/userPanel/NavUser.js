import React, { useState } from 'react'
import { Link, NavLink, Outlet, } from 'react-router-dom'
import { Cookies } from 'react-cookie'

const Nav = () => {
  const [update, setupdate] = useState(false)
  const pathname = window.location.pathname
  const pathnameCheck = '/User/ReservationRecords'
  const cookie = new Cookies()
  
return (
<div className='flex justify-end'>
  <Outlet/>
  <nav dir='rtl' className={'bg-white shadow-xl opacity w-[305px] p-10 pr-5 py-6 '}>
    <div className="flex justify-end"><img className='w-12' src="/menu.png" /></div>
    <div className="grid">
      <img src="/VectorP.png" className="mt-6 p-4 rounded-full m-auto w-20 h-20 bg-[#00294D] text-center " />
      <h2 className="title m-auto mt-4 text-base ">ملینا روزبهانی</h2>
    </div>
    
      <Link to='/' className="nav-btn mt-14 ">
        <img src="/home-1.png" alt="" className="w-6 mr-14" />
        <h5 className="inline-block mx-5 ">صفحه اصلی</h5>
      </Link>  

      <NavLink 
        to={pathnameCheck} 
        className={pathname === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'}
        onClick={()=> setupdate(!update)}
        >
        <img src={pathname === pathnameCheck ?"/ticket-1.png":'/ticket-2.png'} alt="" className="w-6 mr-14" />
        <h5 className={pathname === pathnameCheck ?"inline-block mx-5 text-white":'inline-block mx-5'}>سوابق رزرو</h5>
      </NavLink>

      <button onClick={()=> cookie.remove('ut') } className="rounded-l-3xl p-2 mt-24 -mr-7 inline-block ">
        <img src="/logout.png" alt="" className="w-6 mr-14" />
        <h5 className=" inline-block mx-5 ">خروج از حساب</h5>
      </button> 
  </nav>
</div>
)}
export default Nav