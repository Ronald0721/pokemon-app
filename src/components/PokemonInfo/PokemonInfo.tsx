import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { PokemonDetails, PokemonSpecies } from "../../types/pokemonTypes";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

// Props
interface Props
  extends
    WithStyles<typeof styles> {
      pokemon: PokemonDetails
  species: PokemonSpecies;
}

// State
interface S {}

class PokemonInfo extends Component<Props, S> {
  render() {
    const { species, pokemon, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.pokemon_flavor_text} variant="h6">
              {species.flavor_text_entries[0].flavor_text}
            </Typography>
          </Grid>

          {pokemon.stats.map((stat, index) => (
            <Grid xs={6} item key={index}>
              <Typography
                variant="subtitle1"
                className={classes.pokemon_stats}
                display="inline"
              >
                {stat.stat.name === "hp" ? "HP" : stat.stat.name}:&nbsp;
              </Typography>
              <Typography variant="subtitle1" display="inline">
                {stat.base_stat}
              </Typography>
            </Grid>
          ))}

          {/* <Grid item xs={12}>
            <Typography
              variant="h6"
              display="inline"
              className={classes.pokemon_type}
            >
              Type
            </Typography>
            {types.map((type, index) => (
              <PokemonTypeChip
                size="small"
                key={index}
                label={type.type.name}
                color={getPokemonTypeColor(type.type.name)}
              />
            ))}
          </Grid> */}
        </Grid>
      </Paper>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "12px",
    },
    pokemon_flavor_text: {},
    pokemon_type: {},
    pokemon_stats: {
      textTransform: "capitalize",
    },
  });

export default withStyles(styles)(PokemonInfo);
