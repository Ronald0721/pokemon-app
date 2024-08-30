import React from "react";
import PokemonProfileController from "./PokemonProfileController";
import { Container, Grid } from "@material-ui/core";
import {
  PokemonImage,
  PokemonName,
  PokemonInfo,
  BackBtn,
} from "../../components";

export default class PokemonProfileView extends PokemonProfileController {
  render() {
    const { pokemon, species } = this.state;

    return (
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <BackBtn onBack={this.handleGoBack} />
          </Grid>
          <Grid xs={12} item>
            <PokemonName id={pokemon.id} name={pokemon.name} />
          </Grid>
          <Grid xs={12} sm={4} item>
            <PokemonImage pokemon={pokemon} />
          </Grid>
          <Grid xs={12} sm={8} item>
            <PokemonInfo pokemon={pokemon} species={species} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
