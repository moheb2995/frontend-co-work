import React from 'react'

const PaySuccess = () => {
return (
<div className='flex justify-center items-center w-[100vw] h-[100vh] '>
  <div className="shadow-2xl w-[45vw] text-center rounded-3xl p-[5vw] ">
    <img src="./Group 34.png" alt="success" className="w-[6vw] " />
    <p className="text-[#0DCCAB] my-4 text-xl font-medium ">پرداخت شما با موفقیت انجام شد </p>
    <h5 className="text-xl font-medium mb-14"> 2,890,000 ریال</h5>
    <button className='btn-s bg-[#0DCCAB] '>مشاهده بلیط</button>
  </div>
</div>
)}
export default PaySuccess