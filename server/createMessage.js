'use strict';

const createMessage = (type, needData) => {
  const methods = {
    successfulCreate() {
      const { id } = needData;
      return JSON.stringify({type: 'successfulCreate', id});
    },
    unsuccessfulCreate() {
      return JSON.stringify({type: 'unsuccessfulCreate'});
    }
  };
  
  return methods[type]();
};

module.exports = createMessage;