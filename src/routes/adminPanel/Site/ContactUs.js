import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Calendar } from "react-multi-date-picker"
import { Cookies } from 'react-cookie'
import Pagination from '@mui/material/Pagination';

const ContactUs = () => {
  const [value, setValue] = useState([])
  const [closeDay, setcloseDay] = useState([])
  const [pagination, setpagination] = useState(1)
  const [count, setcount] = useState(1)
  const [input, setinput] = useState({
    'instagram':'',
    'phone_number':'',
    'email':'a@b.com',
    'address':'',
    'work_time':'',
    'access_ways':'',
  })
  const handleOnChenge= e => setinput({...input, [e.target.name]: e.target.value})
  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/contact-us/`)
    .then(res=> res.json()).then(data => setinput(data))

    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/create-close-day/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'page': `${pagination}`,
        'per_page': '5',
        'startswith': '1',
      })
    })
    .then(res=> res.json()).then(data =>{setcount(data.page.total); setcloseDay(data.data)})
  },[pagination])

  console.log(closeDay);
  const save=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/contact-us/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    })
    .then(res=> res.json()).then(data =>{console.log('msg:',data)})
  }

  const vacation=async()=>{
    if(value.length >= 0){
      const d = value.map(i => [`${i.year}-${i.month.number}-${i.day}`,`${i.year}-${i.month.number}-${i.day}`])
      const obj = Object.fromEntries(d)
      fetch(`${process.env.REACT_APP_BASE_URL}//admin-panel/create-close-day/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj)
      })
      .then(res=> res.json()).then(data =>{console.log('msg:',data)})
    }
  }

  const removeVacation=async(id)=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/rm-close-day/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ids: `${id}`
      })
    })
    .then(res=> res.json()).then(data =>{console.log('msg:',data)})
  }

return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">تماس با ما</h1>
  <Link to='/admin/Site'><button className="text-4xl absolute top-12 left-16 ">{">"}</button></Link>

  <div className="flex my-10 gap-[12vw] text-lg">
    <div className="w-[30vw] ">
      <div className="">
        <h5 className="my-2 bold">آدرس اینستاگرام</h5>
        <input name='instagram' value={input.instagram} onChange={handleOnChenge} className='input2 bg-[#F6F6F6] w-[30vw] ' />

        <h5 className="my-2 bold">شماره تماس</h5>
        <input name='phone_number' value={input.phone_number} onChange={handleOnChenge} className='input2 bg-[#F6F6F6] w-[30vw] ' />

        <h5 className="my-2 bold">آدرس ایمیل</h5>
        <input name='email' value={input.email} onChange={handleOnChenge} className='input2 bg-[#F6F6F6] w-[30vw] ' />
      </div>

      <h5 className="my-2 bold">آدرس</h5>
      <textarea value={input.address} onChange={handleOnChenge} name='address' className='mb-4 w-[100%] bg-[#F6F6F6] rounded-lg p-1 ' rows="1"></textarea>

      <h5 className="my-2 bold">روز و ساعت دسترسی</h5>
      <textarea value={input.work_time} onChange={handleOnChenge} name='work_time' className='mb-4 w-[100%] bg-[#F6F6F6] rounded-lg p-1 ' rows="1"></textarea>

      <h5 className="my-2 bold">دسترسی مکانی</h5>
      <textarea value={input.access_ways} onChange={handleOnChenge} name='access_ways' className='mb-4 w-[100%] bg-[#F6F6F6] rounded-lg p-1 ' rows="1"></textarea>

      <div className="flex justify-end "><button onClick={save} className='btn-s mt-10 mr-7 '>ذخیره</button></div>
    </div>
    {/* 2 */}
    <div className="">
      <h2 className="title my-6">روزهای تعطیل مکین :</h2>
      <div className="flex justify-center mb-2">
        <Calendar 
          className=''
          value
          onChange={(e)=>setValue(e)}
          calendar={persian}
          locale={persian_fa}
          multiple
          hideWeekDays 
          shadow={false}
        />
      </div>
      {
        closeDay.map(i => 
        <div key={i.id} className='bg-[#F6F6F6] rounded-lg p-2 px-4 flex justify-between mt-4 ' >
          <h6 className="text-base">{i.day}</h6>
          <button onClick={()=>removeVacation(i.id)}><img src="/closesquare.png" alt="" className="w-auto h-min" /></button>
        </div>)
      }

      <div dir='ltr' className="flex justify-center m-10 mb-10 ">
        <Pagination count={count} variant="outlined" shape="rounded" value={pagination} onChange={(_, newVal)=>setpagination(newVal)} />
      </div>

      <div className="flex justify-end "><button onClick={vacation} className='btn-s mt-10 mr-7 '>ذخیره</button></div>

    </div>
  </div>
</div>
)}
export default ContactUs