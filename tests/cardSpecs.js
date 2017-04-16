'use strict';
const expect = require('chai').expect;
const Card = require('../card');

describe('card', () => {
   describe('create card', () => {
      it('should create card with title as \'Task A\', description as \'Create datepicker\' and point as 10', () => {
         const title = 'Task A';
         const description = 'Create datepicker';
         const point = 10;
         const card = Card(title, description, point);

         expect(card.getTitle()).to.equals(title);
         expect(card.getDescription()).to.equals(description);
         expect(card.getPoint()).to.equals(point);
      });
   });

   describe('compare card', () => {
      it('should equals to the other card when titles and descriptions are the same', () => {
         const title = 'Task A';
         const description = 'Create datepicker';
         const point = 10;
         const card = Card(title, description, point);
         const otherCard = Card(title, description, point);

         expect(card.equals(otherCard)).to.be.true;
      });

      it('should not equal to the other card when the title is different', () => {
         const title = 'Task A';
         const description = 'Create datepicker';
         const point = 10;
         const card = Card(title, description, point);
         const otherCard = Card('Task B', description, point);

         expect(card.equals(otherCard)).to.be.false;
      });

      it('should not equal to the other card when the descript is different', () => {
         const title = 'Task A';
         const description = 'Create datepicker';
         const point = 10;
         const card = Card(title, description, point);
         const otherCard = Card(title, 'Hello', point);

         expect(card.equals(otherCard)).to.be.false;
      });

      it('should not equal to the other card when the both titles and descriptions are different', () => {
         const title = 'Task A';
         const description = 'Create datepicker';
         const point = 10;
         const card = Card(title, description, point);
         const otherCard = Card('title', 'description', point);

         expect(card.equals(otherCard)).to.be.false;
      });
   });
});