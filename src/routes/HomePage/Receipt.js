import React from 'react'
import { Link } from 'react-router-dom'

const Receipt = () => {
return (
<div dir='rtl' className='p-10 fixed top-10 z-20'>
  <div className="bg-[#D9D9D9] rounded-2xl p-8 w-[400px] m-auto">
    <h1 className="text-lg bold text-center  ">صندلی اختصاصی 3 روزه</h1>
    <div className="flex justify-between border-b border-dashed border-[#8B8B8B] pb-4 mb-2 ">
      <div className="my-2">
        <h6 className="my-2">نام و نام خانوادگی</h6>
        <h6 className="my-2">تاریخ رزرو</h6>
      </div>
      <div className="my-2">
        <h6 className="my-2">ملینا روزبهانی</h6>
        <h6 className="my-2">1401 /9 /22</h6>
      </div>
    </div>
    <div className="flex justify-between border-b border-dashed  ">
      <div className="my-2">
        <h6 className="my-2">رزرو صندلی اختصاصی</h6>
        <h6 className="my-2">تخفیف</h6>
        <h6 className="my-2">مبلغ پرداختی</h6>
      </div>
      <div className="my-2">
        <h6 className="my-2">98000 تومان</h6>
        <h6 className="my-2">98000 تومان</h6>
        <h6 className="my-2">98000 تومان</h6>
      </div>
    </div>
    <Link to='/' className='flex justify-center'><button className='btn-blue w-56 '>برگشت به صفحه اصلی</button></Link>
    
  </div>
</div>
)}
export default Receipt