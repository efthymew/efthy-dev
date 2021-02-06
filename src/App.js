//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NotFound from './components/NotFound';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/me" component={Home} />
                    <Route path="/work" component={Home} />
                    <Route path="/projects" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
