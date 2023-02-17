import React, { useEffect } from 'react'
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { setme } from './Redux/slice'

import HomePage from './routes/HomePage/HomePage';
import SingUp1 from './routes/singUp/In/SingUp1';
import SingUp2 from './routes/singUp/In/SingUp2';
import SingUp3 from './routes/singUp/In/SingUp3';
import LoginNumber from './routes/singUp/In/LoginNumber';
import LoginPassword from './routes/singUp/In/LoginPassword';
import FPasswordNum from './routes/singUp/In/FPasswordNum';
import FPasswordCode from './routes/singUp/In/FPasswordCode';
import FPasswordChenge from './routes/singUp/In/FPasswordChenge';
import NavUser from './routes/userPanel/NavUser';
import Profile from './routes/userPanel/Profile';
import ReservationRecords from './routes/userPanel/ReservationRecords';
import Reservation from './routes/HomePage/Reservation';
import Receipt from './routes/HomePage/Receipt';
import Site from './routes/adminPanel/Site';
import Reserved from './routes/adminPanel/Reserved';
import Home from './routes/adminPanel/Home';
import Users from './routes/adminPanel/Users';
import NavAdmin from './routes/adminPanel/NavAdmin';
import Page from './routes/adminPanel/Site/Page';
import Cards from './routes/adminPanel/Site/Cards';
import ContactUs from './routes/adminPanel/Site/ContactUs';
import SeatManagement from './routes/adminPanel/Site/SeatManagement';
import Adminreservation from './routes/adminPanel/Adminreservation';
import Policy from './routes/adminPanel/Site/Policy'
import ErrorPage from './routes/ErrorPage'

const App = () => {
  const cookie = new Cookies()
  const token = cookie.get('ut')
  const dispatch = useDispatch()

  const router = createBrowserRouter([
    {
      path: '*',
      element: <ErrorPage/>
    },    
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/singup1",
      element: <SingUp1/>
    },
    {
      path: "/singup2",
      element: <SingUp2/>
    },
    {
      path: "/singup3",
      element: <SingUp3/>
    },
    {
      path: "/LoginNumber",
      element: <LoginNumber/>
    },
    {
      path: "/LoginPassword",
      element: <LoginPassword/>
    },
    {
      path: "/FPasswordNum",
      element: <FPasswordNum/>
    },
    {
      path: "/FPasswordCode",
      element: <FPasswordCode/>
    },
    {
      path: "/FPasswordChenge",
      element: <FPasswordChenge/>
    },
    {
      path: "/User",
      element: <NavUser/>,
      children:[
        {
          path: "/User/Profile",
          element: <Profile/>
        },
        {
          path: "/User/ReservationRecords",
          element: <ReservationRecords/>
        }
      ],
    },
    {
      path: "/Reservation",
      element: <Reservation/>
    },
    {
      path: "/Receipt",
      element: <Receipt/>
    },
    {
      path: "/admin",
      element: <NavAdmin/>,
      children:[
        {
          path: "/admin/Home",
          element: <Home/>
        },
        {
          path: "/admin/Users",
          element: <Users/>
        },
        {
          path: "/admin/Reserved",
          element: <Reserved/>
        },
        {    
          path: "/admin/Site",
          element: <Site/>,
        },
        {    
          path: "/admin/Adminreservation",
          element: <Adminreservation/>,
        },
        {
          path: "/admin/Site/Page",
          element: <Page/>
        },
        {
          path: "/admin/Site/Cards",
          element: <Cards/>
        },
        {
          path: "/admin/Site/ContactUs",
          element: <ContactUs/>
        },
        {
          path: "/admin/Site/Policy",
          element: <Policy/>
        },    
        {
          path: "/admin/Site/SeatManagement",
          element: <SeatManagement/>
        },
      ]
    },
  ])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/accounting/who-am-i/`
    ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res=> res.json()).then(data => dispatch(setme(data)) )
  },[token])

  return (
  <div>
    <RouterProvider router={router}/>
  </div>
)}
export default App