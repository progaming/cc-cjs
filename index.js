const fs = require('fs');
const files = fs.readdirSync(`${__dirname}/dist`);

let modules = {};
files.forEach((file) => {
  modules = { ...modules, ...require(`./dist/${file}`) };
});

module.exports = modules;
