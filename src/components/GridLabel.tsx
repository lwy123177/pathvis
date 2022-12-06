import { useContext } from "react";
import { GridContext } from "../store/GridContext";
import classes from "./Grid.module.css";
const GridLabel: React.FC<{ name: string }> = (props) => {
  const gridContext = useContext(GridContext);
  return (
    <div
      className={
        props.name.toLowerCase() === gridContext.state.toLowerCase()
          ? classes.bump
          : ""
      }
    >
      <div
        className={`${classes["div-table-col"]} 
        ${classes[props.name.toLowerCase()]}
        `}
      />
      <label className={classes["label-col"]}>{props.name}</label>
    </div>
  );
};
export default GridLabel;
