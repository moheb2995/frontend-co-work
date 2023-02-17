import React,{ useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';

const TableReceipts = ({token,date,setdate}) => {
  const [pagination, setpagination] = useState(1)
  const [count, setcount] = useState(1)
  const [receipts, setreceipts] = useState([])
  const [all_income, setall_income] = useState(null)
  const [start, setstart] = useState('1401-1-1')
  const [update, setupdate] = useState(false)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/finance/get-income/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'page': `${pagination}`,
        'per_page': '4',
        'startswith': '1',
        'end': date,
        start,
      })
    })
    .then(res=> res.json()).then(data =>{ setcount(data.page.total); setall_income(data.all_income.price__sum); setreceipts(data.data) })
  },[pagination,update])
  useEffect(()=> setupdate(!update), [])

return (
<>
  <div className="bg-[#F6F6F6] rounded-lg mb-8 mt-6 p-1 px-4 inline-block">
    <div className="text-[#00294D] text-lg font-medium inline-block border-l-2 pl-4">تاریخ شروع</div>
    <input placeholder='yyyy-mm-dd' value={start} onChange={e => setstart(e.target.value)} className="input1 w-32 ltr" />
  </div>
  <div className="bg-[#F6F6F6] rounded-lg mb-8 mt-6 p-1 px-4 inline-block mx-3">
    <div className="text-[#00294D] text-lg font-medium inline-block border-l-2 pl-4">تاریخ پایان</div>
    <input placeholder='yyyy-mm-dd' value={date} onChange={e => setdate(e.target.value)} className="input1 w-32 ltr" />
  </div>
  <button className='rounded-md bg-[#F6F6F6] p-3.5 ' onClick={()=> setupdate(!update)} ><img src="/Icon.png" alt="" className="w-5 m-0.5 -mt-1" /></button>


  <div className="flex justify-between ">
    <div className="">
      <div className="flex justify-center w-[42vw] xl:w-[48vw] 2xl:w-[50vw] ">
        <table className='w-[100%] mx-auto font-medium text-lg '>
          <thead className=''>
            <tr className=' '>
              <th className="thUser"> نام و نام خانوادگی </th>
              <th className="thUser">نوع صندلی</th>
              <th className="thUser">تاریخ پرداخت</th>
              <th className="thUser">تعداد</th>
              <th className="thUser">قیمت</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              receipts.map((i,inx)=>             
              <tr key={inx} className={inx%2 === 0 ?'bg-[#F6F6F6] ':''}>
                <td className="tdUser">{i.full_name} </td>
                <td className="tdUser">{i.is_group? ' گروهی':'  اختصاصی' }</td>
                <td className="tdUser text-[#00294D] ">{i.order_time}</td>
                <td className="tdUser"> {i.desk_count} </td>
                <td className="tdUser"> {i.price} </td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div dir='ltr' className="flex justify-center m-10 mb-10 ">
        <Pagination count={count} variant="outlined" shape="rounded" value={pagination} onChange={(_, newVal)=>setpagination(newVal)} />
      </div>
    </div>

    <div className="mt-0">
      <div className="bg-[#F6F6F6] rounded-lg p-4 py-8 flex justify-between w-[22.5vw] ">
        <div className="">
          <h3 className="text-[#4B4B4B] text-lg ">میانگین درآمد </h3>
          <h4 className="text-lg text-[#999999] mt-1 ">{all_income}</h4>
        </div>
        <img src="/walletmoney.png" alt="" className="bg-[#00294D] p-4 w-16 rounded-full " />
      </div>
      <div className="bg-[#F6F6F6] rounded-lg p-4 py-8 flex justify-between w-[22.5vw] my-8 ">
        <div className="">
          <h3 className="text-[#4B4B4B] text-lg ">رزرو های امروز</h3>
          <h4 className="text-lg text-[#999999] mt-1 ">6465</h4>
        </div>
        <img src="/ticket-1.png" alt="" className="bg-[#00294D] p-4 w-16 rounded-full " />
      </div>
    </div>
  </div>
</>
)}
export default TableReceipts