'use strict';
const Board = require('../index').board;
const Card = require('../index').card;

const startingCol = 'starting';
const inProgressCol = 'in progress';
const verifyCol = 'verify';
const doneCol = 'done';
const card1 = Card('Create drop down menu', 'use blue background', 3);
const card2 = Card('Create a new API endpoint for card', 'details', 5);
const card3 = Card('Create a new API endpoint for iteration', 'details', 5);

const board = Board([startingCol, inProgressCol, verifyCol, doneCol]);
const iteration = board.createNewIteration();

const printColumnStatus = (message) => {
   console.log(message);

   console.log('Starting:');
   console.log(iteration.getCards(startingCol).map((card) => {
      return card.getTitle() + '; ' + card.getDescription() + '; ' + card.getPoint();
   }));
   console.log('In Progress:');
   console.log(iteration.getCards(inProgressCol).map((card) => {
      return card.getTitle() + '; ' + card.getDescription() + '; ' + card.getPoint();
   }));
   console.log('Verify:');
   console.log(iteration.getCards(verifyCol).map((card) => {
      return card.getTitle() + '; ' + card.getDescription() + '; ' + card.getPoint();
   }));
   console.log('Done:');
   console.log(iteration.getCards(doneCol).map((card) => {
      return card.getTitle() + '; ' + card.getDescription() + '; ' + card.getPoint();
   }));
   console.log(`Velocity: ${iteration.velocity()}`);
};


// Add 2 cards successfully. 
iteration.add(card1);
iteration.add(card2);
iteration.add(card3);
iteration.moveCard(card1, inProgressCol);
iteration.moveCard(card2, inProgressCol);
printColumnStatus('After moving 2 cards to in progress');

// Undo last move
iteration.undoLastMove();
printColumnStatus('\nAfter Undo');

// Move card2 back to in progress
iteration.moveCard(card2, inProgressCol);
printColumnStatus('\nAfter moving the card back to in progress');

// Move two cards to verify
iteration.moveCard(card1, verifyCol);
iteration.moveCard(card2, verifyCol);
printColumnStatus('\nAfter moving to verify');

// Undo last move again
iteration.undoLastMove();
printColumnStatus('\nAfter Undo');

// Move cards to done
iteration.moveCard(card1, doneCol);
iteration.moveCard(card2, doneCol);
printColumnStatus('\nAfter moving to done');

// Undo last move again
iteration.undoLastMove();
printColumnStatus('\nAfter Undo');

// Undo last move again, should have no effect
iteration.undoLastMove();
printColumnStatus('\nAfter Undo');

// Set the WIP of column verify to 20 and move all cards back to verify
iteration.setWIP(verifyCol, 20);
iteration.moveCard(card1, verifyCol);
iteration.moveCard(card2, verifyCol);
iteration.moveCard(card3, verifyCol);
printColumnStatus('\nMoving all cards to verify');

//Moving all cards back to in progress
iteration.setWIP(verifyCol, 20);
iteration.moveCard(card1, inProgressCol);
iteration.moveCard(card2, inProgressCol);

// Fail to add the third card as the column reaches the WIP limit.
try {
   iteration.moveCard(card3, inProgressCol);
} catch (error) {
   console.log(error);
   printColumnStatus('\nMoving all cards to in progress');
}

// Undo last move again
iteration.undoLastMove();
printColumnStatus('\nAfter Undo');