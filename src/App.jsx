import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, NewWorkspace, Register, VerifyEmail, WorkspaceDetail } from './Pages'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/verify/:verification_token' element={<VerifyEmail/>}/>
      <Route path='/home' element={<Home />} />
      <Route path='/workspace/new' element={<NewWorkspace />} />
      <Route path='/workspace/:id_workspace/:id_canal' element={<WorkspaceDetail />} />
    </Routes>
  )
}

export default App
