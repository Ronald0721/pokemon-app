import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Props
interface Props {
  onBack: Function;
}

// State
interface S {
  sampleStateNumber: number;
}

export default class BackBtn extends Component<Props, S> {
  render() {
    const { onBack } = this.props;
    return <ArrowBackIcon onClick={() => onBack()} />;
  }
}
