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
        <Route path="/" element={<LandPage />} />
        <Route path="/bfs" element={<Bfs />} />
        <Route path="/dfs" element={<Dfs />} />
        <Route path="/astar" element={<AStar />} />
      </Routes>
    </>
  );
};

export default App;
