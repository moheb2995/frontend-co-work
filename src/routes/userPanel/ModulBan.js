import React from 'react'

const ModulBan = ({setshow}) => {
return (
<div dir='rtl' className=''>
  <div onClick={()=> setshow(false)} className="backdrop"></div>
  <div className="z-40 flex justify-center items-center fixed left-[50vw] right-[50vw] top-[50vh] bottom-[50vh] ">
    <div className="z-40 bg-white rounded-xl p-10 py-8 w-[500px] absolute ">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 bg-[#EE0000] flex justify-center items-center pt-3 rounded-full text-lg"><div className="text-white -mt-1.5">X</div></div>
        <h4 className="mr-2 bold text-lg ">حساب شما به حالت تعلیق در آمده است.</h4>
      </div>
      <hr className='my-5' />
      <h6 className="">کاربر گرامی حساب شما به علت ... به حالت تعلیق در امده است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد  
      </h6>

      <div className="flex justify-center mt-8">
        <h5 className="text-lg font-medium ml-2 ">پشتیبانی:</h5>
        <a className='text-lg font-medium text-[#00294D] ' href=""> example@gmail.com </a>
      </div>
    </div>
  </div>
</div>
)}
export default ModulBan