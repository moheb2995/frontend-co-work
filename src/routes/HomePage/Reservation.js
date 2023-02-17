import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Receipt from './Receipt'
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Footer from './Footer';
import { Cookies } from 'react-cookie'
import PayError from './PayError'
import PaySuccess from './PaySuccess'
import { useSelector } from 'react-redux'
import ProfileIconB from '../userPanel/ProfileIconB'

const Reservation = () => {
  const navigate = useNavigate()
  const cookie = new Cookies()
  const token = cookie.get('ut')
  const [showModal,setshowModal] = useState(false)
  const [value, setValue] = useState([])
  const [freeDask, setfreeDask] = useState({msg:true})
  const [select, setselect] = useState('single')
  const [input, setinput] = useState('')
  const me = useSelector((state)=>state.slice.me)

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
    const d = value.map(i => [`${i.year}-${i.month.number}-${i.day}`,`${select}`])
    const obj = Object.fromEntries(d)
    console.log(obj)
  },[value])


  const reserve=async()=>{
    const d = value.map(i => [`${i.year}-${i.month.number}-${i.day}`,`${select}`])
    const obj = Object.fromEntries(d)

    if(freeDask.msg){
      fetch(`${process.env.REACT_APP_BASE_URL}/reserve/reserve-desk/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj)
      })
      .then(res=> res.json()).then(data =>{
        return data.msg === 'done, reserved' ? navigate('/User/ReservationRecords') : ''
      })
      // setshowModal(true)
    }
  }

  function reseipt(){
    if(select == 'single'){
      if(value.length >= 20) return (freeDask.single_price - (freeDask.off20 * 1000)) * value.length
      else if(value.length >= 10) return (freeDask.single_price - (freeDask.off10 * 1000)) * value.length
      else if(value.length == 0) return 0
      else return freeDask.single_price * value.length
    }
    else{
      if(value.length >= 20) return (freeDask.group_price - (freeDask.off20 * 1000)) * value.length
      else if(value.length >= 10) return (freeDask.group_price - (freeDask.off10 * 1000)) * value.length
      else if(value.length == 0) return 0
      else return freeDask.group_price * value.length
    }
  }

  function of(){
    if(value.length >= 20) return (freeDask.off20 * 1000) * value.length
    else if(value.length >= 10) return (freeDask.off10 * 1000) * value.length
    else return 0
  }

return (
<div>
  {/* <PayError/> */}
  {/* <PaySuccess/> */}
  <div dir='rtl' className='px-[6vw] pt-2'>
    <div className="flex justify-between ">
      <div className="">
        <Link to='/'><img className='w-48 h-auto my-8 mx-2' src="./logo3.png" /></Link>
      </div>
      <div dir='ltr' className="mt-8 ">
        {
          me.code ?
          <Link className='btn p-3 px-7 mx-4 bg-[#00294D] text-white' to='/singup1'><button>عضویت/ورود</button> </Link>
          :
          <ProfileIconB/>
        }
      </div>
    </div>
    <div className="flex justify-center mb-[160px] ">
      <div className="">

        <h2 className="title text-right text-2xl px-2 mt-[10vh]">اطلاعات رزرو</h2>
        <div className="card w-[69vw] grid grid-cols-2 py-8 rounded-2xl my-8 ">
          <div className="border-l-2 px-12">
            <div className="border1 w-[89.5%] rounded-lg my-0 ">
              <h6 className='text-border w-[88px] bg-white '>انتخاب صندلی</h6>
              <select className='w-[97%] m-0.5 p-1 bg-transparent' onChange={e => setselect(e.target.value)}>
                <option className=' ' value="single">صندلی اختصاصی</option>
                <option className=' ' value="group">صندلی گروهی</option>
              </select>
            </div>
            <h2 className="text-[#00294D] text-center ml-12 my-4 text-lg bold ">انتخاب تاریخ</h2>
            <div className="flex justify-center">
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

            <div className={freeDask.msg?'hidden':"text-[#EE0000] mt-4 text-sm"}> در تاریخ {freeDask.msg} صندلی خالی وجود ندارد  </div>
          </div>
          {/* 2 */}
          <div className="px-16 w-[33vw] ">
            <h2 className="title mt-[58px] ">فاکتور</h2>
            <div className="flex justify-between m-8 w-[100%] ">
              <div className="">
                <h6 className=""> صندلی {select === 'single'? 'اختصاصی':'گروهی'}</h6>
                <h6 className="my-2">تخفیف</h6>
                <h6 className="">مبلغ قابل پرداخت</h6>
              </div>
              <div className="">
                <h6 className=""> {value.length} عدد</h6>
                <h6 className="my-2">{of()} تومان</h6>
                <h6 className="">{reseipt()} تومان</h6>
              </div>
            </div>

            <div className="bg-[#F0F0F0] p-3 rounded-lg mx-8 ml-4 w-[100%] ">
              <button><img src="./receipt-disscount.png" alt="" className="w-6 ml-3 " /></button>
              <input className="border-r border-[#939393] inline-block px-2 bg-[#F0F0F0] w-[80%] " placeholder='کد تخفیف' value={input} onChange={e => setinput(e.target.value)} />
            </div>
            {
              me.code ?
              <Link to='/singup1'><button className='btn-blue mx-8 text-lg mt-12 mb-24'>تایید و رزرو</button></Link>
              :
              <button onClick={ reserve } className='btn-blue mx-8 text-lg mt-12 mb-24'>تایید و رزرو</button>
            }
          </div>
        </div>
      </div>
    </div>  
    {/* modul */}
    {
      !showModal ? '' :
      <>
        <div onClick={()=> setshowModal(false)} className="backdrop"></div>
        <div className="flex justify-center "><Receipt/></div>
      </>
    }
  </div>
<Footer/>
</div>
)}
export default Reservation