import classes from "./App.module.css";
import FileStructContext from "./store/filestruct-context.js";
import ActionButtons from "./components/ActionButtons";
import FileStructure from "./components/FileStructure";
import { useState } from "react";

function App() {
  class Node {
    constructor(name, isFolder, level) {
      this.name = name;
      this.isFolder = isFolder;
      this.level = level;
      if (isFolder) {
        this.children = [];
        this.isCollapsed = false;
      }
    }
  }

  class Tree {
    constructor(root) {
      this.root = root;
    }
    addChild(sel, name, isFolder) {
      // if (!sel.isFolder) return;
      const newChild = new Node(name, isFolder, sel.level + 1);
      sel.children.push(newChild);
      return newChild;
    }
    addSibling(sel, name, isFolder) {
      // if (sel === this.root) return;
      const queue = [this.root];
      while (queue.length !== 0) {
        const cur = queue.shift(1);
        cur.children?.forEach((child) => {
          if (child === sel) {
            this.addChild(cur, name, isFolder);
          } else {
            queue.push(child);
          }
        });
      }
    }
    preOrder(node, list) {
      list.push({ ...node, nodeRef: node });
      if (node.isFolder && node.isCollapsed) return;
      node.children?.forEach((child) => {
        this.preOrder(child, list);
      });
    }
    getFlatList() {
      const list = [];
      this.preOrder(this.root, list);
      return list;
    }
    delete(node) {
      if (node === this.root) {
        //cannot delete root folder
        return;
      }
      const queue = [this.root];
      while (queue.length !== 0) {
        const cur = queue.shift(1);
        cur.children?.forEach((child) => {
          if (child === node) {
            const index = cur.children.indexOf(node);
            cur.children.splice(index, 1);
          } else {
            queue.push(child);
          }
        });
      }
    }
  }

  const fileTree = new Tree(new Node("/", true, 0));

  const [treeState, setTreeState] = useState(fileTree);
  const [fileList, setFileList] = useState(treeState.getFlatList());
  const [selected, setSelected] = useState(treeState.root);

  const deleteElement = (node) => {
    const newTree = treeState;
    newTree.delete(node);
    setTreeState(newTree);
    setFileList(newTree.getFlatList());
  };

  const addChild = (node, name, isFolder) => {
    const newTree = treeState;
    newTree.addChild(node, name, isFolder);
    setTreeState(newTree);
    setFileList(newTree.getFlatList());
  };

  const addSibling = (node, name, isFolder) => {
    const newTree = treeState;
    newTree.addSibling(node, name, isFolder);
    setTreeState(newTree);
    setFileList(newTree.getFlatList());
  };

  const collapseOrExpand = (node) => {
    const newTree = treeState;
    node.isCollapsed = !node.isCollapsed;
    setTreeState(newTree);
    setFileList(newTree.getFlatList());
  };

  return (
    <FileStructContext.Provider
      value={{
        fileTree: treeState,
        fileList: fileList,
        selected: selected,
        setSelected: setSelected,
        delete: deleteElement,
        addChild: addChild,
        addSibling: addSibling,
        collapseOrExpand: collapseOrExpand,
      }}
    >
      <div className={classes["main-div"]}>
        <div className={classes["title"]}>&nbsp;FILESTRUCTURE</div>
        <div className={classes["button-div"]}>
          <ActionButtons />
        </div>
        <div className={classes["file-structure"]}>
          <FileStructure />
        </div>
      </div>
      <div className={classes.credits}>Created by Saarisht Thaman</div>
    </FileStructContext.Provider>
  );
}

export default App;
