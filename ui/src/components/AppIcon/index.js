import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/fontawesome-free-regular";

fontawesome.library.add(faFolder);

const AppIcon = (props) => {
  const { type } = props;

  const getIcon = () => {
    let icon = "";

    if (type === "Project") {
      icon = (
        <FontAwesomeIcon icon={["far", "folder"]} style={{ color: "#33c" }} />
      );
    } else if (type === "State") {
      icon = (
        <FontAwesomeIcon icon={["far", "folder"]} style={{ color: "#33c" }} />
      );
    } else if (type === "Folder") {
      icon = (
        <FontAwesomeIcon icon={["far", "folder"]} style={{ color: "#33c" }} />
      );
    }

    return icon;
  };

  return getIcon();
};

export default AppIcon;
