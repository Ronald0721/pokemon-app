import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Props
interface Props {
  onBack: Function;
}

// State
interface S {}

class BackBtn extends Component<Props, S> {
  render() {
    const { onBack } = this.props;
    return (
      <ArrowBackIcon
        data-testid="back-btn"
        style={{ marginTop: "8px" }}
        onClick={() => onBack()}
      />
    );
  }
}

export default BackBtn;
