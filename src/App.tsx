import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './components/signUp'
import SignIn from './components/signIn'
import { SnackbarProvider } from './components/snackbar'
import Dashboard from './components/dashboard'
import BottomNav from './components/bottomNav'

function App() {

  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <BottomNav />
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/forgot-password" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  )
}

export default App
