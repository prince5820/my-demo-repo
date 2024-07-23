import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './components/signUp'
import SignIn from './components/signIn'
import { SnackbarProvider } from './components/snackbar'

function App() {

  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  )
}

export default App
