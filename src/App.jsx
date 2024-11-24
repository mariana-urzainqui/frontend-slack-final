import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, NewWorkspace, WorkspaceDetail } from './Pages'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/workspace/new' element={<NewWorkspace />} />
      <Route path='/workspace/:id_workspace/:id_canal' element={<WorkspaceDetail />} />
    </Routes>
  )
}

export default App
