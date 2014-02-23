Feature: Multi-Tenant
  As a podcaster, I want a unique url for my podcast, 
  so that my show notes are separate and private from other podcasts.

  Scenario: My own url for my podcast
    Given that I have an account on the system
    When I navigate to my url
    Then I will see the shownotes for my podcast