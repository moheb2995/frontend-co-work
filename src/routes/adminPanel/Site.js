import React from 'react'
import { Link } from 'react-router-dom'

const Site = () => {
return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">سایت اصلی</h1>

<div className="flex justify-start flex-wrap gap-[6vw] m-8 mx-10 ">
  <Link to='/admin/Site/Page'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/home-2.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 ">صفحه اصلی</h3>
    </div>
  </Link>
  <Link to='/admin/Site/Cards'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/ticket-1.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 ">کارت ها</h3>
    </div>
  </Link>
  <Link to='/admin/Site/ContactUs'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/Vector2.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 ">تماس با ما</h3>
    </div>
  </Link>
  <Link to='/admin/Site/SeatManagement'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/Group.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 "> صندلی </h3>
    </div>
  </Link>
  <Link to='/admin/Site/Policy'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/messagetext.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 ">قوانین و مقررات</h3>
    </div>
  </Link>

    {/* <Link to='/admin/Site/Texts'>
    <div className="cardSite ">
      <div className="flex justify-center"><img src="/textalign-left.png" alt="" className="w-8 m-8" /></div>
      <h3 className="text-white text-center -mt-3 ">متن ها</h3>
    </div>
  </Link> */}
</div>
</div>
)}
export default Site