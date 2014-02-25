require "selenium-webdriver"
require "webrat"

Given(/^that I have an account on the system$/) do
  #nothing to do here yet
end

When(/^I navigate to my url$/) do
	visit "http://localhost:3000"
end

Then(/^I will see the shownotes for my podcast$/) do
  
end