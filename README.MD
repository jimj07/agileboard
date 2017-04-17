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
let card = Card(['starting', 'done']);
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


