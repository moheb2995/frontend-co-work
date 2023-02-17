import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from "universal-cookie";

const SingUp = () => {
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

  const register = async() =>{
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
      return data.msg == "verified, logged in successfully" ? navigate('/singup3') :''
    })
  }

return (
<div dir='rtl' className=''>
  <div className="flex justify-center my-32">
    {/* <span className='step '>1</span> */}
    <img src="./Group 34.png" alt="" className="step rr-0 " />
    <p className="step-t">ثبت شماره همراه</p>
    <div className="line "></div>
    <span className='step1'>2</span>
    <p className="step-t1">کد تایید</p>
    <div className="line"></div>
    <span className='step1'>3</span>
    <p className="step-t">فرم اطلاعات</p>
  </div>

  <div className="flex justify-center mt-20">
    <div className="card ">
      <div className="flex justify-between">
      <Link to={'/'}><img src="./logo.png" alt="frgrt" className="w-16" /></Link>
        <h2 className="text-2xl bold mt-4 ml-10">عضویت</h2>
        <Link to='/singup1'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <p className="text-center mt-6 text-[#4B4B4B] ">برای ساخت حساب جدید کد تایید به شماره {num} ارسال شد.</p>
      <Link to='/singup1'><p className="text-center mt-2 ">اصلاح شماره همراه</p></Link>

      <div dir='ltr' className="flex justify-center mx-20 mt-4">
        <input name='one' value={input.one} onChange={handleNumChange} type="number" className="input" />
        <input name='two' value={input.two} onChange={handleNumChange} type="number" className="input" />
        <input name='three' value={input.three} onChange={handleNumChange} type="number" className="input" />
        <input name='four' value={input.four} onChange={handleNumChange} type="number" className="input" />
      </div>

      <div className="flex justify-center">
        <div className="grid mt-10 mx-20 w-[288px] ">
          {
            msg === "verified, logged in successfully" ?
            <Link className='m-auto w-[100%] ' to='/singup3'>
              <button onClick={register} className='btn-blue '>تایید</button>
            </Link>
            :
            <div className='m-auto w-[100%]' to='/singup3'>
              <button onClick={register} className='btn-blue '>تایید</button>
            </div>
          }

          <div className="flex justify-center">
            <span>کد تایید ارسال نشد؟</span>
            <button className='bold mx-2 text-[#00294D]'>ارسال مجدد کد</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)}
export default SingUp