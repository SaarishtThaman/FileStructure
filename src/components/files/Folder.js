import expandImage from "../../images/icons8-expand-arrow-100.png";
import collpaseImage from "../../images/icons8-collapse-arrow-100.png";
import classes from "./File.module.css";
import { useContext } from "react";
import FileStructContext from "../../store/filestruct-context";

const Folder = (props) => {
  const ctx = useContext(FileStructContext);
  const isSelected = props.nodeRef === ctx.selected;
  const space = <>&nbsp;&nbsp;</>;
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
      <img
        className={classes.image}
        src={props.nodeRef.isCollapsed ? collpaseImage : expandImage}
        onClick={() => ctx.collapseOrExpand(props.nodeRef)}
      />
      &nbsp;
      {props.name}
    </div>
  );
};

export default Folder;
