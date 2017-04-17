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

## Iteration
### Instantiation
Iteration can be created by calling board.createNewIteration()
It will throw an exception if the board does not have the mandatory columns: starting & done.
**By default, the WIP for every column is 10**.

```javascript
let board1 = Board(['starting', 'done']);
let iteration = board1.createNewIteration();

let board2 = Board(['in progress']);
iteration = board2.createNewIteration(); // throw an exception
```

### .add(card)
Add a card to the iteration. The card will be put into a stand by column
```javascript
let board = Board(['starting', 'done']);
let iteration = board.createNewIteration();
let card = Card('title', 'desc', 10);

iteration.add(card);
```

### .moveCard(card, column)
- card: Object (Card)
- column: string

Move the card to a specified column. This function will fisrt find the card that is the same as the one provided (using card.equals()). And then move the card to the specified column. 

```javascript
iteration.add(card);
iteration.move(card, 'done');
```

### .undoLastMove()
Undo the last move on the iteration. Consecutively calling undo() can only undo one move.
```javascript
iteration.add(card);
iteration.move(card, 'starting');
iteration.move(card, 'done');
iteration.undoLastMove() // the card is moved back to starting
```

### .velocity(column)

### .getCards(column)

### .setWIP(column)