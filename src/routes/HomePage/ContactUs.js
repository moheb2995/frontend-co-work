import React,{ useEffect, useState } from 'react'

const ContactUs = () => {
  const [data, setdata] = useState({})

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/contact-us/`)
    .then(res=> res.json()).then(data => setdata(data))
  },[])

return (
  <div className="w-[45vw] ">
  <h2 className="title-b">آدرس و دسترسی ها</h2>
  <p className="text-xl borderr p-1 px-4 w-[36vw] my-2 ">{data.address} </p>

  <h4 className="title text-right mt-8 text-2xl ">ساعات دسترسی</h4>
  <img src="./time icon.png" alt="" className="w-5 ml-3 mx-2 -mt-" />
  <div className="inline-block my-3">
    <p className="">{data.work_time} </p>
  </div>

  <h4 className="title text-right mt-6 text-2xl">دسترسی های مکانی</h4>
  <img src="./bus.png" alt="" className="w-5 ml-3 mx-2 " />
  <p className="inline-block my-2">{data.access_ways} </p>
</div>
)}
export default ContactUs