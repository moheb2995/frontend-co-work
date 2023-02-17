import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Cookies } from 'react-cookie'

const NavAdmin = () => {
  const [update, setupdate] = useState(false)
  const pathnameCheck = window.location.pathname
  const pathname = {
    home: '/admin/Home',
    site: '/admin/Site',
    reserved: '/admin/Reserved',
    users: '/admin/Users',
    adminreservation: "/admin/adminreservation",
  }
  const cookie = new Cookies()

return (
<div className='flex justify-end m-8'>
  <Outlet/>
  <nav dir='rtl' className={'bg-[#F6F6F6] w-[305px] h-min p-5 pt-6 rounded-xl ml-8 '}>
    <div className="flex justify-center ml-2 -mt-4 border-b p-4 w-[100%] border-[#949494] mb-6 ">
      <NavLink to='/'><img src="/logo2.png" alt="" className="w-36" /></NavLink>
    </div>
    
    <NavLink to={pathname.home} 
      className={pathname.home === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'} onClick={()=> setupdate(!update)}>
      <img src={pathname.home === pathnameCheck ? "/home-2.png" :'/home-1.png'}alt="" className="w-6 mr-14 " />
      <h5 className={pathname.home === pathnameCheck ?'inline-block mx-5 text-white':'inline-block mx-5'}>خانه</h5>
    </NavLink>

    <NavLink to={pathname.users} className={pathname.users === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'} onClick={()=> setupdate(!update)}>
      <img src={pathname.users === pathnameCheck ? '/user2.png':'/user1.png'} alt="" className="w-5 mr-14 " />
      <h5 className={pathname.users === pathnameCheck ?'inline-block mx-6 text-white':'inline-block mx-6'}>کاربران</h5>
    </NavLink>

    <NavLink to={pathname.site} className={pathname.site === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'} onClick={()=> setupdate(!update)}>
      <img src={pathname.site === pathnameCheck ? '/category2.png':'/category1.png'} alt="" className="w-6 mr-14 " />
      <h5 className={pathname.site === pathnameCheck ?'inline-block mx-5 text-white':'inline-block mx-5'}>سایت اصلی</h5>
    </NavLink>

    <NavLink to={pathname.reserved} className={pathname.reserved === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'} onClick={()=> setupdate(!update)}>
      <img src={pathname.reserved === pathnameCheck ? '/documenttext1.png' :'/documenttext2.png'}alt="" className="w-6 mr-14 " />
      <h5 className={pathname.reserved === pathnameCheck ?'inline-block mx-5 text-white':'inline-block mx-5'}>رزرو شده ها</h5>
    </NavLink>
    
    <NavLink to={pathname.adminreservation} className={pathname.adminreservation === pathnameCheck ? "nav-btn bg-[#00294D]":'nav-btn'} onClick={()=> setupdate(!update)}>
      <img src={pathname.adminreservation === pathnameCheck ? '/reserve2.png':'/reserve1.png'} alt="" className="w-6 mr-14 " />
      <h5 className={pathname.adminreservation === pathnameCheck ?'inline-block mx-5 text-white':'inline-block mx-5'}> رزرو حضوری </h5>
    </NavLink>

    <button onClick={()=> cookie.remove('ut') } className="rounded-l-3xl p-2 inline-block mt-[10vh]  ">
      <img src="/logout.png" alt="" className="w-6 mr-6 " />
      <h5 className=" inline-block mx-5 ">خروج از حساب</h5>
    </button> 
  </nav>
</div>
)}
export default NavAdmin