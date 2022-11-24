import './App.css';
import WriteBoard from './component/WriteBoard';
import DetailBoard from './component/DetailBoard';
import ListBoard from './component/ListBoard';
import ModifyBoard from './component/ModifyBoard';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<ListBoard/>}/>
        <Route exact path='/write' element={<WriteBoard/>}/>
        <Route exact path='/detail/:id' element={<DetailBoard/>}/>
        <Route exact path='/modify/:id' element={<ModifyBoard/>}/>
      </Routes>

  );
}

export default App;
