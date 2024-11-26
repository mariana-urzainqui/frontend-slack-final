import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  ForgotPassword,
  Home,
  Login,
  NewWorkspace,
  Register,
  ResetPassword,
  VerifyEmail,
  WorkspaceDetail
} from './Pages'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify/:verification_token' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:reset_token' element={<ResetPassword />} />
      <Route path='/home' element={<Home />} />
      <Route path='/workspace/new' element={<NewWorkspace />} />
      <Route path='/workspace/:id_workspace/:id_canal' element={<WorkspaceDetail />} />
    </Routes>
  )
}

export default App
