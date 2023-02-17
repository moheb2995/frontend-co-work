import React,{ useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'

const SeatManagement = () => {
  const cookie = new Cookies()
  const token = cookie.get('ut')
  const [allDask, setallDask] = useState({groups:[],singles:[]})
  const [update, setupdate] = useState(false)
  const [input, setinput] = useState({
    priceS:'',
    priceG:'',
    discountS:'',
    discountG:'',
    dateS:'',
    dateG:'',
    codeS:'',
    codeG:'',
    amountS:'',
    amountG:'',
  })
  const handleOnChenge= e => setinput({...input, [e.target.name]: e.target.value})
  console.log(allDask);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/reserve/get-desks/`)
    .then(res=> res.json()).then(data => {
      setallDask(data);
      input.priceS = data.singles[0].price
      input.priceG = data.groups[0].price
      setinput(input)
    })
  },[])
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/reserve/get-desks/`)
    .then(res=> res.json()).then(data => {
      setallDask(data);
      input.priceS = data.singles[0].price
      input.priceG = data.groups[0].price
      setinput(input)
    })
  },[update])

  const createGroupDesk=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/create-desk/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "id": allDask.singles.length + allDask.groups.length + 1,
        "active": true,
        "price": 25000,
        'type': 'group',
      })
    })
    .then(res=> res.json()).then(data =>{console.log(data); setupdate(!update)})
  }

  const createSingleDesk=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/create-desk/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "id": allDask.singles.length + allDask.groups.length + 1,
        "active": true,
        "price": 25000,
        'type': 'single',
      })
    })
    .then(res=> res.json()).then(data =>{console.log(data); setupdate(!update)})
  }

  const deleteDeskS=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/delete-desks/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({'singles':'1','groups':'0'})
    })
    .then(res=> res.json()).then(data =>{console.log(data); setupdate(!update)})
  }

  const deleteDeskG=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/delete-desks/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({'groups':'1','singles':'0'})
    })
    .then(res=> res.json()).then(data =>{console.log(data); setupdate(!update)})
  }

  const chengePrice=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/change-alldesks-price/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "single_price": input.priceS,
        "group_price": input.priceG
      })
    })
    .then(res=> res.json()).then(data =>console.log(data))
  }

return (
<div dir='rtl' className="w-[87%]">
  <h1 className="hAdmin ">صندلی</h1>
  <Link to='/admin/Site'><button className="text-4xl absolute top-12 left-16 ">{">"}</button></Link>

  <div className="grid grid-cols-2 mt-14 w-[800px] bg-yellow- gap-14 mx-12">
    <div className="w-[270px] ">
      <div className="flex items-center justify-between">
        <h2 className="text-[#00294D] text-xl font-medium inline-block ml-7">صندلی گروهی</h2>
        <button onClick={createGroupDesk} className='rounded-full bg-[#00294D] w-8 h-8 '><div className='text-white text-xl mt-1'>+</div></button>
        <span className='mx-1.5 text-xl font-medium text-[#00294D] '>{allDask.groups.length}</span>
        <button onClick={deleteDeskG} className='rounded-full bg-[#00294D] w-8 h-8 '><div className='text-white text-3xl'>-</div></button>
      </div>

      <div className="mt-14">
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">قیمت روزانه</h5>
          <input className="input2 w-[270px] " type='number' name='priceS' value={input.priceS} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">کد تخفیف</h5>
          <input className="input2 w-[270px] " name='codeS' value={input.codeS} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">میزان تخفیف</h5>
          <input className="input2 w-[270px] " name='amountS' value={input.amountS} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">تاریخ اتقضا</h5>
          <input className="input2 w-[270px] " name='dateS' value={input.dateS} onChange={handleOnChenge} />
        </div>
      </div>
    </div>
    <div className="w-[270px] ">
      <div className="flex items-center justify-between">
        <h2 className="text-[#00294D] text-xl font-medium inline-block ml-5 ">صندلی اختصاصی</h2>
        <button onClick={createSingleDesk} className='rounded-full bg-[#00294D] w-8 h-8 '><div className='text-white text-xl mt-1'>+</div></button>
        <span className='mx-1.5 text-xl font-medium text-[#00294D] '>{allDask.singles.length}</span>
        <button onClick={deleteDeskS} className='rounded-full bg-[#00294D] w-8 h-8 '><div className='text-white text-3xl'>-</div></button>
      </div>

      <div className="mt-14 ">
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">قیمت روزانه</h5>
          <input className="input2 w-[270px] " type='number' name='priceG' value={input.priceG} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">کد تخفیف</h5>
          <input className="input2 w-[270px] " name='codeG' value={input.codeG} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">میزان تخفیف</h5>
          <input className="input2 w-[270px] " name='amountG' value={input.amountG} onChange={handleOnChenge} />
        </div>
        <div className="">
          <h5 className="text-lg my-2 text-[#00294D]">تاریخ اتقضا</h5>
          <input className="input2 w-[270px] " name='dateG'  value={input.dateG} onChange={handleOnChenge} />
        </div>
      </div>
    </div>
  </div>
  <div className="flex justify-end "><button onClick={chengePrice} className='btn-s mt-10 mr-7 '>ذخیره</button></div>

  <div className="flex justify-start mt-10 w-[750px] ">
    <table className='w-[100%] m-auto mt-6 font-medium text-lg '>
      <thead className=''>
        <tr className=' '>
          <th className="thUser"> کد تخفیف</th>
          <th className="thUser">میزان تخفیف</th>
          <th className="thUser">تاریخ اتقضا</th>
          <th className="thUser"><button className='text-lg font-medium text-[#00294D] '>حذف همه</button></th>
        </tr>
      </thead>
      <tbody className='h-[55vh '>
        {
          // records.map((i,inx)=>             
          // <tr className={inx%2 === 0 ?'bg-[#F6F6F6] ':''}>
          //   <td className="tdUser">{} </td>
          //   <td className="tdUser text-[#00294D] ">{} </td>
          //   <td className="tdUser text-[#00294D] ">{} </td>
            // <td className="tdUser text-lg font-medium text-[#00294D] underline ">حذف</td>
          // </tr>
          // )
        }
      </tbody>
    </table>
  </div>
</div>
)}
export default SeatManagement