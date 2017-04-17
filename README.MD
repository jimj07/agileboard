# Traffic Lights
Agile Board

## How to run:
### Run tests
npm test
### Run tests with code coverage tool istanbul
npm run coverage

## Card
### Instantiation
Card can be instantiated by providing title, description and point.
```javascript
let card = Card('title', 'desc', 10);
```
### .getTitle()
Return the title of the card
### .getDescription()
Return the description of the card
### .getPoint()
Return the point of the card
### .equals(othercard)
Compare with the other card. It returns true it the titles and descriptions are the same.
```javascript
let card1 = Card('title', 'desc', 10);
let card2 = Card('title', 'desc', 10);

card1.equals(card2) // return true
```


## Board
### Instantiation
Board can be instantiated by providing an array of column names.
```javascript
let board = Board(['starting', 'done']);
```
### .createNewIteration()
Create a new iteration and overwrite the existing one. One board can only have one iteration.

### .getIteration()
Get the current iteration


