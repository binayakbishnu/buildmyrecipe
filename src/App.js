import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LandingPage from './Pages/LandingPage';
import Homepage from './Pages/Homepage';
import NewRecipe from './Components/HomePage/NewRecipe';
import BasicDetails from './Components/HomePage/BasicDetails';
import Ingredients from './Components/HomePage/Ingredients';
import CookingDetails from './Components/HomePage/CookingDetails';
import CookingSteps from './Components/HomePage/CookingSteps';
import AdditionalInfo from './Components/HomePage/AdditionalInfo';

function App() {
  const homeComponents = [
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
  ]
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />}>
            {
              homeComponents.map((data, index) => (
                <Route key={index} path={data.path} element={data.component} />
              ))
            }
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
