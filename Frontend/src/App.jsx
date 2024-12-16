import React from 'react'
import Navbar from './components/ui/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AJobs from './components/admin/AJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'



const appRouter = createBrowserRouter([
  // client side 
  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/signup',
    element: <Signup/>
  },

  {
    path:'/jobs',
    element:<Jobs />
  },

  {
    path:'/description/:id',
    element:<JobDescription/>

  },
  {
    path:'/Browser',
    element:<Browser />
  },
  {
    path:'/profile',
    element:<Profile />
  },
  // admin side 

  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },

  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AJobs /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJobs /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }

],{
  future: {
    v7_skipActionErrorRevalidation: true,
    v7_partialHydration: true,
  }
}
)

function App() {


  return (
   <>

     
    <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
