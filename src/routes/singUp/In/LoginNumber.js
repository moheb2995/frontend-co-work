import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleNum } from '../../../Redux/slice'

const LoginNumber = () => {
  const [msg, setmsg] = useState('')
  const dispatch = useDispatch()
  const num = useSelector((state)=>state.slice.numSing)
  const navigate = useNavigate()

  const register = async() =>{

    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/request-code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone_number": num,
        "uni_code": 2234567898,
        "working_category": undefined
      })
    })
    .then(res=> res.json()).then(data =>{
      console.log(data);
      setmsg(data.msg)
      return data.msg == "code sent"? navigate('/FPasswordCode') :''
    })
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/delete-all-codes/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res=> res.json()).then(data =>console.log(data))
  },[])

return (
<div dir='rtl' className='h-[100vh] '>
  <div className="items-center flex justify-center mt-[25vh] "> 
    <div className="card ">
      <div className="flex justify-between ">
        <img src="./logo.png" alt="frgrt" className="w-16" />
        <h2 className="text-2xl bold mt-4 ml-10">ورود</h2>
        <Link to='/'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <h5 className="text-center my-10 text-[#4B4B4B]">سلام مکینیه عزیز<br />لطفا شماره موبایل خود وارد کنید.</h5>
      <div className="flex justify-center underline my-10">
        <input 
            dir='ltr' 
            className='bg-transparent text-2xl p-1 px-2 border w-[70%] border-[#8B8B8B] rounded-xl m-3 ' 
            type="number" value={num} 
            onChange={e => dispatch(handleNum(e.target.value.slice(0, 11)))} 
          />
      </div>
      {/* <h6 className="mx-24 m-3 border-b border-[#4B4B4B] inline-block text-[#4B4B4B] ">ورود با کد یکبار مصرف</h6> */}

      <div className="grid ">
      {
          msg == "otp sent"?
          <Link className='m-auto w-[70%]' to='/FPasswordCode'>
            <button onClick={register} className='btn-blue '>ثبت نام</button>
          </Link>
          :
          <div className='m-auto w-[70%]'>
            <button onClick={register} className='btn-blue '> تایید </button>
          </div>
        }
      </div>
    </div>
  </div>
</div>
)}
export default LoginNumber