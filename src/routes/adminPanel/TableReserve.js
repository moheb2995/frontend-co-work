import React from 'react'
import Pagination from '@mui/material/Pagination';

const TableReserve = ({pagination, setpagination, count, records, obj, setobj}) => {
return (
<>
<div className="flex justify-center mt-2 ">
    <table className='w-[100%] m-auto mt-6 font-medium text-lg '>
      <thead className=''>
        <tr className=' '>
          <th className="thUser"> نام و نام خانوادگی </th>
          <th className="thUser">زمینه فعالیت</th>
          <th className="thUser">شماره همراه</th>
          <th className="thUser">نوع صندلی</th>
          <th className="thUser">قیمت</th>
          <th className="thUser">تاریخ پرداخت</th>
          <th className="thUser">تاریخ رزرو</th>
        </tr>
      </thead>
      <tbody className=''>
        {
          records.map((i,inx)=>             
          <tr key={inx} className={inx%2 === 0 ?'bg-[#F6F6F6] ':''}>
            <td className="tdUser">{i.full_name} </td>
            <td className="tdUser text-[#00294D] ">{i.working_category} </td>
            <td className="tdUser text-[#00294D] ">{i.phone_number} </td>
            <td className="tdUser">{i.is_group? ' گروهی':'  اختصاصی' }</td>
            <td className="tdUser"> {i.price} </td>
            <td className="tdUser text-[#00294D] ">{i.order_time}</td>
            <td className="tdUser text-[#00294D] ">{i.reservation_time}</td>
          </tr>
          )
        }
      </tbody>
    </table>
  </div>
  <div dir='ltr' className="flex justify-center m-10 mb-10 ">
    <Pagination count={count} variant="outlined" shape="rounded" value={pagination} 
    onChange={(_, newVal)=>{setpagination(newVal); obj.page = newVal; setobj(obj) }} />
  </div>
</>
)}
export default TableReserve