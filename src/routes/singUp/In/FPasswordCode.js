import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from "universal-cookie";

const FPasswordCode = () => {
  const navigate =useNavigate()
  const cookies = new Cookies()
  const num = useSelector((state)=>state.slice.numSing)
  const [msg, setmsg] = useState('')
  const [input, setinput] = useState({
    one:'',
    two:'',
    three:'',
    four:'',
  })

  const handleNumChange = e => {
    const limit = 1;
    setinput({...input, [e.target.name]: e.target.value.slice(0, limit)});
  }

  console.log(num);
  const login = async() =>{
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/verify-code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'phone_number': num,
        'code': `${input.one}${input.two}${input.three}${input.four}`
      })
    })
    .then(res=> res.json()).then(data =>{
      console.log(data);
      setmsg(data.msg)
      cookies.set('ut', data.access)
      return data.msg == "verified, logged in successfully" ? navigate('/') :''
    })
  }

return (
<div dir='rtl' className='h-[100vh'>
  <div className="flex justify-center xl:mt-[25vh] mt-[15vh] ">
    <div className="card ">
      <div className="flex justify-between">
        <img src="./logo.png" alt="frgrt" className="w-16" />
        <h2 className="text-2xl bold mt-4 ml-10">تایید کد</h2>
        <Link to='/LoginNumber'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <p className="text-center my-6 text-[#4B4B4B] ">    کد تایید به شماره {num} ارسال شد.</p>
      <Link to='/LoginNumber'><p className="text-center ">اصلاح شماره همراه</p></Link>


      <div dir='ltr' className="flex justify-center mx-20 mt-4">
        <input name='one' value={input.one} onChange={handleNumChange} type="number" className="input" />
        <input name='two' value={input.two} onChange={handleNumChange} type="number" className="input" />
        <input name='three' value={input.three} onChange={handleNumChange} type="number" className="input" />
        <input name='four' value={input.four} onChange={handleNumChange} type="number" className="input" />
      </div>

      <div className="grid">
        <div className='m-auto mt-10 w-[280px] '><button onClick={login} className='btn-blue '>تایید </button></div>
      </div>
    </div>
  </div>
</div>
)}

export default FPasswordCode