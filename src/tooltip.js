import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const styles = {
  tooltip: {
    width: "92px",
    height: "36px",
    borderRadius: "18px",
    boxShadow: "0 20px 80px 0",
    backgroundColor: "red",
  },
};

const CustomTooltip = withStyles(styles)(Tooltip);

function MyCustomTooltip() {
  return (
    <CustomTooltip title="Tooltip">
      <Button>Custom Tooltip</Button>
    </CustomTooltip>
  );
}

export default MyCustomTooltip;
