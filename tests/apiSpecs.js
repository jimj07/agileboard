'use strict';
const expect = require('chai').expect;
const Board = require('../index').board;
const Card = require('../index').card;
const ERRORS = require('../errors');


describe('Agile Board', () => {
   const startingCol = 'starting';
   const inProgressCol = 'in progress';
   const verifyCol = 'verify';
   const doneCol = 'done';
   const card1 = Card('Create drop down menu', 'use blue background', 3);
   const card2 = Card('Create a new API endpoint for card', 'details', 5);
   const card3 = Card('Create a new API endpoint for iteration', 'details', 5);

   it('should add 3 cards to iteration and move 2 of them to in progress', () => {

      const board = Board([startingCol, inProgressCol, verifyCol, doneCol]);
      const iteration = board.createNewIteration();

      iteration.add(card1);
      iteration.add(card2);
      iteration.add(card3);

      expect(iteration.velocity()).to.equals(0);
      expect(iteration.getCards(startingCol)).to.deep.equals([]);
      expect(iteration.getCards(inProgressCol)).to.deep.equals([]);
      expect(iteration.getCards(verifyCol)).to.deep.equals([]);
      expect(iteration.getCards(doneCol)).to.deep.equals([]);

      iteration.moveCard(card1, inProgressCol);
      expect(iteration.getCards(inProgressCol)).to.deep.equals([card1]);

      iteration.moveCard(card2, inProgressCol);
      expect(iteration.getCards(inProgressCol)).to.deep.equals([card1, card2]);
   });
});