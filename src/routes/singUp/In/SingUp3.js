import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";

const SingUp = () => {
  const navigate =useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('ut')
  const [show, setshow] = useState(false)
  const [text, settext] = useState(false)
  const [select, setselect] = useState("UI/UX")
  const [input, setinput] = useState({name:'', code:'',})
  const handleOnChenge= e => setinput({...input, [e.target.name]: e.target.value})

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/policy/`)
    .then(res=> res.json()).then(data =>settext(data.text))
  },[])

  const register = async() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/update-user-info/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "national_code": input.code,
        "full_name": input.name,
        "working_category": select,
      })
    }).then(res=> res.json()).then(data =>{data.msg === 'updated' ? navigate('/'): console.log(data)})
  }

return (
<div dir='rtl' className=''>
  <div className="flex justify-center my-20">
    <img src="./Group 34.png" alt="" className="step " />
    <p className="step-t">ثبت شماره همراه</p>
    <div className="line "></div>
    <img src="./Group 34.png" alt="" className="step " />
    <p className="step-t">کد تایید</p>
    <div className="line"></div>
    <span className='step1'>3</span>
    <p className="step-t1">فرم اطلاعات</p>
  </div>

  <div className="flex justify-center mt-20">
    <div className="card ">
      <div className="flex justify-between">
        <img src="./logo.png" alt="frgrt" className="w-16" />
        <h2 className="text-2xl bold mt-4 ml-10">عضویت</h2>
        <Link to='/singup2'><button className="text-4xl mt-2">{">"}</button></Link>
      </div>

      <div className="grid my-10">
        <div className="border1 ">
          <h6 className='t1 w-28 '>نام و نام خانوادگی</h6>
          <input className='input1' name='name' value={input.name} onChange={handleOnChenge} />
        </div>
        <div className="border1 ">
          <h6 className='t1 w-12 '>کد ملی</h6>
          <input className='input1' name='code' value={input.code} onChange={handleOnChenge} />
        </div>
        <div className="border1 ">
          <h6 className='t1 w-20 '>زمینه فعالیت</h6>
          <select className='input1' onChange={e => setselect(e.target.value)}>
          <option className='hidden' value=""></option>
            <option value="UI/UX" >UI/UX</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="other">سایر موارد</option>
          </select>
        </div>
        {/* <div className="border1 ">
          <h6 className='t1 w-[54px] '>رمز ورود</h6>
          <input className='input1 w-[85%]' name='three' value={input.three} onChange={handleOnChenge} type={input.threeIsPassword?'password':'text'} />
          <img src="./eye.png" onClick={e => setinput({...input, threeIsPassword: !input.threeIsPassword})} className='w-6 inline-block mx-2 -mt-3' />
        </div>
        <div className="border1 ">
          <h6 className='t1 w-[84px] '>تکرار رمز ورود</h6>
          <input className='input1 w-[85%]' name='four' value={input.four} onChange={handleOnChenge} type={input.fourIsPassword?'password':'text'} />
          <img src="./eye.png" onClick={e => setinput({...input, fourIsPassword: !input.fourIsPassword})} className='w-6 inline-block mx-2 -mt-3' />
        </div> */}
      </div>

      <h6 className="text-center text-sm ">
        ورود شما به معنای پذیرش 
        <button className='text-[#0593CE] mx-1 ' onClick={()=> setshow(true)}> شرایط مکین و قوانین</button>
        است
       </h6>
      
      <div className="grid">
        <button 
          onClick={register}
          className='btn-blue w-[66%] '>تایید</button>
      </div>
    </div>
  </div>
  {/* modul */}
  {
    show ?
    <>    
    <div onClick={()=> setshow(false)} className="backdrop"></div>
    <div className="fixed top-20 bottom-20 left-40 right-40 z-40 bg-white rounded-xl p-8">
      <img src="/logo2.png" alt="" className="w-[138px] " />
      <hr className='my-4' />
      {new DOMParser().parseFromString(text, "text/xml" ).firstChild.innerHTML }
    </div>
    </>
    : ''
  }
</div>
)}
export default SingUp