import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import Home from "../..";

const feature = loadFeature("./src/pages/Home/__tests__/features/Home-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Home", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper;
    let instance: Home;

    given("User loading Home Page", () => {
      HomeWrapper = shallow(<Home />);
    });

    when("I successfully load Home Page", () => {
      instance = HomeWrapper.instance() as Home;
    });

    then("User will see Hello World", () => {
      expect(HomeWrapper).toBeTruthy();
    });
  });
});
