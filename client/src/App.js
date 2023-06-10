import Home from './pages/Home.js'
import Authentication from './pages/Authentication.js'
import CreateRecipes from './pages/CreateRecipes.js'
import SavedRecipes from './pages/SavedRecipes.js'

import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/auth' exact element={<Authentication/>}/>
            <Route path='/create-recipes' exact element={<CreateRecipes/>}/>
            <Route path='/saved-recipes' exact element={<SavedRecipes/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
