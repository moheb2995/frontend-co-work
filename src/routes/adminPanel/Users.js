import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import Pagination from '@mui/material/Pagination';

const Users = () => {
  const [update, setupdate] = useState(false)
  const [users, setusers] = useState([])
  const [count, setcount] = useState(1)
  const [input, setinput] = useState('')
  const [filter, setfilter] = useState('')
  const [pagination, setpagination] = useState('1')
  const [obj, setobj] = useState({'page': `${pagination}`, 'per_page': '5', 'startswith': '1'})
  const [show, setshow] = useState(false)
  const [radio, setradio] = useState('')
  const [id, setid] = useState(null)

  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/get-all-users/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    })
    .then(res=> res.json()).then(data =>{setcount(data.page.total); setusers(data.data)})
  },[pagination,update])

  const banUser =async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/ban-user/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({'user': id, 'ending': radio, 'reason':'i like that'}) 
    })
    .then(res=> res.json()).then(data =>console.log('ban',data))
    setupdate(!update);
    setshow(false)
  }

  const unBanUser =async(id)=>{
    console.log('id',id);
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/unban-user/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user: id}) 
    })
    .then(res=> res.json()).then(data =>console.log(data))
    setupdate(!update)
  }

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

return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">کاربران</h1>

  <div className="mt-4">
    <select className='rounded-md bg-[#F6F6F6] p-1.5 text-base ml-4 w-[150px] ' value={filter} onChange={e => setfilter(e.target.value)} >
      <option className='hidden' value=""></option>
      <option className='' value="full_name">نام و نام خانوادگی	</option>
      <option className='' value="national_code">کد ملی	</option>
      <option className='' value="phone_number">شماره همراه	</option>
      <option className='' value="working_category">زمینه فعالیت	</option>
      <option className='' value="ban_status">وضعیت کاربر</option>
    </select>
    <div className={filter == 'working_category'||filter == 'ban_status'? 'hidden':"inline-block rounded-md bg-[#F6F6F6] px-2 w-[150px]"}>
      <input className='input1 m-0.5 text-base ltr' placeholder='' value={input} onChange={e => setinput(e.target.value.slice(0, 11))} />
    </div>
    <select 
    className={filter == 'working_category'||filter == 'ban_status'? 'rounded-md bg-[#F6F6F6] p-1.5 text-base w-[150px]':'hidden'} 
    value={input} onChange={e => setinput(e.target.value)} 
    >
      <option value=""></option>
      <option className={filter == 'working_category'? '':'hidden'} value="UI/UX">UI/UX</option>
      <option className={filter == 'working_category'? '':'hidden'} value="Front-end">Front-end</option>
      <option className={filter == 'working_category'? '':'hidden'} value="Back-end">Back-end</option>
      <option className={filter == 'working_category'? '':'hidden'} value="other">سایر موارد</option>
      <option className={filter == 'ban_status'? '':'hidden'} value="true">مسدود نشده</option>
      <option className={filter == 'ban_status'? '':'hidden'} value="false">مسدود شده</option>
    </select>
    <button className='rounded-md bg-[#F6F6F6] p-1.5 mr-4' onClick={search}><img src="/Icon.png" alt="" className="w-5 m-0.5 -mt-1" /></button>
  </div>

  <div className="flex justify-center mt-10 ">
    <table className='w-[100%] m-auto mt-6 font-medium text-lg '>
      <thead className=''>
        <tr className=' '>
          <th className="thUser"> نام و نام خانوادگی </th>
          <th className="thUser">کد ملی</th>
          <th className="thUser">شماره همراه</th>
          <th className="thUser">زمینه فعالیت</th>
          <th className="thUser">وضعیت کاربر</th>
        </tr>
      </thead>
      <tbody className=''>
        {
          users.map((i,inx)=>
          <tr key={i.phone_number} class={i.ban_status?'opacity-60':''} className={inx%2 === 0 ?'bg-[#F6F6F6] ':''}>
            <td className="tdUser">{i.full_name} </td>
            <td className="tdUser">{i.national_code}</td>
            <td className="tdUser"> {i.phone_number} </td>
            <td className="tdUser"> {i.working_category} </td>
            <td className="tdUser text-[#00294D] underline ">
              {
                i.ban_status?
                <button onClick={()=>unBanUser(i.id)} > رفع مسدودیت </button>
                :
                <button onClick={()=>{setshow(true); setid(i.id)}} > مسدودیت </button>
              }
            </td>
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

  {/* modul */}
  {
    show?
    <>    
      <div onClick={()=> setshow(false)} className="backdrop"></div>
      <div className="z-40 flex justify-center items-center fixed left-[50vw] right-[50vw] top-[50vh] bottom-[50vh] ">
        <div className="z-40 bg-white rounded-xl p-16 py-14 w-[460px] absolute flex flex-col text-lg font-medium ">
          <h4 className="mb-4"> مسدود کردن کاربر به مدت: </h4>
          <div className="mb-4">
            <input className='m-2 w-4 h-4 ' name='radio' value={'1'} onChange={e => setradio(e.target.defaultValue)} type="radio" />
            <h5 className="inline-block ml-4  ">یک روز</h5>
          </div>
          <div className="mb-4">
            <input className='m-2 w-4 h-4 ' name='radio' value={'7'} onChange={e => setradio(e.target.defaultValue)} type="radio" /> 
            <h5 className="inline-block ">یک هفته</h5>
          </div>
          <div className="mb-4">
            <input className='m-2 w-4 h-4 ' name='radio' value={'30'} onChange={e => setradio(e.target.defaultValue)} type="radio" /> 
            <h5 className="inline-block ">یک ماه</h5>
          </div>
          <div className="mb-6">
            <input className='m-2 w-4 h-4 ' name='radio' value={'20000'} onChange={e => setradio(e.target.defaultValue)} type="radio" /> 
            <h5 className="inline-block ">همیشه</h5>
          </div>

          <div className="">
            <button onClick={()=> setshow(false)} className="btn-s text-base font-normal bg-white text-[#00294D] border-[#00294D] border ">لغو</button>
            <button onClick={banUser} className="btn-s text-base font-normal mr-2 ">تایید</button>
          </div>
        </div>
      </div>
    </>: ''
  }
</div>
)}
export default Users