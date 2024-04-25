import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import AddNew from './components/add';
import Home from './components/home';
import Update from './components/update';

function App() {
  return (
   <>
   <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='/create' element={<AddNew />} />
    <Route path='/update/:id' element= {<Update/>}/>
   </Routes> 
   </>
  );
}

export default App;
