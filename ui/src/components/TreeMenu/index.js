import React, { useState, useEffect } from "react";
import db from "../../db/getFolders2.json";
import db3 from "../../db/getFolders3.json";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/fontawesome-free-solid";
import AppIcon from "../AppIcon";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

fontawesome.library.add(faMinus, faPlus);

const TreeMenu = () => {
  const [nodes, setNodes] = useState([db]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const onCheck = (checked) => {
    setChecked(checked);
  };

  const onExpand = (expanded) => {
    setExpanded(expanded);
  };

  const getChildrenTree = (children) => {
    const childrenTree = children?.map((child, i) => {
      const { id, name, type, number_of_reviews, children } = child;
      let childChildren = [];
      childChildren = getChildrenTree(children);
      return {
        value: `${type.toLowerCase()}-${name
          .replaceAll(" ", "-")
          .toLowerCase()}-${id}`,
        label: `${name} (${number_of_reviews})`,

        icon: <AppIcon type={type} />,
        children: childChildren,
      };
    });
    return childrenTree;
  };

  useEffect(() => {
    const data3 = [db3];
    const myNodes = data3.map((node, i) => {
      const { id, name, type, children } = node;
      let parentChildren = getChildrenTree(children);
      return {
        value: `${type.toLowerCase()}-${name
          .replaceAll(" ", "-")
          .toLowerCase()}-${id}`,
        label: name,
        children: parentChildren,
      };
    });
    console.log(myNodes);
    setNodes(myNodes);
  }, []);

  return (
    <CheckboxTree
      checked={checked}
      expanded={expanded}
      icons={{
        check: <span className="rct-icon rct-icon-check" />,
        uncheck: <span className="rct-icon rct-icon-uncheck" />,
        halfCheck: <span className="rct-icon rct-icon-half-check" />,
        /*
        check: "",
        uncheck: "",
        halfCheck: "",
        */
        expandClose: (
          <FontAwesomeIcon
            className="rct-icon rct-icon-expand-close"
            icon="plus"
          />
        ),
        expandOpen: (
          <FontAwesomeIcon
            className="rct-icon rct-icon-expand-close"
            icon="minus"
          />
        ),
        expandAll: <span className="rct-icon rct-icon-expand-all" />,
        collapseAll: (
          <span className="rct-icon rct-icon-collapse-all icon-color" />
        ),
        parentClose: (
          <span className="rct-icon rct-icon-parent-close icon-color" />
        ),
        parentOpen: (
          <span className="rct-icon rct-icon-parent-open icon-color" />
        ),
        leaf: <span className="rct-icon rct-icon-leaf" />,
      }}
      iconsClass="fa5"
      nodes={nodes}
      onCheck={(checked) => onCheck(checked)}
      onExpand={(expanded) => onExpand(expanded)}
    />
  );
};

export default TreeMenu;
