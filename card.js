'use strict';
module.exports = (pTitle = '', pDescription = '', pPoint = 0) => {
   let title = pTitle;
   let description = pDescription;
   let point = pPoint;

   const getTitle = () => {
      return title;
   };

   const getDescription = () => {
      return description;
   };

   const getPoint = () => {
      return point;
   };

   const equals = (otherCard) => {
      return otherCard.getTitle() === title && otherCard.getDescription() === description;
   };

   return {
      getTitle,
      getDescription,
      getPoint,
      equals
   };
};