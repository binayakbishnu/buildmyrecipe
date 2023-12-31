import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import LandingPage from './Pages/LandingPage';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import PwdReset from './Components/Auth/PwdReset';

import Homepage from './Pages/Homepage';
import Dashboard from './Components/HomePage/Dashboard';
import NewRecipe from './Components/HomePage/NewRecipe';
import BasicDetails from './Components/HomePage/BasicDetails';
import Ingredients from './Components/HomePage/Ingredients';
import CookingDetails from './Components/HomePage/CookingDetails';
import CookingSteps from './Components/HomePage/CookingSteps';
import AdditionalInfo from './Components/HomePage/AdditionalInfo';
import RecipeSummary from './Components/HomePage/RecipeSummary';

import About from './Pages/About';

function App() {
  const homeComponents = [
    {
      path: "/home",
      component: <Dashboard />,
    },
    {
      path: "newrecipe",
      component: <NewRecipe />,
    },
    {
      path: "basicdetails",
      component: <BasicDetails />,
    },
    {
      path: "ingredients",
      component: <Ingredients />,
    },
    {
      path: "cookingdetails",
      component: <CookingDetails />,
    },
    {
      path: "cookingsteps",
      component: <CookingSteps />,
    },
    {
      path: "additionalinfo",
      component: <AdditionalInfo />,
    },
    {
      path: "recipesummary",
      component: <RecipeSummary />,
    }
  ]
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<PwdReset />} />
          </Route>

          <Route path="/home" element={<Homepage />}>
            {
              homeComponents.map((data, index) => (
                <Route key={index} path={data.path} element={data.component} />
              ))
            }
          </Route>

          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
