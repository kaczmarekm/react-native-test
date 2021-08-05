# ReactNative-code-test

# 1. Run

1. Create `.env` file in project root, paste following envs:
   ```
   REACT_APP_API_URL=https://app.qudini.com/api/
   REACT_APP_API_USERNAME=codetest1
   REACT_APP_API_PASSWORD=codetest100
   REACT_APP_GRAVATAR_API_URL=https://www.gravatar.com/avatar/
   ```
2. Run
   * iOS: `$ yarn && cd ios && pod install && cd .. && yarn ios`
   * Android: `$ yarn && yarn android`
   * web: `$ yarn && yarn web`

# 2. Task description

#

#

#

**You should use `typescript` for this task;**

# Task

Develop a cross platform react native application that will fetch a list of customers from an API and display them on screen as detailed below.
The API is: https://app.qudini.com/api/queue/gj9fs

The Username and password for the API are:

- Username: codetest1
- Password: codetest100

The API will need to be authenticated against using HTTP Basic auth and will return a JSON object that contains some queue data containing a list of customer objects.

# Requirements:

- The app should make a request to this api and display the list of customers (`name` and `expectedTime`), ordered by _earliest_ `expectedTime`.
- It should also fetch the profile image of the customer by using the Gravatar Image request api (use their email for this, or show a placeholder if no email is present): https://en.gravatar.com/site/implement/images/.
- The app should have a text input present at the top of the list and allow customers to be filtered by customer name.
- The app should ensure that the list reloads automatically every 30 seconds.
- The app is expected to use some form of state management (for example Redux or Mobx).

# Bonus:

- Some level of test coverage

# Extra Bonus:

- Cached profile images locally

The completed project should be a github repo.

You’re free to use any 3rd part library or framework that you can justify the need.
