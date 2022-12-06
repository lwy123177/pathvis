import classes from "./CodeBlock.module.css";
import { GridContext } from "../store/GridContext";
import { useContext } from "react";
const CodeBlock: React.FC<{ value: string }> = (props) => {
  const gridContext = useContext(GridContext);
  const highlighted = new Set<number>();
  for (let i = 0; i < gridContext.highlightLines.length; i++) {
    highlighted.add(gridContext.highlightLines[i]);
  }
  const lines = props.value.split("\n");
  const isMobile = window.innerWidth <= 800;
  const twoSpaces = /\s\s/gi;
  const shrinkIdentation = (input: string) => input.replaceAll(twoSpaces, " ");

  let result = "";
  for (let i = 0, lineNo = 1; i < lines.length; i++) {
    if (lines[i].trim().length === 0) continue;
    let line = `<span class=${classes["line-no"]}>${lineNo}</span>` + lines[i];
    if (isMobile) {
      line = shrinkIdentation(shrinkIdentation(line));
    }
    if (highlighted.has(lineNo)) {
      line = `<span class=${classes["high-light"]}>${line}</span>`;
    }
    result += line + "\n";
    lineNo++;
  }
  const keywords = [
    "if",
    "while",
    "return",
    "else",
    "function",
    "for",
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
  ];
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    result = result.replaceAll(
      keyword,
      `<span class=${classes["keyword"]}>${keyword}</span>`
    );
  }
  return (
    <pre
      className={classes["code-block"]}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
};
export default CodeBlock;
