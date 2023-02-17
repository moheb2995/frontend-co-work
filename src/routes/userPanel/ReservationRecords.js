import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileIcon from './ProfileIconB'
import { Cookies } from 'react-cookie'
import Pagination from '@mui/material/Pagination';
import ModulBan from './ModulBan';

const ReservationRecords = () => {
  const [records, setrecords] = useState([])
  const [count, setcount] = useState(1)
  const [pagination, setpagination] = useState('1')
  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/reserve/my-reservations/`,{
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
    .then(res=> res.json()).then(data =>{setcount(data.page.total); setrecords(data.data)})
  },[pagination])

return (
<div className='w-[76%] '>
  <div dir='rtl' className="flex justify-between px-12 py-8">
    <h1 className="title">سوابق رزرو</h1>
    <ProfileIcon/>
  </div>
  {/* <ModulBan/> */}

  <div className="flex justify-center mt-2 ">
    <div className="px-10 shadow-2xl w-[72%] rounded-2xl ">
      <table className='w-[100%] m-auto mt-6 '>
        <thead className=''>
          <tr className='border-b border-[#B0B0B0] p-4 m-4 '>
            <th className="thUser">تاریخ رزرو</th>
            <th className="thUser">نوع درخواست</th>
            <th className="thUser">قیمت رزرو</th>
            <th className="thUser">زمان ثبت</th>
          </tr>
        </thead>
        <div className={records.length === 0?"grid text-center fixed left-[37vw] mt-32 ":'hidden'}>
          <img className='w-[3.5vw] m-auto ' src="/Vector1.png" alt="icon" />
          <p className="my-6">سوابق رزرو شما خالی است</p>
          <Link to='/Reservation'><button className='btn-s m-2'>رزرو صندلی</button></Link>
        </div>
        <tbody className='h-[55vh]'>
          {
            records.map((i,inx)=>             
            <tr className={inx === records.length -1 ?'':'border-b border-[#B0B0B0] '}>
              <td className={i.is_passed ?"tdUser opacity-60":"tdUser"}>{i.reservation_time} </td>
              <td className={i.is_passed ?"tdUser opacity-60":"tdUser"}>{i.is_group? 'صندلی گروهی':' صندلی اختصاصی' }</td>
              <td className={i.is_passed ?"tdUser opacity-60":"tdUser"}> {i.price} </td>
              <td className={i.is_passed ?"tdUser opacity-60":"tdUser"}>{i.order_time}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  </div>
  <div className="flex justify-center m-8 ">
    <Pagination count={count} variant="outlined" shape="rounded" value={pagination} onChange={(_, newVal)=>setpagination(newVal)} />
  </div>
</div>
)}
export default ReservationRecords