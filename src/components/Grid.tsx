import classes from "./Grid.module.css";
import utils from "../util/Util.module.css";
import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../store/GridContext";
import GridInstruction from "./GridInstruction";
import CodeBlock from "./CodeBlock";
import GridLabel from "./GridLabel";

const Grid: React.FC<{
  search: () => void;
  speedRef: React.RefObject<HTMLInputElement>;
  pseudocode: string;
}> = (props) => {
  const gridContext = useContext(GridContext);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(0);
  const [milliSecond, setMilliSecond] = useState<number>(0);
  const display = (sec: number) => (sec >= 10 ? "" + sec : "0" + sec);
  const secondToDisplay = display(second);
  const milliSecondToDisplay = display(milliSecond);
  const handleDrawAgain = () => {
    for (let r = 0; r < gridContext.grid.length; r++) {
      for (let c = 0; c < gridContext.grid[0].length; c++) {
        if (
          gridContext.grid[r][c] === "visited" ||
          gridContext.grid[r][c] === "exploring" ||
          gridContext.grid[r][c].startsWith("path")
        ) {
          gridContext.grid[r][c] = "empty";
        }
      }
    }
    gridContext.setState("Drawing");
    props.search();
  };
  const handleRestart = () => {
    for (let r = 0; r < gridContext.grid.length; r++) {
      for (let c = 0; c < gridContext.grid[0].length; c++) {
        gridContext.grid[r][c] = "empty";
      }
    }
    gridContext.setState("Start");
  };
  const cellClickHandler = (row: number, col: number) => {
    let success = gridContext.markCell(
      row,
      col,
      gridContext.state.toLowerCase()
    );
    if (success) {
      if (gridContext.state === "Start") {
        gridContext.setState("Destination");
      } else if (gridContext.state === "Destination") {
        gridContext.setState("Obstacle");
      }
    }
  };
  const cellOverHandler = (row: number, col: number) => {
    if (gridContext.state !== "Obstacle" || !isMouseDown) return;
    gridContext.markCell(row, col, gridContext.state.toLowerCase());
  };
  const cellDownHandler = (row: number, col: number) => {
    if (gridContext.state !== "Obstacle") return;
    gridContext.markCell(row, col, gridContext.state.toLowerCase());
  };
  useEffect(() => {
    if (gridContext.state !== "Drawing") return;
    const startDrawingTime = new Date().getTime();
    setSecond(0);
    setMilliSecond(0);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const milliSecondsPassed = now - startDrawingTime;
      const secondsPassed = Math.floor(milliSecondsPassed / 1000);
      let mil = milliSecondsPassed - secondsPassed * 1000;
      while (mil >= 100) mil /= 10;
      mil = Math.floor(mil);
      setSecond(secondsPassed);
      setMilliSecond(mil);
    }, 200);
    return () => clearInterval(interval);
  }, [gridContext.state]);
  return (
    <div>
      <div className={classes["label-row"]}>
        <div className={gridContext.state === "Drawing" ? utils.blink : ""}>
          Animation Speed{" "}
          <input
            type="range"
            min="1"
            max="499"
            defaultValue={"499"}
            ref={props.speedRef}
          />
        </div>
        <div className={classes.time}>
          Time Elapsed:{" "}
          <label>
            <label>{secondToDisplay}</label>.
            <label>{milliSecondToDisplay}</label>
          </label>{" "}
          seconds
        </div>
      </div>
      <div className={classes["label-row"]}>
        <GridLabel name={"Empty"} />
        <GridLabel name={"Start"} />
        <GridLabel name={"Destination"} />
        <GridLabel name={"Obstacle"} />
        <GridLabel name={"Current"} />
        <GridLabel name={"Visited"} />
        <GridLabel name={"Exploring"} />
      </div>
      <GridInstruction
        search={props.search}
        handleDrawAgain={handleDrawAgain}
        handleRestart={handleRestart}
      />
      <div className={classes["flex-container"]}>
        <div
          className={`${classes["div-table"]}`}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
        >
          {gridContext.grid.map((row, rowIndex) => (
            <div key={"row_" + rowIndex} className={classes["div-table-row"]}>
              {row.map((cell, colIndex) => (
                <div
                  key={"cell_" + rowIndex + "," + colIndex}
                  className={`${classes["div-table-col"]} ${
                    classes[cell.startsWith("path") ? "path" : cell]
                  } ${
                    cell.startsWith("path") &&
                    gridContext.state === "FinishedDrawing"
                      ? classes["bump-path"]
                      : ""
                  }`}
                  onClick={() => cellClickHandler(rowIndex, colIndex)}
                  onMouseOver={() => cellOverHandler(rowIndex, colIndex)}
                  onMouseDown={() => cellDownHandler(rowIndex, colIndex)}
                >
                  {cell.startsWith("path") && (
                    <i
                      className={`${classes.arrow} ${
                        classes[cell.split("-")[1]]
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <CodeBlock value={props.pseudocode} />
        </div>
      </div>
    </div>
  );
};
export default Grid;
