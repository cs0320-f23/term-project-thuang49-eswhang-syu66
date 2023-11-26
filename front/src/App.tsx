
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import {
	CSSTransition,
	TransitionGroup
} from 'react-transition-group';


function App() {
	return (
            <Router basename="/app">
              <Routes>
                <Route path="/"> <HomePage/> </Route> {/* 👈 Renders at /app/ */}
              </Routes>
            </Router>
          );
}

export default App;