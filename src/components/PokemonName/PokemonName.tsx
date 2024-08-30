import { Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

// Props
interface Props extends WithStyles<typeof styles> {
  name: string;
  id?: number;
}

// State
interface S {}

class PokemonName extends Component<Props, S> {
  render() {
    const { id, name, classes } = this.props;

    return (
      <Grid container justifyContent="center" spacing={2}>
        <Typography align="right" className={classes.name} component="h1">
          {name}
        </Typography>
        &nbsp;&nbsp;&nbsp;
        <Typography align="left" className={classes.id} component="h1">
          #{id}
        </Typography>
      </Grid>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    name: {
      textTransform: "capitalize",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    id: { fontSize: "1.5rem", fontWeight: "lighter", color: "#616161" },
  });

export default withStyles(styles)(PokemonName);
