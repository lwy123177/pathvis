import Grid from "./Grid";
import { useContext, useRef } from "react";
import { GridContext } from "../store/GridContext";
import classes from "../util/Util.module.css";
import DFSCode from "../algorithm/DFSCode";
import CreateArray from "../util/CreateArray";
import { GetPosRelation } from "../util/GetPosRelation";

const Dfs = () => {
  const gridContext = useContext(GridContext);
  const speedRef = useRef<HTMLInputElement>(null);
  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const getAnimationDelay = () => 500 - parseInt(speedRef.current!.value);
  const encode = (row: number, col: number) => row + "," + col;
  const search = async () => {
    // Start Searching
    gridContext.setState("Drawing");
    let grid = gridContext.grid;
    let stack: [number, number][] = [];
    let startR = 0,
      startC = 0,
      destR = 0,
      destC = 0;
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === "start") {
          startR = r;
          startC = c;
        }
        if (grid[r][c] === "destination") {
          destR = r;
          destC = c;
        }
      }
    }
    stack.push([startR, startC]);
    const vis = new Set<string>();
    const parent: Record<string, string> = {};
    vis.add(encode(startR, startC));
    let found = false;
    // Init highlight
    gridContext.setHighlightLines(CreateArray(2, 3));
    await delay(1000);
    // Searching highlight
    gridContext.setHighlightLines(CreateArray(4, 12));
    while (!found && stack.length > 0) {
      let popped = stack.pop()!;
      gridContext.markCell(popped[0], popped[1], "current");
      await delay(getAnimationDelay());
      if (popped[0] === destR && popped[1] === destC) {
        found = true;
        break;
      }
      let orders = [0, 1, 2, 3];
      // Shuffle the order
      // for (let i = orders.length - 1; i >= 1; i--) {
      //   let randIdx = Math.floor(Math.random() * i);
      //   let tmp = orders[randIdx];
      //   orders[randIdx] = orders[i];
      //   orders[i] = tmp;
      // }
      for (let i = 0; i < orders.length; i++) {
        let di = orders[i];
        let dr = popped[0] + dirs[di][0],
          dc = popped[1] + dirs[di][1];
        if (
          !gridContext.out(dr, dc) &&
          !vis.has(encode(dr, dc)) &&
          gridContext.grid[dr][dc] !== "obstacle"
        ) {
          vis.add(encode(dr, dc));
          gridContext.markCell(dr, dc, "exploring");
          parent[encode(dr, dc)] = encode(popped[0], popped[1]);
          stack.push([dr, dc]);
        }
      }
      gridContext.markCell(popped[0], popped[1], "visited");
    }
    if (found) {
      let cells: [number, number][] = [];
      let now = encode(destR, destC);
      while (now && parent[now]) {
        let points = now.split(",").map((x) => parseInt(x));
        cells.push([points[0], points[1]]);
        now = parent[now];
      }
      for (let i = cells.length - 1; i >= 1; i--) {
        gridContext.markCell(
          cells[i][0],
          cells[i][1],
          GetPosRelation(cells[i], cells[i - 1])
        );
        await delay(getAnimationDelay());
      }
      gridContext.setHighlightLines([7]);
    } else {
      gridContext.setHighlightLines([14]);
    }
    // Finish Searching
    gridContext.setState("FinishedDrawing");
  };
  return (
    <div className={classes.page}>
      <h2>Depth-first Search (DFS)</h2>
      <Grid search={search} speedRef={speedRef} pseudocode={DFSCode} />
    </div>
  );
};
export default Dfs;
