import { Button } from "@mui/material";
import classes from "./Grid.module.css";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";
const GridInstruction: React.FC<{
  handleDrawAgain: () => void;
  handleRestart: () => void;
  search: () => void;
}> = (props) => {
  const gridContext = useContext(GridContext);
  const state = gridContext.state;
  if (state === "Start") return <h5>Please select a starting position</h5>;
  if (state === "Destination") return <h5>Please select a destination</h5>;
  if (state === "Obstacle")
    return (
      <div className={classes["label-row"]}>
        <h5>
          Please select obstacle(s){" "}
          <label className={classes.hint}>(Ctrl-Z to undo)</label>
        </h5>
        <Button variant="outlined" onClick={props.search}>
          Draw!
        </Button>
      </div>
    );
  if (state === "Drawing") {
    return <h5>Finding the path...</h5>;
  }
  if (state === "FinishedDrawing")
    return (
      <div className={classes["label-row"]}>
        <h5>Done:</h5>
        <Button variant="outlined" onClick={props.handleDrawAgain}>
          Draw Again
        </Button>
        <Button variant="outlined" onClick={props.handleRestart}>
          Restart
        </Button>
      </div>
    );
  return <div></div>;
};
export default GridInstruction;
