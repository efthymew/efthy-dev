//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
