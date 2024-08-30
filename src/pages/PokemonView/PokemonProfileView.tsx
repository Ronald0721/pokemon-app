import React from "react";
import PokemonProfileController from "./PokemonProfileController";
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import { PokemonTypeChip } from "../../components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import getPokemonTypeColor from "../../services/getPokemonTypeColor";
import { PokemonType, Stats } from "../../types/pokemonTypes";

export default class PokemonProfileView extends PokemonProfileController {
  render() {
    const { pokemon, species } = this.state;

    return (
      <Container>
        <ArrowBackIcon onClick={this.handleGoBack} />
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <Box>
              <img
                className="pokemon-img"
                alt={pokemon.name}
                src={pokemon.sprites.front_default}
              ></img>
            </Box>
            <Typography className="pokemon-name" component="h1">
              {pokemon.name}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Paper>
              <Box>
                <Typography className="pokemon-flavor_text" component="p">
                  {species.flavor_text_entries[0].flavor_text}
                </Typography>

                <Typography component="h2">Pokemon Type</Typography>
                {pokemon.types.map((type: PokemonType, index: number) => (
                  <PokemonTypeChip
                    size="small"
                    key={index}
                    label={type.type.name}
                    color={getPokemonTypeColor(type.type.name)}
                  />
                ))}

                <Grid container>
                  {pokemon.stats.map((stat: Stats, index: number) => (
                    <Grid xs={6} item key={index}>
                      <Typography component="span">
                        {stat.stat.name}:&nbsp;
                      </Typography>
                      <Typography component="span">{stat.base_stat}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
