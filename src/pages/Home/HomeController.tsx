import { Component } from "react";
import { getPokemon, getPokemons } from "../../services/getPokemons";
import { Pokemon } from "../../types/pokemonTypes";

// Props
interface Props {}

// State
interface S {
  pokemonQuery: string;
  pokemonList: Pokemon[];
  loading: boolean;
  hasMore: boolean;
  limit: number;
  offset: number;
  error: string | null | unknown;
}

export default class Home extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemonQuery: "",
      pokemonList: [],
      loading: false,
      hasMore: true,
      limit: 30,
      offset: 0,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.pokemonQuery !== this.state.pokemonQuery) {
      this.fetchPokemons();
    }
  }

  handleSinglePokemonCase = () => {
    const { pokemonList } = this.state;
    if (pokemonList.length === 1) {
      this.setState({ pokemonList: [], loading: true, error: null });
    } else {
      this.setState({ loading: true, error: null });
    }
  };

  fetchPokemons = async () => {
    const { limit, offset, pokemonQuery } = this.state;

    try {
      this.handleSinglePokemonCase();
      if (!pokemonQuery) {
        const { pokemons, hasMore } = await getPokemons(limit, offset);
        this.setState((prevState) => ({
          pokemonList: [...prevState.pokemonList, ...pokemons],
          loading: false,
          hasMore,
          offset: prevState.offset + limit,
          error: null,
        }));
      } else {
        const pokemon = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`
        );
        this.setState({
          pokemonList: [pokemon],
          loading: false,
          hasMore: false,
          error: null,
        });
      }
    } catch (err) {
      this.setState({
        pokemonList: [],
        loading: false,
        error: "Oops! We couldn't find a Pokemon by that name.",
      });
    }
  };

  handleSearch = (q: string) => {
    this.setState({ pokemonQuery: q, offset: 0 });
  };

  fetchMoreData = async () => {
    this.state.hasMore && (await this.fetchPokemons());
  };
}
