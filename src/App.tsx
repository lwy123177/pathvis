import { Route, Routes } from "react-router-dom";
import Bfs from "./components/Bfs";
import Dfs from "./components/Dfs";
import AStar from "./components/AStar";
import LandPage from "./components/LandPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/pathvis" element={<LandPage />} />
        <Route path="/pathvis/bfs" element={<Bfs />} />
        <Route path="/pathvis/dfs" element={<Dfs />} />
        <Route path="/pathvis/astar" element={<AStar />} />
      </Routes>
    </>
  );
};

export default App;
