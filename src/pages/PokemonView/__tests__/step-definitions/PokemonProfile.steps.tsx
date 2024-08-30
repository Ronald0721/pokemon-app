import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import PokemonProfileView from "../../PokemonProfileView";
import { getPokemon } from "../../../../services/getPokemons";
import { getPokemonSpecies } from "../../../../services/getPokemonSpecies";
import { PokemonDetails } from "../../../../types/pokemonTypes";
import { getParams } from "../../../../utils/getParams";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  BackBtn,
  PokemonImage,
  PokemonInfo,
  PokemonName,
} from "../../../../components";

const feature = loadFeature(
  "./src/pages/PokemonView/__tests__/features/PokemonProfileView-scenario.feature"
);

jest.mock("../../../../services/getPokemons");
jest.mock("../../../../services/getPokemonSpecies");
jest.mock("../../../../utils/getParams");

defineFeature(feature, (test) => {
  let pokemonViewWrapper: ShallowWrapper;
  let instance: PokemonProfileView;
  let spyGoBack: jest.SpyInstance;

  const mockPokemon: PokemonDetails = {
    id: 0,
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

  beforeEach(() => {
    jest.resetModules();

    (getParams as jest.Mock).mockReturnValue({ id: "pikachu" });
    (getPokemon as jest.Mock).mockResolvedValue(mockPokemon);
    (getPokemonSpecies as jest.Mock).mockResolvedValue({
      flavor_text_entries: [
        {
          flavor_text: "A cute Pokemon.",
          language: {
            name: "en",
            url: "https://example.com/language",
          },
        },
      ],
    });

    pokemonViewWrapper = shallow(<PokemonProfileView />);
    instance = pokemonViewWrapper.instance() as PokemonProfileView;
  });

  test("User views Pokemon View Page", ({ given, when, then }) => {
    given("User navigates to the Pokemon view page", () => {
      // Already initialized in beforeEach
    });

    when("the Pokemon data is fetched successfully", async () => {
      await instance.componentDidMount();
      pokemonViewWrapper.update();
    });

    then("user will see the Pokemon's name", () => {
      expect(pokemonViewWrapper.find(PokemonName)).toHaveLength(1);
    });

    then("user will see the Pokemon's image", () => {
      expect(pokemonViewWrapper.find(PokemonImage)).toHaveLength(1);
    });

    then("user will see the Pokemon's info", () => {
      expect(pokemonViewWrapper.find(PokemonInfo)).toHaveLength(1);
    });
  });

  test("User clicks the Go Back button", ({ given, when, then }) => {
    given("User is on the Pokemon View page", () => {
      spyGoBack = jest
        .spyOn(window.history, "back")
        .mockImplementation(() => {});
    });

    when("User clicks the Go Back button", () => {
      pokemonViewWrapper
        .find(BackBtn)
        .dive()
        .find(ArrowBackIcon)
        .simulate("click");
    });

    then("User should be navigated back to the previous page", () => {
      expect(spyGoBack).toHaveBeenCalled();
    });
  });
});
