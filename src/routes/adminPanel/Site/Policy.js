import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Cookies } from 'react-cookie'

const Policy = () => {
  const [value, setValue] = useState('');
  const cookie = new Cookies()
  const token = cookie.get('ut')

  const modules = {
    toolbar: [
      [{ 'header': [1,2,3,4,5,6, false] }, {'size': [1, "small", "large",'huge']},],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'], //,'code-block'
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
      ['link', 'image'], //, 'video'
      // [{ 'script': 'sub'}, { 'script': 'super' }],  
      [{ 'direction': 'rtl' }],                         
      [{ 'color': ['#00294D','#4B4B4B','#000'] },{ 'background': [] } ], //
    ],
  }
  const formats = [
    "header","font","size","bold","italic","underline","align",
    "strike","script","blockquote","list","bullet","indent",
    "link","image","color","code-block",'background'
  ]

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/policy/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res=> res.json()).then(data =>setValue(data.text))
  },[])

  const save=async()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/admin-panel/policy/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({'text': value})
    })
    .then(res=> res.json()).then(data =>{console.log('msg:',data)})
  }

return (
<div dir='rtl' className='w-[87%] '>
  <h1 className="hAdmin ">قوانین و مقررات</h1>
  <Link to='/admin/Site'><button className="text-4xl top-12 left-16 absolute ">{">"}</button></Link>
  <div className="mt-10">
    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
  </div>
  <div className="flex justify-end "><button onClick={save} className='btn-s mt-10 mr-7 '>ذخیره</button></div>

</div>
)}
export default Policy