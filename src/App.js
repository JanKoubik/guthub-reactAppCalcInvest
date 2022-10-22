import './App.css';
import Calculator from './Calculator';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">

      <Router>

      <Navbar />

        <Switch>

          <Route exact path={"/GitHub-investCalculator/"}>
            <Calculator />
          </Route>

          <Route exact path={"/"}>
            <Calculator />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
