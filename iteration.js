'use strict';
const ERRORS = require('./errors');

const DEFAULT_WIP = '10';
const STARTING_COLUMN = 'starting';
const DONE_COLUMN = 'done';
const STANDBY_COLUMN = '_stand_by_';

module.exports = (columnNames = [STARTING_COLUMN, DONE_COLUMN]) => {
   let columns = {};
   let lastMove = {
      card: undefined,
      column: undefined,
   };

   // Private Functions
   const initialize = () => {
      for (let col of columnNames) {

         // Do no allow colunmn name to be the same as the stand by column name
         if (col === STANDBY_COLUMN) {
            throw (ERRORS.INVALID_COLUMN_NAME);
         }

         columns[col] = {
            points: 0,
            cards: [],
            WIP: DEFAULT_WIP,
         };
      }

      columns[STANDBY_COLUMN] = {
         points: 0,
         cards: [],
         WIP: Number.POSITIVE_INFINITY,
      };
      columnNames.push(STANDBY_COLUMN);
   };

   initialize();

   const recordLastMove = (card, column) => {
      lastMove.card = card;
      lastMove.column = column;
   };

   const resetLastMove = () => {
      lastMove.card = undefined;
      lastMove.column = undefined;
   };

   const findCard = (card) => {
      let result;
      const isTheSame = (otherCard) => {
         return card.equals(otherCard);
      };

      for (let colName of columnNames) {
         let col = columns[colName];
         let index = col.cards.findIndex(isTheSame);
         if (index > -1) {
            result = {};
            result.card = col.cards[index];
            result.column = colName;
            result.index = index;
            break;
         }
      }
      return result;
   };

   const removeCard = (col, index) => {
      const cardRemoved = columns[col].cards[index];
      columns[col].cards.splice(index, 1);
      columns[col].points -= cardRemoved.getPoint();
      recordLastMove(cardRemoved, col);
      return cardRemoved;
   };

   const goneAboveWIP = (addtionalPoints, columnName) => {
      const col = columns[columnName];
      return col.points + addtionalPoints > col.WIP;
   };

   // Public Functions
   const add = (card) => {
      if (card) {
         columns[STANDBY_COLUMN].cards.push(card);
      } else {
         throw (ERRORS.UNDEFINED_CARD);
      }
   };

   const moveCard = (card, toColumn) => {
      if (!card) {
         throw (ERRORS.UNDEFINED_CARD);
      } else if (!columns[toColumn]) {
         throw(`${ERRORS.COLUMN_NOT_FOUND} ${toColumn}`);
      }

      const result = findCard(card);
      if (!result) {
         throw(`${ERRORS.CARD_NOT_FOUND} ${card.getTitle()}`);
      } else if (goneAboveWIP(result.card.getPoint(), toColumn)) {
         throw(`${ERRORS.ABOVE_WIP} ${toColumn}`);
      } else {
         let cardToMove = removeCard(result.column, result.index);
         let column = columns[toColumn];
         column.cards.push(cardToMove);
         column.points += cardToMove.getPoint();
      }
   };

   const undoLastMove = () => {
      if (!lastMove.card) {
         return;
      }

      moveCard(lastMove.card, lastMove.column);
      resetLastMove();
   };

   const getCards = (column) => {
      if (!columns[column]) {
         throw(`${ERRORS.COLUMN_NOT_FOUND} ${column}`);
      }

      return columns[column].cards;
   };

   const setWIP = (column, wip) => {
      if (!columns[column]) {
         throw(`${ERRORS.COLUMN_NOT_FOUND} ${column}`);
      }

      columns[column].WIP = wip;
   };

   const velocity = () => {
      return columns[DONE_COLUMN].points;
   };

   return {
      add,
      moveCard,
      undoLastMove,
      velocity,
      getCards,
      setWIP,
   };
};