import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'

const Cards = () => {
  const [card1, setcard1] = useState({
    title:'',
    description:'',
    li1:'',
    li2:'',
    li3:'',
  })
  const [card2, setcard2] = useState({
    title:'',
    description:'',
    li1:'',
    li2:'',
    li3:'',
  })
  const handleOnChenge1= e => setcard1({...card1, [e.target.name]: e.target.value})
  const handleOnChenge2= e => setcard2({...card2, [e.target.name]: e.target.value})
  const cookie = new Cookies()
  const token = cookie.get('ut')

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/card/`)
    .then(res=> res.json()).then(data =>{setcard1(data[0]); setcard2(data[1])})
  },[])

  const save=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/card/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({card1,card2})
    })
    .then(res=> res.json()).then(data =>console.log('msg:',data))
  }

return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">کارت های رزرو</h1>
  <Link to='/admin/Site'><button className="text-4xl absolute top-12 left-16 ">{">"}</button></Link>

  <div className="grid grid-cols-2 mx-32 gap-40 mt-12">
    <div className="">
      <h4 className="my-4 mb-7 text-xl bold">کارت 1</h4>
      <h5 className="my-4 bold">عنوان</h5>
      <input name='title' value={card1.title} onChange={handleOnChenge1} className='bg-[#F6F6F6] p-1 w-56 rounded-lg ' />

      <h5 className="my-4 bold">توضیح کوتاه</h5>
      <textarea name='description' value={card1.description} onChange={handleOnChenge1} className='bg-[#F6F6F6] w-56 h-14 rounded-lg ' />
      <div className="">
        <h5 className="my-4 bold">ویژگی ها </h5>
        <div className="flex">
          <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
          <input name='li1' value={card1.li1} onChange={handleOnChenge1} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
        </div>
        <div className="flex my-4">
          <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
          <input name='li2' value={card1.li2} onChange={handleOnChenge1} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
        </div>
        <div className="flex">
          <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
          <input name='li3' value={card1.li3} onChange={handleOnChenge1} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
        </div>
      </div>
{/* 2 */}
    </div>
      <div className="">
        <h4 className="my-4 text-xl bold mb-7">کارت 2</h4>
        <h5 className="my-4 bold">عنوان</h5>
        <input name='title' value={card2.title} onChange={handleOnChenge2} className='bg-[#F6F6F6] w-56 p-1 rounded-lg ' />

        <h5 className="my-4 bold">توضیح کوتاه</h5>
        <textarea name='description' value={card2.description} onChange={handleOnChenge2} className='bg-[#F6F6F6] w-56 h-14 rounded-lg ' />
        <div className="">
          <h5 className="my-4 bold">ویژگی ها </h5>
          <div className="flex">
            <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
            <input name='li1' value={card2.li1} onChange={handleOnChenge2} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
          </div>
          <div className="flex my-4">
            <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
            <input name='li2' value={card2.li2} onChange={handleOnChenge2} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
          </div>
          <div className="flex">
            <div className="w-4 h-4 bg-[#0593CE] rounded-md mt-2 ml-4 "></div>
            <input name='li3' value={card2.li3} onChange={handleOnChenge2} className='bg-[#F6F6F6] p-1 px-1.5 rounded-lg ' />
          </div>
        </div>
      </div>
  </div>
  <div className="flex justify-end "><button onClick={save} className='btn-s mt-10 mr-7 '>ذخیره</button></div>
</div>
)}
export default Cards