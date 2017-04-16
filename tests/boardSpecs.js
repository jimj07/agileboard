'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect;
const Board = require('../board');
const ERRORS = require('../errors');

describe('Board', () => {
   describe('createNewIteration()', () => {
      it('should resolve an iteration', () => {
         const board = Board(['starting', 'in progress', 'done']);
         try {
            const result = board.createNewIteration();
            expect(result).to.not.be.undefined;
         } catch (error) {
            assert(false);
         }
      });

      it('should reject with error when a board has only \'starting\' column', () => {
         const board = Board(['starting']);
         try {
            board.createNewIteration();
         } catch (error) {
            expect(error).to.equals(ERRORS.MISSING_MUST_HAVE_COLS);
         }
      });

      it('should reject with error when a board has only \'done\' column', () => {
         const board = Board(['done']);
         try {
            board.createNewIteration();
         } catch (error) {
            expect(error).to.equals(ERRORS.MISSING_MUST_HAVE_COLS);
         }
      });

      it('should reject with error when a board has no \'starting\' and \'done\' column', () => {
         const board = Board(['in progress']);
         try {
            board.createNewIteration();
         } catch (error) {
            return expect(error).to.equals(ERRORS.MISSING_MUST_HAVE_COLS);
         }
      });
   });

   describe('getIteration()', () => {
      it('should return undefined', () => {
         const board = Board();
         const iteration = board.getIteration();
         expect(iteration).to.be.undefined;
      });

      it('should return an defined iteration', () => {
         const board = Board(['starting', 'in progress', 'done']);
         const iteration = board.createNewIteration();
         expect(iteration).to.not.be.undefined;
      });
   });
});