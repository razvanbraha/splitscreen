# Team Project: Milestone 1

## Splitscreen M1

## Progress Report

### Completed Features

* Home page
* Login & Sign up pop-ups
* Game page
* User page

### Pending Features

* API & frontend intergation
* Profile & Settings page
* Frontend JS functionality


### Page Implementation Progress

<!-- Provide links to wireframes of pages not 100% completed -->

Page    | Status | Wireframe
------- | ------ | ---------
Homepage| ✅     | 
Login   | ✅     |
Signup  | ✅     |
Game    | ✅     | 
User    | ✅     |
Profile | 60%     | [wireframe](link_to_wireframe)
Settings| 90%     | [wireframe](link_to_wireframe)



## API Documentation

Method  | Route                         | Description
------  | ----------------------------- | ---------
`POST`  | `/login`                      | Receives an username and password
`POST`  | `/logout`                     | Log out the current user
`POST`  | `/register`                   | Creates a new user account and returns the new user object
`PUT`   | `/user`                       | Update user (username, settings, or favourite games
`POST`  | `/reviews`                    | Create a new review
`PUT`   | `/reviews/:reviewId`          | Update an existing review
`GET`   | `/reviews/:reviewId`          | Retrieve a review by specific review id
`DELETE`| `/reviews/:reviewId`          | Delete an existing review
`GET`   | `/reviews/:gameTitle`         | Retrieves an array of all reviews for a specific game by its title
`GET`   | `/reviews/:userId`            | Retrieves written by a specific user
`POST`  | `/activity`                   | Create a new activity
`GET`   | `/activity/:userId`           | Retreives activity of specific user
`POST`  | `/friends`                    | Add a new friend
`GET`   | `/friends/:userId`            | Retrieve all friends of a specific user
`DELETE`| `/friends/:userId/:friendId`  | Remove a friend
...     | ...                           | ...









## Team Member Contributions

#### Riley Wickens

* Home page
* Profile & Settings page
* API documentation
* Initial API Setup

#### Razvan Braha

* Login popup
* Create account popup
* API documentation

#### Morgan Sawyer

* Game page
* User page

#### Milestone Effort Contribution

<!-- Must add to 100% -->

Riley Wickens | Razvan Braha  | Morgan Sawyer
------------- | ------------- | --------------
40%           | 25%           | 35%
