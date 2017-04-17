'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect;
const Iteration = require('../iteration');
const Card = require('../card');
const ERRORS = require('../errors');

describe('iteration', () => {

   describe('create iteration', () => {
      it('should not allow column named as \'_stand_by_\'', () => {
         try {
            Iteration(['_stand_by_']);
         } catch (error) {
            expect(error).to.equals(ERRORS.INVALID_COLUMN_NAME);
         }
      });
   });

   describe('add()', () => {
      it('should throw an error about undefined card', () => {
         const iteration = Iteration();
         try {
            iteration.add();
         } catch (error) {
            expect(error).to.equals(ERRORS.UNDEFINED_CARD);
         }
      });

      it('should add a card successfully with error', () => {
         const iteration = Iteration();
         try {
            iteration.add(Card());
            assert(true);
         } catch (error) {
            assert(false);
         }
      });
   });

   describe('moveCard()', () => {
      it('should throw an error about card not defined', () => {
         const iteration = Iteration();
         const card = Card('title', 'desc', '1');
         try {
            iteration.add(card);
            iteration.moveCard(undefined, 'done');
         } catch (error) {
            expect(error).to.equals(ERRORS.UNDEFINED_CARD);
         }
      });

      it('should throw an error about card not found', () => {
         const iteration = Iteration();
         const card = Card('title', 'desc', '1');
         const cardToMove = Card('hello', 'world', '0');
         try {
            iteration.add(card);
            iteration.moveCard(cardToMove, 'done');
         } catch (error) {
            expect(error).to.equals(`${ERRORS.CARD_NOT_FOUND} ${cardToMove.getTitle()}`);
         }
      });

      it('should throw an error about column not found', () => {
         const iteration = Iteration();
         const cardToMove = Card('hello', 'world', '0');
         const toColumn = 'in progress';
         try {
            iteration.moveCard(cardToMove, toColumn);
         } catch (error) {
            expect(error).to.equals(`${ERRORS.COLUMN_NOT_FOUND} ${toColumn}`);
         }
      });

      it('should move the card to starting', () => {
         const iteration = Iteration();
         const card = Card('card one', 'desc', '1');
         const toColumn = 'starting';

         iteration.add(card);
         iteration.moveCard(card, toColumn);

         const cards = iteration.getCards(toColumn);
         const cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });

         expect(cardIndex).to.equals(0);
      });

      it('should move the card to starting and then to done', () => {
         const iteration = Iteration();
         const card = Card('card one', 'desc', '1');
         let startingColumn = 'starting';
         let doneColumn = 'done';

         iteration.add(card);
         iteration.moveCard(card, startingColumn);

         let cards = iteration.getCards(startingColumn);
         let cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });

         iteration.moveCard(card, doneColumn);

         cards = iteration.getCards(doneColumn);
         cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });
         expect(cardIndex).to.equals(0);

         cards = iteration.getCards(startingColumn);
         cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });
         expect(cardIndex).to.equals(-1);
      });

      it('should not allow moving card2 to starting column as it exceeds the WIP limit', () => {
         const iteration = Iteration();
         const card1 = Card('card one', 'desc', '1');
         const card2 = Card('card two', 'desc', '3');
         let startingColumn = 'starting';
         iteration.setWIP(startingColumn, 1);

         iteration.add(card1);
         iteration.moveCard(card1, startingColumn);

         iteration.add(card2);

         try {
            iteration.moveCard(card2, startingColumn);
         } catch (error) {
            expect(error).to.equals(`${ERRORS.ABOVE_WIP} ${startingColumn}`);
            expect(iteration.getCards(startingColumn)).to.deep.equals([card1]);
         }
      });
   });

   describe('getCards()', () => {
      it('should throw error about column not found', () => {
         const iteration = Iteration();
         const column = 'Hello';
         try {
            iteration.getCards(column);
         } catch (error) {
            expect(error).to.equals(`${ERRORS.COLUMN_NOT_FOUND} ${column}`);
         }
      });

      it('should return an empty array of starting column', () => {
         const iteration = Iteration();
         const expectCards = [];
         const actualCards = iteration.getCards('starting');
         expect(actualCards).to.deep.equals(expectCards);
      });

      it('should return an array of cards in starting column', () => {
         const iteration = Iteration();
         const card1 = Card('card 1', 'desc', 4);
         const card2 = Card('card 2', 'desc', 3);
         const expectCards = [card1, card2];
         const startingColumn = 'starting';

         iteration.add(card1);
         iteration.add(card2);
         iteration.moveCard(card1, startingColumn);
         iteration.moveCard(card2, startingColumn);

         const actualCards = iteration.getCards(startingColumn);
         expect(actualCards).to.deep.equals(expectCards);
      });
   });

   describe('velocity()', () => {
      it('should return 0', () => {
         const iteration = Iteration();
         const velocity = iteration.velocity();
         expect(velocity).to.equals(0);
      });

      it('should return 7', () => {
         const iteration = Iteration();
         const point1 = 4;
         const point2 = 3;
         const expectVelocity = point1 + point2;
         const card1 = Card('card 1', 'desc', point1);
         const card2 = Card('card 2', 'desc', point2);
         const doneColumn = 'done';

         iteration.add(card1);
         iteration.add(card2);
         iteration.moveCard(card1, doneColumn);
         iteration.moveCard(card2, doneColumn);

         const velocity = iteration.velocity();
         expect(velocity).to.deep.equals(expectVelocity);
      });
   });

   describe('undoLastMove()', () => {
      it('should do nothing', () => {
         const iteration = Iteration();
         try {
            iteration.undoLastMove();
         } catch (error) {
            assert(false, `Caught unexpected error: ${error}`);
         }
      });

      it('should do undo last move to done', () => {
         const iteration = Iteration();
         const card = Card('card one', 'desc', '1');
         let startingColumn = 'starting';
         let doneColumn = 'done';

         iteration.add(card);
         iteration.moveCard(card, startingColumn);
         iteration.moveCard(card, doneColumn);
         iteration.undoLastMove();

         let cards = iteration.getCards(startingColumn);
         let cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });

         expect(cardIndex).to.equals(0);

         cards = iteration.getCards(doneColumn);
         cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });
         expect(cardIndex).to.equals(-1);

         // undo again, should have no effect
         iteration.undoLastMove();

         cards = iteration.getCards(startingColumn);
         cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });

         expect(cardIndex).to.equals(0);

         cards = iteration.getCards(doneColumn);
         cardIndex = cards.findIndex((c) => {
            return c.equals(card);
         });
         expect(cardIndex).to.equals(-1);
      });
   });

   describe('setWIP()', () => {
      it('should throw error about column not found', () => {
         const iteration = Iteration();
         const column = 'Hello';
         try {
            iteration.setWIP(column, 1);
         } catch (error) {
            expect(error).to.equals(`${ERRORS.COLUMN_NOT_FOUND} ${column}`);
         }
      });

      it('should throw error about WIP is invalid', () => {
         const iteration = Iteration();
         const column = 'starting';
         const wip = -1;
         try {
            iteration.setWIP(column, wip);
         } catch (error) {
            expect(error).to.equals(`${ERRORS.INVALID_WIP} ${wip}`);
         }
      });
   });
});