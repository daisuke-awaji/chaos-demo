import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import React from 'react';

class Cell extends React.Component {

  mouseOver() {
  }
  mouseOut() {
  }
  // this.props.instance.State.Name === "terminated" ? classes.card : classes.disableCard
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip title={
          this.props.instance ?
            this.props.instance.tagValue + " " + this.props.instance.instanceId + " " + this.props.instance.state :
            ""}
        >
          <div
            className={(() => {
              if (this.props.instance) {
                if (this.props.instance.state === "running") {
                  // オレンジ
                  return classes.card;
                } else if (this.props.instance.state === "pending") {
                  // 薄オレンジ
                  return classes.pendingCard;
                } else if (this.props.instance.state === "shutting-down") {
                  return classes.shuttingDownCard;
                } else {
                  // グレー
                  return classes.disableCard;
                }
              } else {
                // オレンジ
                return classes.card
              }
            })()}
            onMouseOver={() => this.mouseOver()}
            onMouseOut={() => this.mouseOut()}
          >
          </div>
        </Tooltip>
      </div>
    )
  }
};

const styles = {
  card: {
    width: 40,
    height: 40,
    maxWidth: 40,
    maxHeight: 40,
    border: "medium solid #ffa144",
    borderRadius: 5,
    objectFit: "cover",
    backgroundColor: "#ffa144",
    boxShadow: "0 3px 6px #ccc"
  },
  disableCard: {
    width: 40,
    height: 40,
    maxWidth: 40,
    maxHeight: 40,
    border: "medium solid #ccc9c7",
    borderRadius: 5,
    objectFit: "cover",
    backgroundColor: "#ccc9c7",
    boxShadow: "0 3px 6px #ccc"
  },
  pendingCard: {
    width: 40,
    height: 40,
    maxWidth: 40,
    maxHeight: 40,
    border: "medium solid #e0b08d",
    borderRadius: 5,
    objectFit: "cover",
    backgroundColor: "#e0b08d",
    boxShadow: "0 3px 6px #ccc"
  },
  shuttingDownCard: {
    width: 40,
    height: 40,
    maxWidth: 40,
    maxHeight: 40,
    border: "medium solid #ff1414",
    borderRadius: 5,
    objectFit: "cover",
    backgroundColor: "#ff1414",
    boxShadow: "0 3px 6px #ccc"
  },
  description: {
    fontSize: 14,
  }
}

export default withStyles(styles)(Cell);
