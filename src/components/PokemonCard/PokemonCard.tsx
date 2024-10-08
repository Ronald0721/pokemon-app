import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { getPokemon } from "../../services/getPokemons";
import getPokemonTypeColor from "../../services/getPokemonTypeColor";
import { SkeletonLoader, PokemonTypeChip } from "../index";
import { PokemonDetails } from "../../types/pokemonTypes";

// Props
interface Props extends WithStyles<typeof styles> {
  pokemonQuery: string;
}

// State
interface State {
  pokemon: PokemonDetails;
  loading: boolean;
}

class PokemonCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemon: {
        id: 0,
        name: "",
        sprites: {
          front_default: "",
        },
        types: [],
        height: "",
        species: {
          name: "",
          url: "",
        },
        stats: [],
      },
      loading: true,
    };
  }

  async componentDidMount() {
    await this.fetchPokemon();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.pokemonQuery !== this.props.pokemonQuery) {
      await this.fetchPokemon();
    }
  }

  fetchPokemon = async () => {
    const { pokemonQuery } = this.props;

    try {
      this.setState({ loading: true });
      const pokemon = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`
      );
      this.setState({ pokemon, loading: false });
    } catch (err) {
      console.error("Failed to fetch pokemon:", err);
    }
  };

  render() {
    const { classes } = this.props;
    const { pokemon, loading } = this.state;

    return (
      <>
        {/* {loading ? (
          <SkeletonLoader variant="rect" width={200} height={200} count={1} />
        ) : ( */}
        <Link to={`/pokemon/${pokemon.name}`}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                {loading ? (
                  <Box className={classes.img}>
                    <SkeletonLoader
                      variant="rect"
                      width={100}
                      height={96}
                      count={1}
                    />
                  </Box>
                ) : (
                  <Box className={classes.img}>
                    <img
                      alt={pokemon.name}
                      src={pokemon.sprites.front_default}
                    ></img>
                  </Box>
                )}

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h6"
                  className={classes.pokemonName}
                >
                  {loading ? (
                    <SkeletonLoader variant="text" width={100} count={1} />
                  ) : (
                    pokemon.name
                  )}
                </Typography>
                {loading ? (
                  <SkeletonLoader variant="circle" height={15} width={30} />
                ) : (
                  pokemon.types.map((type, index) => (
                    <PokemonTypeChip
                      size="small"
                      key={index}
                      label={type.type.name}
                      color={getPokemonTypeColor(type.type.name)}
                    />
                  ))
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        {/* )} */}
      </>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 200,
      cursor: "pointer",
    },
    img: {
      display: "flex",
      justifyContent: "center",
    },
    pokemonName: {
      textTransform: "capitalize",
    },
    pokemonType: {
      textTransform: "capitalize",
    },
  });

export default withStyles(styles)(PokemonCard);
