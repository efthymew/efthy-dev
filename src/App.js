//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import NotFound from './components/NotFound';
import SplashPage from './components/SplashPage';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import Projects from './components/Projects';
import AnimatedBackground from './components/AnimatedBackground';

// wallpapers
/*
import back1 from "./imgs/715670.png";
import back2 from "./imgs/8fe6b53060e19d3d695ed17f39ce3129.jpg";
import back3 from "./imgs/9QnsAKY.jpg";
import back4 from "./imgs/4501512-ilya-kuvshinov-women-with-shades-sunglasses-simple-background.png";
import back5 from "./imgs/4532012-ilya-kuvshinov-women-artwork.png";
import back6 from "./imgs/by-ilya-kuvshinov-ilia-kuvshinov-portret-devushki-rozovyi-fo.jpg";
import back7 from "./imgs/b405fe9b82b64a38db1a4913a7500d8d-700.jpg";
import back8 from "./imgs/ilia-kuvshinov-portret-devushki-profil-dlinnye-volosy-rodink.jpg";
import back9 from "./imgs/ilya-kuvshinov-digital-art-anime-girls-ilya-wallpaper.jpg";
import back10 from "./imgs/ilya-kuvshinov-artwork-female-anime-wallpaper.jpg";
import back11 from "./imgs/Z2jLo93.png";
*/
function App() {
    return (
        <div className="App">
            <Router>
                <AnimatedBackground/>
                <Switch>
                    <Route exact path="/" component={SplashPage} />
                    <Route path="/me" component={AboutMe} />
                    <Route path="/work" component={Work} />
                    <Route path="/projects" component={Projects} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
