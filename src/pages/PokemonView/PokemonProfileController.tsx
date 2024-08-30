import { Component } from "react";
import { getPokemon } from "../../services/getPokemons";
import { getPokemonSpecies } from "../../services/getPokemonSpecies";
import { PokemonDetails, TextEntry } from "../../types/pokemonTypes";
import { getParams } from "../../utils/getParams";

// Props
interface Props {}

// State
interface S {
  loading: boolean;
  pokemon: PokemonDetails;
  species: {
    flavor_text_entries: TextEntry[];
  };
}

class PokemonProfileController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      pokemon: {
        name: "",
        height: "",
        sprites: {
          front_default: "",
        },
        species: {
          name: "",
          url: "",
        },
        types: [],
        stats: [],
      },
      species: {
        flavor_text_entries: [
          {
            flavor_text: "",
            language: {
              name: "",
              url: "",
            },
          },
        ],
      },
    };
  }

  async componentDidMount() {
    const id = getParams(2);
    if (id) {
      await this.fetchPokemon(id);
      await this.fetchSpecies();
    }
  }

  fetchPokemon = async (id: string | number) => {
    const pokemon = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
    this.setState({ pokemon });
  };

  fetchSpecies = async () => {
    const species = await getPokemonSpecies(this.state.pokemon.species.url);
    this.setState({ loading: false, species });
  };

  handleGoBack = () => {
    window.history.back();
  };
}

export default PokemonProfileController;
