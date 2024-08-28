import { Typography } from "@material-ui/core";
import React, { Component } from "react";

// Props
interface Props {
  error: string | null | unknown;
}

// State
interface S {}

export default class Error extends Component<Props, S> {
  render() {
    const { error } = this.props;
    return (
      <Typography className="error-message" align="center">
        {error}
      </Typography>
    );
  }
}
