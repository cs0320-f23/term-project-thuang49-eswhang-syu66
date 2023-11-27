
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {ParamsPage} from './pages/ParamsPage';


function App() {
	return (
    <Router basename="">
      <Routes>
        <Route path="/params" element = {<ParamsPage></ParamsPage>}/> 
        <Route path="/" element = {<HomePage></HomePage>}/> 
      </Routes>
    </Router>
          );
}

export default App;