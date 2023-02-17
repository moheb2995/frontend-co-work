import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import TableReserve from './TableReserve'

const Reserved = () => {
  const [records, setrecords] = useState([])
  const [count, setcount] = useState(1)
  const [pagination, setpagination] = useState('1')
  const [input, setinput] = useState('')
  const [filter, setfilter] = useState('')
  const [obj, setobj] = useState({'page': `${pagination}`, 'per_page': '5', 'startswith': '1'})
  const [update, setupdate] = useState(false)
  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/get-reservations/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    })
    .then(res=> res.json()).then(data =>{setcount(data.page.total); setrecords(data.data)})

  },[pagination,update])

  function search(){
    const page ={
      'page': '1',
      'per_page': '5',
      'startswith': '1',
    }
    const arr = [[filter, input]]
    const search = Object.fromEntries(arr)

    setobj(Object.assign(page, search))
    setupdate(!update)
  }

  console.log(records);
return (
<div dir='rtl' className='w-[87%]'>
  <h1 className="hAdmin my-5"> رزرو شده ها </h1>

  <div className="mt-4">
    <select className='rounded-md bg-[#F6F6F6] p-1.5 text-base ml-4 w-[150px] ' value={filter} onChange={e => setfilter(e.target.value)} >
      <option className='hidden' value=""></option>
      <option className='' value="full_name">نام و نام خانوادگی	</option>
      <option className='' value="working_category">زمینه فعالیت	</option>
      <option className='' value="phone_number">شماره همراه	</option>
      <option className='' value="is_group">نوع صندلی	</option>
      <option className='' value="reservation_time">تاریخ رزرو</option>
    </select>
    <div className={filter == 'working_category'||filter == 'ban_status'? 'hidden':"inline-block rounded-md bg-[#F6F6F6] px-2 w-[150px]"}>
      <input className='input1 m-0.5 text-base ltr' value={input} onChange={e => setinput(e.target.value.slice(0, 11))} />
    </div>
    <select 
    className={filter == 'working_category'? 'rounded-md bg-[#F6F6F6] p-1.5 text-base w-[150px]':'hidden'} 
    value={input} onChange={e => setinput(e.target.value)} 
    >
      <option value=""></option>
      <option className={filter == 'working_category'? '':'hidden'} value="UI/UX">UI/UX</option>
      <option className={filter == 'working_category'? '':'hidden'} value="Front-end">Front-end</option>
      <option className={filter == 'working_category'? '':'hidden'} value="Back-end">Back-end</option>
      <option className={filter == 'working_category'? '':'hidden'} value="other">سایر موارد</option>
      <option className={filter == 'is_group'? '':'hidden'} value="true">مسدود نشده</option>
      <option className={filter == 'is_group'? '':'hidden'} value="false">مسدود شده</option>
    </select>
    <button className='rounded-md bg-[#F6F6F6] p-1.5 mr-4' onClick={search}><img src="/Icon.png" alt="" className="w-5 m-0.5 -mt-1" /></button>
  </div>
  <TableReserve records={records} count={count} pagination={pagination} setpagination={setpagination} obj={obj} setobj={setobj}/>
</div>
)}
export default Reserved