import React from "react";
import db from "../../db/getFolders2.json";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/fontawesome-free-solid";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

fontawesome.library.add(faMinus, faPlus);

class TreeMenu extends React.Component {
  state = {
    checked: [],
    expanded: ["Leyes"],
    treeData: [],
    nodes: [],
    setShowContent: null,
  };

  constructor(props) {
    super(props);
    console.log(this);
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.state.treeData = props.nodes;
    this.state.nodes = [db];
    /*
    this.state.nodes = [
      {
        value: "p1",
        label: "Brown Jordan Fabrics Project",
        children: [
          {
            value: "1",
            label: "Draft (0)",
            icon: <i className="far fa-file-archive icon-color" />,
          },
          {
            value: "2",
            label: "In Review (1)",
            icon: <i className="far fa-file-pdf icon-color" />,
            children: [
              {
                value: "A4",
                label: (
                  <a href="#" onClick={() => props.setShowContent(true)}>
                    Fabrics (6)
                  </a>
                ),
                icon: <i className="far fa-file-archive icon-color" />,
                children: [
                  {
                    value: "A14",
                    label: "Suncloth (4)",
                    icon: <i className="far fa-file-archive icon-color" />,
                  },
                  {
                    value: "A15",
                    label: "Flexslings (2)",
                    icon: <i className="far fa-file-pdf icon-color" />,
                  },
                ],
              },
            ],
          },
          {
            value: "3",
            label: "Resolved (0)",
            icon: <i className="far fa-file-alt icon-color" />,
          },
        ],
      },
    ];
    */

    console.log(JSON.stringify(this.state.nodes));

    this.state.setShowContent = props.setShowContent;
  }

  onCheck(checked) {
    console.log(checked);
    this.setState({ checked });
  }

  onExpand(expanded) {
    this.setState({ expanded });
  }

  onTreeData(treeData) {
    this.setState(treeData);
  }

  render() {
    const { checked, expanded, treeData, nodes, setShowContent } = this.state;

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
        onCheck={this.onCheck}
        onExpand={this.onExpand}
      />
    );
  }
}

export default TreeMenu;
