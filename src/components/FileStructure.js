import { useContext } from "react";
import FileStructContext from "../store/filestruct-context";
import File from "./files/File";
import Folder from "./files/Folder";

const FileStructure = (props) => {
  const ctx = useContext(FileStructContext);
  return (
    <>
      {ctx.fileList.map((file, index) => {
        if (file.isFolder === true) {
          return (
            <Folder
              key={file.name + index}
              name={file.name}
              level={file.level}
              nodeRef={file.nodeRef}
            />
          );
        }
        return (
          <File
            key={file.name + index}
            name={file.name}
            level={file.level}
            nodeRef={file.nodeRef}
          />
        );
      })}
    </>
  );
};

export default FileStructure;
