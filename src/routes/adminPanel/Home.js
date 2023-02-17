import React,{ useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import TableReceipts from './TableReceipts'
import TableReserve from './TableReserve'

const Home = () => {
  const cookie = new Cookies()
  const token = cookie.get('ut')
  const [todayReserve, settodayReserve] = useState([])
  const [paginationReserve, setpaginationReserve] = useState(1)
  const [countReserve, setcountReserve] = useState(1)
  const [date, setdate] = useState()

  useEffect(()=>{
    const y = new Date().getUTCFullYear()
    const m = new Date().getMonth() + 1
    const d = new Date().getDate()
    gregorian_to_jalali(y,m,d)
  },[])

  useEffect(()=>{
    if(date){
      fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/get-reservations/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'page': `${paginationReserve}`,
          'per_page': '5',
          'startswith': '1',
          'reservation_time': `${date}`,
        })
      })
      .then(res=> res.json()).then(data =>{setcountReserve(data.page.total); console.log(data); settodayReserve(data.data)})
    }
    
  },[paginationReserve,date])
  
  function gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    setdate(`${jy}-${jm}-${jd}`)
  }
  
return (
<div dir='rtl' className='w-[87vw]'>
  <h1 className="hAdmin ">خانه</h1>

  <div className="flex justify-between mt-12 ">
    <h2 className="title text-right ">رزرو شده ها</h2>
  </div>
  <TableReserve records={todayReserve} count={countReserve} pagination={paginationReserve} setpagination={setpaginationReserve} />
  
  <TableReceipts token={token} date={date} setdate={setdate} />
  </div>
)}
export default Home