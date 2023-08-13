import { useContext } from "react";
import FileStructContext from "../../store/filestruct-context";
import classes from "./File.module.css";

const File = (props) => {
  const ctx = useContext(FileStructContext);
  const isSelected = props.nodeRef === ctx.selected;
  const space = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
  let spaceJsx = [];
  for (let i = 0; i < props.level; i++) {
    spaceJsx.push(space);
  }
  return (
    <div
      className={isSelected ? classes["file-selected"] : classes.file}
      onClick={() => ctx.setSelected(props.nodeRef)}
    >
      {spaceJsx.map((space) => {
        {
          return space;
        }
      })}
      {props.name}
    </div>
  );
};

export default File;
