import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { PokemonTypeChip } from "../index";
import { PokemonDetails } from "../../types/pokemonTypes";
import getPokemonTypeColor from "../../services/getPokemonTypeColor";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

// Props
interface Props extends WithStyles<typeof styles> {
  pokemon: PokemonDetails;
}

// State
interface S {}

class PokemonImage extends Component<Props, S> {
  render() {
    const { pokemon, classes } = this.props;

    return (
      <>
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          className={classes.root}
        >
          <Grid container className={classes.chips}>
            {pokemon.types.map((type, index) => (
              <PokemonTypeChip
                size="small"
                key={index}
                label={type.type.name}
                color={getPokemonTypeColor(type.type.name)}
              />
            ))}
          </Grid>
          <Grid container justifyContent="center">
            <img
              className={classes.pokemonImg}
              alt={pokemon.name}
              src={pokemon.sprites.front_default}
            ></img>
          </Grid>
        </Grid>
      </>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
    chips: {
      paddingLeft: "10px",
    },
    pokemonImg: {
      height: "10rem",
      margin: "0 24px",
    },
    paperContainer: {},
    paper: {},
  });

export default withStyles(styles)(PokemonImage);
