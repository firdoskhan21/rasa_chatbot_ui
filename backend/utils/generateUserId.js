const { v4: uuidv4 } = require('uuid');

const generateUserId = () => {
  return `user-${uuidv4()}`;
};

module.exports = generateUserId;
