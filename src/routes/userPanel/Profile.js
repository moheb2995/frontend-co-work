import React,{useEffect, useState} from 'react'
import ProfileIcon from './ProfileIconB'
import { useSelector } from 'react-redux'
import Cookies from "universal-cookie";

const Profile = () => {
  const me = useSelector((state)=>state.slice.me)
  const [input, setinput] = useState({})
  const [select, setselect] = useState()
  const handleOnChenge= e => setinput({...input, [e.target.name]: e.target.value})
  const cookies = new Cookies()
  const token = cookies.get('ut')

  useEffect(()=>{
    setinput({
      one: me.full_name,
      two: me.national_code,
      three: me.phone_number,
    })

    setselect(me.working_category)
  },[me])

    const register = async() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/update-user-info/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "national_code": input.two,
        "full_name": input.one ,
        "working_category": select,
      })
    }).then(res=> res.json()).then(data =>{console.log(data)})
    Location.reload();
  }

return (
<div dir='rtl' className='w-[76%] '>
  <div className="flex justify-between px-12 py-8">
    <h1 className="title">اطلاعات شخصی</h1>
    <ProfileIcon/>
  </div>

  <div className="px-20 mt-20 w-[47vw] ">
    <div className="border1 mb-9">
      <h6 className='text-border bg-white'>نام و نام خانوادگی</h6>
      <input className='input1 ' name='one' value={input.one} onChange={handleOnChenge} />
    </div>
    <div className="border1 mb-9">
      <h6 className='text-border bg-white w-[50px] '>کد ملی</h6>
      <input className='input1 ' name='two' value={input.two} onChange={e => setinput({...input, [e.target.name]: e.target.value.slice(0, 10)})} type='number'/>
    </div>
    <div className="border1 mb-9">
      <h6 className='text-border bg-white w-[84px] '>شماره موبایل</h6>
      <input className='input1 ' name='three' disabled value={input.three} onChange={e => setinput({...input, [e.target.name]: e.target.value.slice(0, 11)})} type='number'/>
    </div>
    <div className="border1 mb-12">
      <h6 className='text-border bg-white w-[80px] '>زمینه فعالیت</h6>
      <select className='input1' onChange={e => setselect(e.target.value)}>
      <option className='hidden' value=""></option>
      <option value="UI/UX">UI/UX</option>
        <option value="Front-end">Front-end</option>
        <option value="Back-end">Back-end</option>
        <option value="other">سایر موارد</option>
      </select>    
    </div>
    <div className="flex justify-end mx-20 p-2"><button onClick={register} className='btn-s'>ثبت</button></div>
  </div>
</div>
)}
export default Profile