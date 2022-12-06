const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const paths = ["path-right", "path-down", "path-up", "path-left"];
export const GetPosRelation = (
  current: [number, number],
  next: [number, number]
) => {
  for (let i = 0; i < 4; i++) {
    let dr = current[0] + dirs[i][0],
      dc = current[1] + dirs[i][1];
    if (dr === next[0] && dc === next[1]) {
      return paths[i];
    }
  }
  return "";
};