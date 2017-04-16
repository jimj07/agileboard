'use strict';
const Iteration = require('./iteration');
const ERRORS = require('./errors');
const MUST_HAVE_COLUMNS = ['starting', 'done'];

module.exports = (columns = []) => {
   let iteration;

   const createNewIteration = () => {
      // check if colunms contains the must have columns 
      // before creating an iteration
      if (MUST_HAVE_COLUMNS.filter((elem) => {
         return columns.includes(elem);
      }).length == MUST_HAVE_COLUMNS.length) {
         iteration = Iteration(columns);
         return iteration;
      } else {
         throw ERRORS.MISSING_MUST_HAVE_COLS;
      }
   };

   const getIteration = () => {
      return iteration;
   };

   return {
      createNewIteration,
      getIteration
   };
};