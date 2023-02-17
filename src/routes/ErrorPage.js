import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './HomePage/Footer'

const ErrorPage = () => {
return (
<div className="w-[100Vw]">
  <div dir='rtl' className='px-[6vw] pt-4 mb-[300px] mb:mb-[30vh] '>
    <Link to='/'><img className='h-16 mt-[4vh] ' src="./logo3.png" /></Link>

    <div className="mx-[6vw] flex justify-between my-[25vh] gap-32 mb:grid mb:text-center ">
    <div className="mb:flex mb:justify-center "><img src="/freepik--Warning--inject-7.png" alt="" className="w-[60vw] hidden mb:inline-block " /></div>
      
      <div className="">
        <h1 className="title text-start text-4xl bold mb:text-center ">خطای 404</h1>
        <header className="my-10 mt-6 text-xl font-semibold  "> صفحه ای که شما به دنبال آن هستید وجود ندارد!لطفا آدرس وارد شده را چک کنید و دوباره سعی کنید. </header>
        <Link to='/'><button className='btn-s w-max px-8'>برگشت به صفحه اصلی</button></Link>
      </div>
      <img src="/freepik--Warning--inject-7.png" alt="" className="w-[25vw] mb:hidden " />
    </div>
  </div>
  <Footer/>
</div>
)}
export default ErrorPage