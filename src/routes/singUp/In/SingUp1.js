import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleNum } from '../../../Redux/slice'

const SingUp = () => {
  const dispatch = useDispatch()
  const num = useSelector((state)=>state.slice.numSing)
  const navigate = useNavigate()
  const [msg, setmsg] = useState('')
  const [update, setupdate] = useState(false)

  const register = async() =>{
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/register/`, {
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
      return data.msg == "otp sent"? navigate('/singup2') :''
      
    })
    setupdate(!update)
  }


console.log(msg);

return (
<div dir='rtl' className=''>
  <div className="flex justify-center mt-32">
    <span className='step1 mr-0'>1</span>
    <p className="step-t1">ثبت شماره همراه</p>
    <div className="line "></div>
    <span className='step1'>2</span>
    <p className="step-t">کد تایید</p>
    <div className="line"></div>
    <span className='step1'>3</span>
    <p className="step-t">فرم اطلاعات</p>
  </div>

  <div className="flex justify-center my-20">
    <div className="card">
      <div className="flex justify-between">
        <Link to={'/'}><img src="./logo.png" alt="frgrt" className="w-16" /></Link>
        <h2 className="text-2xl bold mt-4 ml-10">عضویت</h2>
        <Link to='/'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <h5 className="text-center mb-8 mt-8 text-[#4B4B4B]">سلام مکینیه عزیز<br />لطفا شماره موبایل خود وارد کنید.</h5>
      <div className="flex justify-center underline">
        <input 
          dir='ltr' 
          className='bg-transparent text-2xl p-1 px-2 border w-[70%] border-[#8B8B8B] rounded-xl m-3 ' 
          type="number" value={num} 
          onChange={e => dispatch(handleNum(e.target.value.slice(0, 11)))} 
        />
      </div>
        <p className={msg == "wait 2 minutes"?"text-red-500 text-sm mx-20":'hidden'}>این شماره از قبل ثبت شده</p>
    
      <div className="grid my-2">
        {
          msg == "otp sent"?
          <Link className='m-auto w-[70%]' to='/singup2'>
            <button onClick={register} className='btn-blue '>ثبت نام</button>
          </Link>
          :
          <div className='m-auto w-[70%]'>
            <button onClick={register} className='btn-blue '>ثبت نام</button>
          </div>
        }

        <div className="text-center mt-1">
          <span>آیا حساب کاربری دارید؟</span>
          <Link className='mx-auto -mt-3' to='/LoginNumber'>
            <button className='bold mx-2 text-[#00294D] underline'> ورود</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
)}
export default SingUp