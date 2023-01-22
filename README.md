# Toddler Run

[Click here to see deployed game](http://github.com)

## Description

In this game your baby is crawling towards random objects in the flat. Some of these objects are safe to play with, but some of them he would destroy. Make sure, that he gets only the safe items, but hurry up, because he is crawling faster and faster.

## MVP

- the game has a baby crawling from the left of the screen
- objects appear randomly from the right of the screen
- the objects have to be removed in the appearing order
- left arrow key removes the baby-safe object, right arrow key deletes the forbidden object
- every correct keypress increases the score by 1
- the speed of crawling increases when a certain score is reached
- when the baby reaches a forbidden object, or the wrong key was pressed, the game is over

## Backlog

- add sound effects
- make the sizes responsive

## Data structure

index.js:
startGame()
animate()
...

## States y States Transitions

- Intro screen
- Game screen
- Game Over screen

## Task

- create Game Intro
- add function to start the game
- set up background image and character
- animate background
- create random objects
- animate objects
- add event listeners to keypress
- implement score count
- increase animation speed
- create game over state

## Links

- [Trello Link](https://trello.com)
- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)
