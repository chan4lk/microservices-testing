Feature: Authentication

@smoke
Scenario: Create User
	Given the username is chandima
	And the password is passWord123#
	When the signup api is called
	Then the result code should be 201

@smoke
Scenario: Login User
	Given the username is chandima
	And the password is passWord123#
	When the signin api is called
	Then the result code should be 200
