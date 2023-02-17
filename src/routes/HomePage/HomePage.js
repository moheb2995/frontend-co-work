import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import ProfileIcon from '../userPanel/ProfileIconB'
import Footer from './Footer';
import Cards from './Cards';
import ContactUs from './ContactUs';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const HomePage = () => {
  const [myimg, setmyimg] = useState({ 1:'', 2:'', 3:'', 4:'' })
  const [loading, setloading] = useState(true)
  
  const me = useSelector((state)=>state.slice.me)
  console.log(myimg[3].url)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/selected-images/`)
    .then(res=> res.json()).then(data =>{ setmyimg(data); setloading(false)})
  },[])

if(loading){ 
  return <div className="w-screen flex justify-center items-center h-screen ">
    <img src="/Group 62.png" alt="" className="h-20 " />
    <img src="/logo.png" alt="loading" className="animate-spin-slow " />
  </div> 
}

return (
<div className="">
  <div dir='rtl' className='px-[6vw] pt-4'>
    <div className='flex gap-[6vw] '>
      <div className="w-[41vw] px-4 ">
        <div className="">
          <img className='mt-11 w-48 h-auto ' src="./logo3.png" />
        </div>

        <img src="/Group 62.png" alt="" className="w-[30.3vw] mt-[200px] " />

        <p className="mt-[4vw] text-2xl h-20 border-t-4 border-[#E8F3FC] ml-10 py-5 ">ما کنارتون هستیم تا یه جای حرفه‌ای و صمیمانه رو برای انجام فعالیت‌هاتون پیدا کنید</p>

        <h2 className="title-b 32vh mt-[21.3vw] mr-10">خدمات و سرویس ها</h2>
        <p className="w-[28vw] my-1 text-xl borderr mr-10">ما در مکین همواره کوشیده ایم امکانات کاملی در اختیار افراد مستقرقرار دهیم تا بهترین تجربه را از فضای کار اشتراکی به دست بیاورند</p>
      </div>
      
      {/* 2 */}

      <div className="w-[41vw] ">
        { 
          me.code ?
          <Link className='mt-[200px] flex justify-end' to='/singup1'><button className='btn mx-6 text-white w-[140px] bg-[#00294D] '>عضویت/ورود</button></Link>
          :
          <div className="mt-[50px] flex justify-end mx-6"><ProfileIcon/></div>
        }
        <div className="mt-20 ">
          <img className='absolute -z-20 ' src="/Group 30.png" alt="" />
          <img className='bg-slate-300 -z-10 w-[33vw] h-[44vw] mr-20 absolute rounded-tr-[145px] ' src={myimg[1].url} alt="" />
        </div>
        <Cards/>
      </div>
    </div>

    <div className="flex justify-between mt-[180px] items-center mx-14 ">
      <img className="bg-slate-300 w-[30vw] h-[22.5vw] rounded-2xl rounded-bl-[90px] " src={myimg[2].url}/>

      <div className="flex justify-center ml-2 ">
          <div className="w-[34vw] ">
            <h2 className="title-b ">معرفی فضای کار اشتراکی </h2>
            <p className="borderr text-xl">در فضای کار اشتراکی مکین علاوه بر محلی برای استقرار، فرصت بهره‌مندی از مشاوره، هم‌افزایی، اشتراک دانش و انتقال تجربه، خدمات جانبی و هر آنچه از یک فضای کاری پویا انتظار دارید، فراهم شده است.</p>
          </div>
        </div>
    </div>

    <h2 className="title text-3xl mb-14 mt-24">فرصت های محیط کار اشتراکی</h2>
    <div className="flex justify-between mx-4 px-[4vw]">
      <div className="bg-[#E8F3FC] text-center w-[21vw] p-9 rounded-3xl">
        <img src="./Group (1)1.png" alt="" className="icon " />
        <h4 className="bold text-lg text-[#055BA6] my-2 ">اینترنت</h4>
        <p className="text-sm text-[#292D32]">شما در این محیط میتوانید به اینترنت متصل باشید و نیاز های خود را برطرف کنید.</p>
      </div>
      <div className="bg-[#E8F3FC] text-center w-[21vw] p-9 rounded-3xl">
        <img src="./Vector5.png" alt="" className="icon" />
        <h4 className="bold text-lg text-[#055BA6] my-2 ">فضای تخصصی</h4>
        <p className="text-sm text-[#292D32]">حضور برنامه نویس ها و دیزاینر ها در این محیط میتواند علاوه بر محیط کار فردی، زمینه های رشد تخصصی جمعی را فراهم سازد.</p>
      </div>
      <div className="bg-[#E8F3FC] text-center w-[21vw] p-9 rounded-3xl">
        <img src="./Group1.png" alt="" className="icon" />
        <h4 className="bold text-lg text-[#055BA6] my-2 ">کمد اختصاصی</h4>
        <p className="text-sm text-[#292D32]">شما با رزرو محیط اشتراکی میتوانید از لاکر (کمد اختصاصی) در طی روز بهره مند شوید.</p>
      </div>
    </div>

    <div className="flex justify-center my-32 px-[4vw] gap-2">
      <img src={myimg[3].url} alt="" className="square rounded-tl-[130px] " />
      <img src={myimg[4].url} alt="" className="square rounded-br-[130px] " />
    </div>

  
    <div className="flex mb-[145px] ">
      <ContactUs/>

      <div className="w-[850px] h-[400px] z-30 bg-slate-700">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{lat:35.7349094,lng:51.5004767}}
          defaultZoom={19}
          yesIWantToUseGoogleMapApiInternals
          >
          <AnyReactComponent
            lat={35.7349600}
            lng={51.5004767}
            text= {<h1><img className="marker" src="/icons8-place-marker-64.png" alt="marker" /></h1>}
          />
        </GoogleMapReact> 
      </div>
    </div>
  </div>
  <Footer/>
</div>
)}
export default HomePage