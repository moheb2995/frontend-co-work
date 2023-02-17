import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/card/`)
    .then(res=> res.json()).then(data =>{setcard1(data[0]); setcard2(data[1])})
  },[])

return (
<div className="flex mt-[37.5vw] gap-[3vw]  ">
  <div className="bg-[#F6F6F6] rounded-2xl w-[16vw] px-8 py-6 hover:-mt-7 delay-75 duration-700 ">
    <div className="flex justify-center m-4">
      <img src="./Group.png" className="w-[7.4vw] h-[7.4vw] bg-gradient-to-tr from-[#0593CE] to-[#a9cfef] px-[2.5vw] py-[1.5vw] m-auto rounded-2xl" alt="" />
    </div>
    <h4 className="title mt-2 mb-3 text-lg "> {card1.title}  </h4>
    <p className="text-sm my-4">{card1.description} </p>
    <ul className='text-sm '>
      <li className='m-2'>{card1.li1}</li>
      <li className='m-2'>{card1.li2}</li>
      <li className='m-2'>{card1.li3}</li>
    </ul>
    <Link to='/Reservation'><button className='w-[100%] mt-4 rounded-xl bg-[#00294D] text-white p-2 '>مشاهده و رزرو</button></Link>
  </div>
  
  <div className="bg-[#F6F6F6] rounded-2xl w-[16vw] px-8 py-6 hover:-mt-7 delay-75 duration-700 ">
    <div className="flex justify-center m-4">
      <img src="./Vector3.png" className="w-[7.4vw] h-[7.4vw] bg-gradient-to-tr from-[#0593CE] to-[#a9cfef] py-[2.5vw] px-[1.75vw] m-auto rounded-2xl" alt=""/>
    </div>
    <h4 className="title mt-2 mb-3 text-lg "> {card2.title}  </h4>
    <p className="text-sm my-4">{card2.description} </p>
    <ul className='text-sm '>
      <li className='m-2'>{card2.li1}</li>
      <li className='m-2'>{card2.li2}</li>
      <li className='m-2'>{card2.li3}</li>
    </ul>
    <Link to='/Reservation'><button className='w-[100%] mt-4 rounded-xl bg-[#00294D] text-white p-2 '>مشاهده و رزرو</button></Link>
  </div>
</div>
)}
export default Cards