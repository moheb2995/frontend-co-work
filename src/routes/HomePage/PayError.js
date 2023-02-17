import React from 'react'
import { Link } from 'react-router-dom'

const PayError = () => {
return (
<div className='flex justify-center items-center w-[100vw] h-[100vh] '>
  <div className="shadow-2xl w-[45vw] text-center rounded-3xl p-[5vw] ">
    <div className="flex justify-center">
      <div className="w-[6vw] bg-[#EE0000] flex justify-center items-center pt-3 h-[6vw] rounded-full text-5xl "><div className="text-white">X</div></div>
    </div>
    <p className="text-[#EE0000] my-4 text-xl font-medium ">پرداخت ناموفق!</p>
    <h5 className="mb-14"> خطایی در پرداخت شما رخ داده است.<br/>لطفا دوباره امتحان کنید.</h5>

    <button className='btn-s bg-[#EE0000] '>امتحان دوباره</button>
  </div>
</div>
)}

export default PayError