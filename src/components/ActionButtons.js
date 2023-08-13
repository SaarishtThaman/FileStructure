import addFileImage from "../images/icons8-new-file-100.png";
import addFolderImage from "../images/icons8-new-folder-100.png";
import deleteImage from "../images/icons8-delete-100.png";
import classes from "./ActionButtons.module.css";
import { useContext, useState } from "react";
import FileStructContext from "../store/filestruct-context";
import ReactDOM from "react-dom";
import Backdrop from "./modal/Backdrop";
import InputModal from "./modal/InputModal";

const ActionButtons = (props) => {
  const ctx = useContext(FileStructContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const addElement = (name, isFolder) => {
    if (ctx.selected.isFolder) {
      ctx.addChild(ctx.selected, name, isFolder);
      setDisplayModal(false);
    } else {
      ctx.addSibling(ctx.selected, name, isFolder);
      setDisplayModal(false);
    }
  };

  const showModal = (isFolder, isDelete) => {
    if (isDelete) {
      if (ctx.selected === ctx.fileTree.root) {
        alert("Cannot delete root");
      } else {
        ctx.delete(ctx.selected);
      }
      return;
    }
    if (isFolder) {
      setModalProps({
        question: "Enter folder name",
        ok: addElement,
        displayModal: setDisplayModal,
        isFolder: isFolder,
      });
      setDisplayModal(true);
    } else {
      setModalProps({
        question: "Enter file name",
        ok: addElement,
        displayModal: setDisplayModal,
        isFolder: isFolder,
      });
      setDisplayModal(true);
    }
  };

  return (
    <>
      {displayModal &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
      {displayModal &&
        ReactDOM.createPortal(
          <InputModal data={modalProps} />,
          document.getElementById("modal-root")
        )}
      <img
        className={classes.image}
        src={addFileImage}
        alt="Add File"
        onClick={() => showModal(false, false)}
      />
      <img
        className={classes.image}
        src={addFolderImage}
        alt="Add Folder"
        onClick={() => showModal(true, false)}
      />
      <img
        className={classes.image}
        src={deleteImage}
        alt="Delete"
        onClick={() => showModal(true, true)}
      />
    </>
  );
};

export default ActionButtons;
