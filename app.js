const inquirer = require('inquirer');

// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

inquirer
.prompt([
  {
    type:'input',
    name:'name',
    message:'what is your name?'
  }
]).then(answers => console.log(answers));





// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw err;

//   console.log(' check html');
// });


