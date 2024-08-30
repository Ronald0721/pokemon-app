import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import HomeView from "../../HomeView";
import { SearchBar, PokemonList, ErrorDisplay } from "../../../../components";
import { getPokemon, getPokemons } from "../../../../services/getPokemons";
import { Pokemon, PokemonDetails } from "../../../../types/pokemonTypes";

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/Home-scenario.feature"
);

jest.mock("../../../../services/getPokemons");

defineFeature(feature, (test) => {
  let HomeWrapper: ShallowWrapper<typeof HomeView>;
  let instance: HomeView;
  let spyHandleSinglePokemonCase: jest.SpyInstance;

  const mockPokemon: PokemonDetails = {
    name: "pikachu",
    height: "7",
    sprites: {
      front_default: "https://example.com/pikachu.png",
    },
    types: [
      {
        type: {
          name: "grass",
          url: "https://example.com/pikachu.png",
        },
        slot: 0,
      },
    ],
    stats: [
      {
        base_stat: 45,
        stat: {
          name: "hp",
          url: "",
        },
        effort: 0,
      },
    ],
    species: {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon-species/25/",
    },
  };

  const mockPokemons: Pokemon[] = [
    { name: "bulbasaur", url: "bulbasaur_url" },
    { name: "charmander", url: "charmander_url" },
    { name: "squirtle", url: "squirtle_url" },
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Home", ({ given, when, then }) => {
    given("User is loading Home Page", () => {
      (getPokemons as jest.Mock).mockResolvedValue({
        pokemons: mockPokemons,
        hasMore: true,
      });

      HomeWrapper = shallow(<HomeView />);
      instance = HomeWrapper.instance() as HomeView;
    });

    when("User successfully load Home Page", () => {
      HomeWrapper.update();
    });

    then("User will see the SearchBar component", () => {
      expect(HomeWrapper.find(SearchBar)).toHaveLength(1);
    });

    then("User will see the PokemonList component", () => {
      expect(HomeWrapper.find(PokemonList)).toHaveLength(1);
    });
  });

  test("User searches for a Pokemon and then clears the search bar", async ({
    given,
    when,
    then,
  }) => {
    given("User is on the Home Page", () => {
      (getPokemon as jest.Mock).mockResolvedValue(mockPokemon);
      (getPokemons as jest.Mock).mockResolvedValue({
        pokemons: mockPokemons,
        hasMore: true,
      });

      HomeWrapper = shallow(<HomeView />);
      instance = HomeWrapper.instance() as HomeView;

      spyHandleSinglePokemonCase = jest.spyOn(
        instance,
        "handleSinglePokemonCase"
      );
    });

    when("User enters a Pokemon name in the search bar", async () => {
      instance.handleSearch("pikachu");
      await HomeWrapper.update();
    });

    then("The Pokemon list should update with the search result", () => {
      expect(HomeWrapper.find(PokemonList).props().pokemons).toEqual([
        mockPokemon,
      ]);
    });

    when("The user clears the search bar", async () => {
      instance.handleSearch("");
      await HomeWrapper.update();
    });

    then(
      "The Pokemon list should be cleared and fetched from the API",
      async () => {
        expect(spyHandleSinglePokemonCase).toHaveBeenCalled();
      }
    );

    then(
      "The Pokemon list should be updated with the fetched Pokemon",
      async () => {
        expect(HomeWrapper.find(PokemonList).props().pokemons).toEqual(
          mockPokemons
        );
      }
    );
  });

  test("User searches for an unknown Pokemon", ({ given, when, then }) => {
    given("User is on the Home Page", () => {
      (getPokemon as jest.Mock).mockRejectedValue(
        new Error("Pokemon not found")
      );

      HomeWrapper = shallow(<HomeView />);
      instance = HomeWrapper.instance() as HomeView;
    });

    when("User enters an unknown Pokemon name in the search bar", async () => {
      instance.handleSearch("pikachow");
      HomeWrapper.update();
    });

    then("The user should see an error message", () => {
      const error = HomeWrapper.find(ErrorDisplay).props().error;
      expect(error).toMatch(/Oops/);
    });
  });

  test("User loads more Pokemon", ({ given, when, then }) => {
    given("User is on the Home Page with a list of Pokemon", () => {
      (getPokemons as jest.Mock).mockResolvedValue({
        pokemons: mockPokemons,
        hasMore: false,
      });

      HomeWrapper = shallow(<HomeView />);
      instance = HomeWrapper.instance() as HomeView;
    });

    when("User scrolls down to load more Pokemon", async () => {
      await instance.fetchMoreData();
      HomeWrapper.update();
    });

    then("More Pokemon should be added to the list", () => {
      const pokemonList = HomeWrapper.find(PokemonList).props().pokemons;
      expect(pokemonList.length).toBeGreaterThan(mockPokemons.length);
    });
  });

  // test("User clears the search bar and fetches Pokemon", ({
  //   given,
  //   when,
  //   then,
  // }) => {
  //   given("The user has searched for a Pokemon", async () => {
  //     HomeWrapper = shallow(<HomeView />);
  //     instance = HomeWrapper.instance() as HomeView;

  //     instance.setState({ pokemonQuery: "pikachu", offset: 0 });

  //     (getPokemon as jest.Mock).mockResolvedValue(mockPokemon);
  //     (getPokemons as jest.Mock).mockResolvedValue(mockPokemons);
  //     spyHandleSinglePokemonCase = jest.spyOn(
  //       instance,
  //       "handleSinglePokemonCase"
  //     );

  //     await instance.fetchPokemons();
  //     HomeWrapper.update();
  //   });

  //   when("The user clears the search bar", () => {
  //     instance.handleSearch("");
  //     HomeWrapper.update();
  //   });

  //   then(
  //     "The Pokemon list should be cleared and fetched from the API",
  //     async () => {
  //       expect(spyHandleSinglePokemonCase).toHaveBeenCalled();
  //     }
  //   );

  //   then(
  //     "The Pokemon list should be updated with the fetched Pokemons",
  //     async () => {
  //       await instance.fetchPokemons();
  //       HomeWrapper.update();
  //       expect(HomeWrapper.find(PokemonList).props().pokemons).toEqual([
  //         mockPokemon,
  //       ]);
  //     }
  //   );
  // });
});
