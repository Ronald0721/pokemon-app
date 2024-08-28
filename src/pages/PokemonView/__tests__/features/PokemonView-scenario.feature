Feature: Pokemon View

    Scenario: User views Pokemon View Page
        Given User navigates to the Pokemon view page
        When the Pokemon data is fetched successfully
        Then User will see the Pokemon's name and image

    Scenario: User clicks the Go Back button
        Given User is on the Pokemon View page
        When User clicks the Go Back button
        Then User should be navigated back to the previous page