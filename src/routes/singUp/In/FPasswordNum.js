import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FPasswordNum = () => {
  const [input, setinput] = useState('')
  const [isPassword, setisPassword] = useState(false)

return (
<div dir='rtl' className='h-[100vh]'>
  <div className="flex justify-center mt-24">
    <div className="card ">
      <div className="flex justify-between">
        <img src="./logo.png" alt="frgrt" className="w-16" />
        <h2 className="text-2xl bold mt-4 ml-10">ورود</h2>
        <Link to='/LoginPassword'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <h6 className='mx-20 px-2 mt-10'> رمز ورود</h6>
      <div className="border-[#8B8B8B] rounded-xl w-[66%] m-auto my-4 border-[1.5px] ">
          <input className='input1 w-[85%]' name='four' value={input} onChange={e => setinput(e.target.value)} type={isPassword?'password':'text'} />
          <img src="./eye.png" onClick={e => setisPassword(!isPassword)} className='w-6 inline-block mx-2 -mt-3' />
        </div>

      <div className="grid">
        <Link className='m-auto mt-10' to='/FPasswordCode'><button className='btn-blue'>تایید </button></Link>
      </div>
    </div>
  </div>
</div>
)}
export default FPasswordNum