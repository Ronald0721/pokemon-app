import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import PokemonProfileView from "../../PokemonProfileView";
import { getPokemon } from "../../../../services/getPokemons";
import { getPokemonSpecies } from "../../../../services/getPokemonSpecies";
import { PokemonDetails } from "../../../../types/pokemonTypes";
import { getParams } from "../../../../utils/getParams";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const feature = loadFeature(
  "./src/pages/PokemonView/__tests__/features/PokemonView-scenario.feature"
);

jest.mock("../../../../services/getPokemons");
jest.mock("../../../../services/getPokemonSpecies");
jest.mock("../../../../utils/getParams");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: PokemonProfileView;

  const mockPokemonDetails: PokemonDetails = {
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
    jest.spyOn(window.history, "back").mockImplementation(() => {});

    (getParams as jest.Mock).mockReturnValue({ id: "pikachu" });
    (getPokemon as jest.Mock).mockResolvedValue(mockPokemonDetails);
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

    wrapper = shallow(<PokemonProfileView />);
    instance = wrapper.instance() as PokemonProfileView;
  });

  test("User views Pokemon View Page", ({ given, when, then }) => {
    given("User navigates to the Pokemon view page", () => {
      // Already initialized in beforeEach
    });

    when("the Pokemon data is fetched successfully", async () => {
      await instance.componentDidMount();
      wrapper.update();
    });

    then("user will see the Pokemon's name and image", () => {
      const typography = wrapper.find(Typography).first();
      const img = wrapper.find("img");

      expect({
        typographyText: typography.text(),
        imageSrc: img.prop("src"),
      }).toEqual({
        typographyText: "pikachu",
        imageSrc: "https://example.com/pikachu.png",
      });
    });
  });

  test("User clicks the Go Back button", ({ given, when, then }) => {
    given("User is on the Pokemon View page", () => {
      // Already initialized in beforeEac
    });

    when("User clicks the Go Back button", () => {
      wrapper.find(ArrowBackIcon).simulate("click");
    });

    then("User should be navigated back to the previous page", () => {
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
