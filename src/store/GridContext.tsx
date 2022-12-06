import React, { useCallback, useEffect, useState } from "react";

const isMobile = window.innerWidth <= 800;
const h = isMobile ? 13 : 30;
const w = isMobile ? 13 : 30;

export type State =
  | "Start"
  | "Destination"
  | "Obstacle"
  | "Drawing"
  | "FinishedDrawing";

type GridContextObj = {
  grid: string[][];
  markCell: (row: number, col: number, val: string) => boolean;
  state: State;
  setState: (state: State) => void;
  out: (row: number, col: number) => boolean;
  highlightLines: number[];
  setHighlightLines: (lines: number[]) => void;
};

let startGrid: string[][] = [];
for (let i = 0; i < h; i++) {
  let row: string[] = [];
  for (let j = 0; j < w; j++) {
    row.push("empty");
  }
  startGrid.push(row);
}

export const GridContext = React.createContext<GridContextObj>({
  grid: startGrid,
  markCell: (row: number, col: number, val: string) => true,
  state: "Start",
  setState: (state: State) => {},
  out: (row: number, col: number) => true,
  highlightLines: [],
  setHighlightLines: (lines: number[]) => {},
});

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [grid, setGrid] = useState<string[][]>(startGrid);
  const [state, setState] = useState<State>("Start");
  const [obstacles, setObstacles] = useState<[number, number][]>([]);
  const [highlightLines, setHighlightLines] = useState<number[]>([]);
  const out = useCallback(
    (row: number, col: number) => {
      return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length;
    },
    [grid]
  );
  const markCell = useCallback(
    (row: number, col: number, val: string) => {
      if (
        out(row, col) ||
        (grid[row][col] !== "obstacle" && grid[row][col] !== "empty") ||
        (grid[row][col] === "obstacle" && val !== "empty")
      )
        return false;
      setGrid((prevState) => {
        let cloneGrid: string[][] = [];
        for (let i = 0; i < prevState.length; i++) {
          cloneGrid.push([...prevState[i]]);
        }
        cloneGrid[row][col] = val;
        return cloneGrid;
      });
      if (val === "obstacle") {
        setObstacles((prevState) => [...prevState, [row, col]]);
      }
      return true;
    },
    [grid, out]
  );
  const undo = useCallback(() => {
    if (state !== "Obstacle" || obstacles.length === 0) return;
    let popped = obstacles[obstacles.length - 1]!;
    markCell(popped[0], popped[1], "empty");
    setObstacles((prevState) => prevState.slice(0, -1));
  }, [markCell, obstacles, state]);
  const contextValue = {
    grid: grid,
    markCell: markCell,
    state: state,
    setState: setState,
    out: out,
    highlightLines: highlightLines,
    setHighlightLines: setHighlightLines,
  };
  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      let isCtrlKey = event.ctrlKey || event.metaKey;
      let isZ = key.toLowerCase() === "z";
      if (isCtrlKey && isZ) {
        undo();
        event.preventDefault();
      }
    },
    [undo]
  );
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [obstacles, state, keyDownHandler]);

  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};
