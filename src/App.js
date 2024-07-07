import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import SignInForm from './pages/Signin';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignInForm />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
