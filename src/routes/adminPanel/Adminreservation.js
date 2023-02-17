import React,{ useEffect, useState } from 'react'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Calendar } from "react-multi-date-picker"
import { Cookies } from 'react-cookie'

const Adminreservation = () => {
  const [freeDask, setfreeDask] = useState({msg:true})
  const [value, setValue] = useState([])
  const [select, setselect] = useState('single')
  const [input, setinput] = useState({number:'09128458203', code:''})
  const handleOnChenge= e => setinput({...input, [e.target.name]: e.target.value})
  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    if(value.length !== 0){
      const d = value.map(i => [`${i.year}-${i.month.number}-${i.day}`,`${i.year}-${i.month.number}-${i.day}`] )
      const obj = Object.fromEntries(d)

      fetch(`${process.env.REACT_APP_BASE_URL}/reserve/free-desks/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( obj )
      }).then(res=> res.json()).then(data => setfreeDask(data))
    }
  },[value])

  const reserve=async()=>{
    const d = value.map(i => [`${i.year}-${i.month.number}-${i.day}`,`${select}`])
    d.push(['phone_number',input.number])
    const obj = Object.fromEntries(d)

    console.log(obj);
    if(freeDask.msg){
      fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/reserve/`,
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

return (
<div dir='rtl' className="w-[87%]">
  <h1 className="hAdmin ">رزرو حضوری</h1>

  <div  className='grid grid-cols-2 mt-[60px] md:mx-28 xl:mx-40 mx-0 gap-20 '>
    <div className="">
      <div className="border1 w-[100%] mb-4">
        <h6 className='text-border bg-white w-[88px] '>نوع درخواست</h6>
        <select onChange={e => setselect(e.target.value)} className='input1'>
          <option className=' ' value="صندلی اختصاصی"> صندلی اختصاصی</option>
          <option className=' ' value="صندلی گروهی"> صندلی گروهی</option>
        </select>
      </div>

      <h2 className="text-[#00294D] text-center mt-[58px] my-4 text-lg bold ">انتخاب تاریخ</h2>
      <div className="flex justify-center">
        <Calendar 
          value
          onChange={(e)=>setValue(e)}
          calendar={persian}
          locale={persian_fa}
          multiple
          hideWeekDays 
          shadow={false}
        />
      </div>
      <div className={freeDask.msg?'hidden':"text-[#EE0000]"}> در تاریخ {freeDask.msg} صندلی تکمیل است </div>

    </div>
    {/* 2 */}
    <div className="">
      <div className="border1 w-[100%] mb-4 ">
        <h6 className='t1 w-20 '>شماره همراه</h6>
        <input className='input1' name='number' value={input.number} onChange={handleOnChenge} />
      </div>

      <div className="w-[100%] ">
        <h2 className="title mt-[58px] ">فاکتور</h2>
        <div className="flex justify-between my-8 w-[100%] ">
          <div className="">
            <h6 className="">رزرو صندلی {select === 'single'? 'اختصاصی':'گروهی'}</h6>
            <h6 className="my-2">تخفیف</h6>
            <h6 className="">مبلغ قابل پرداخت</h6>
          </div>
          <div className="">
            <h6 className="">{value.length}</h6>
            <h6 className="my-2">{0} تومان</h6>
            <h6 className="">0 تومان</h6>
          </div>
        </div>

        <div className="bg-[#F0F0F0] p-3 rounded-lg ml-4 w-[100%] ">
          <img src="/receipt-disscount.png" alt="" className="w-6 ml-3 " />
          <input className="border-r border-[#939393] inline-block px-2 bg-[#F0F0F0] w-[80%] " name='code' placeholder='کد تخفیف' value={input.code} onChange={handleOnChenge} />
        </div>
        <button onClick={reserve} className='btn-blue text-lg mt-12 mb-24'>تایید و رزرو</button>
      </div>
    </div>
  </div>
</div>
)}
export default Adminreservation