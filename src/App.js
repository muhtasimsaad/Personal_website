import { Route,Routes } from "react-router";
import { Facepage } from "./components/facepage";
import { Sudoku } from "./components/sudoku";


function App() {
  return (
    <Routes>
      <Route element={ <Facepage />} path='/'/>
      <Route element={ <Sudoku />} path='/projects/sudoku'/>
     </Routes>
  );
}

export default App;
 