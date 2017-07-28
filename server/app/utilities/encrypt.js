const  bcrypt = require('bcrypt-nodejs');


const encrypt = (input) => bcrypt.hashSync(input);

const dencrypt = (plainValue, encryptedValue) => {
  const realValue = bcrypt.compareSync(plainValue, encryptedValue);
  return realValue;
};


module.exports = {
  encrypt,
  dencrypt
};