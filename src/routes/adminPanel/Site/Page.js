import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'

const Page = () => {
  const [img, setimg] = useState(null)
  const [images, setimages] = useState([])
  const [myimg, setmyimg] = useState({ 1: {id:null}, 2: {id:null}, 3: {id:null}, 4: {id:null} })
  const [update, setupdate] = useState(false)
  const [updateimg, setupdateimg] = useState(false)

  const cookie = new Cookies()
  const token = cookie.get('ut')
  const obj = { show: false }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/image/`)
    .then(res=> res.json()).then(data =>setimages(data.map(i => Object.assign(i,obj))))

    // fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/selected-images/`)
    // .then(res=> res.json()).then(data =>setmyimg(data))
  },[updateimg])
  
  console.log(myimg)
  // console.log(images);
  
  const uploadImg =async()=>{
    if (!img) return alert('عکس انتخاب کن !!!')
    const formData = new FormData()
    formData.append('img', img)
    
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/image/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
    .then(res=> res.json()).then(data =>{console.log('msg:',data)})
    setimg(null); setupdateimg(!updateimg)
  }

  const delImg =async(id)=>{
    console.log(id)
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/delete-image/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({id:`${id}`})
    })
    .then(res=> res.json()).then(data =>{setupdateimg(!updateimg)})
  }

  const postMyImg =async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/selected-images/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        1:`${myimg[1].id}`,
        2:`${myimg[2].id}`,
        3:`${myimg[3].id}`,
        4:`${myimg[4].id}`
      })
    })
    .then(res=> res.json()).then(data =>{console.log('msg:',data)})
  }

return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">صفحه اصلی</h1>
  <Link to='/admin/Site'><button className="text-4xl absolute top-12 left-16 ">{">"}</button></Link>
  
  <div className="flex justify-between mt-10 ">
    <div className="">
      <input onChange={e =>{setimg(e.target.files[0])}} accept="image/*" type="file" id="actual-btn" hidden/>
      <label className='border-2 border-[#00294D] text-[#00294D] text-lg px-4 p-1.5 rounded-lg font-medium' htmlFor="actual-btn" >انتخاب فایل</label>
      <button className='border-2 border-[#00294D] text-[#00294D] text-lg px-4 p-1.5 rounded-lg font-medium mx-4' onClick={uploadImg}>آپلود</button>
    </div>
    <div className="flex justify-end "><button onClick={postMyImg} className='btn-s'>ذخیره</button></div>
  </div>

  <div className="lg:columns-4 sm:columns-2	my-10 "> 
  {
    images.map(i => 
    <figure className="bg-[#F6F6F6] p-6 mb-4 grid grid-cols-1 break-inside-avoid ">
      <img src={i.img} alt="" className="w-full rounded-2xl bg-[#8A8A8A] " />
      <figcaption className='figcaption justify-self-end rounded-br-sm bg-[#ffffff80] h-min'>
        <button onClick={()=>{ i.show = !i.show; setimages(images); setupdate(!update)}}><img src="/menu.png" alt="" className="w-5" /></button>
      </figcaption>
      {
        i.show? 
        <div className="bg-[#f2f2f2] opacity-70 absolute mt-[30.5px] figcaption justify-self-end text-xs p-1 rounded-r ">
          <button onClick={()=>{ myimg[1].id = i.id; setmyimg(myimg) }} className="m-1">عکس هدر</button><hr />
          <button onClick={()=>{ myimg[2].id = i.id; setmyimg(myimg) }} className="m-1">عکس معرفی</button><hr />
          <button onClick={()=>{ myimg[3].id = i.id; setmyimg(myimg) }} className="m-1">عکس 1</button><hr />
          <button onClick={()=>{ myimg[4].id = i.id; setmyimg(myimg) }} className="m-1">عکس 2</button><hr />
          <button onClick={()=> delImg(i.id) } className="m-1 text-red-500 font-medium ">حذف</button>
        </div>
        :''
      } 
    </figure>)
  }
  </div>
</div>
)}
export default Page