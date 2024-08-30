Feature: Home Page

  Scenario: User navigates to Home
    Given User is loading Home Page
    When User successfully load Home Page
    Then User will see the SearchBar component
    And User will see the PokemonList component

  Scenario: User searches for a Pokemon and then clears the search bar
    Given User is on the Home Page
    When User enters a Pokemon name in the search bar
    Then The Pokemon list should update with the search result
    When The user clears the search bar
    Then The Pokemon list should be cleared and fetched from the API
    And The Pokemon list should be updated with the fetched Pokemon

  Scenario: User loads more Pokemon
    Given User is on the Home Page with a list of Pokemon
    When User scrolls down to load more Pokemon
    Then More Pokemon should be added to the list

 Scenario: User searches for an unknown Pokemon
    Given User is on the Home Page
    When User enters an unknown Pokemon name in the search bar
    Then The user should see an error message
