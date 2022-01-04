const fs = require('fs');
const inquirer = require('inquirer');

const generatePage = require('./src/page-template');



 const promptUser = () => {
 return inquirer.prompt([
   {
     type:'input',
     name:'name',
     message:'what is your name? (Required)',
     validate: nameInput => {
       if (nameInput) {
         return true;
       } else {
         console.log('please enter your name');
         return false;
       }
     }
   },
   {
     type:'input',
     name:'github',
     message:'Enter your GitHub Username (Required)',
     validate: GithubUsername => {
       if (GithubUsername) {
         return true;
       } else {
         console.log("enter GithubUsername");
         return false;
       }
     }
   },
   {
     type: 'confirm',
     name: 'confirmAbout',
     message: 'Would you like to enter some information about yourself for an "About" section?',
     default: true
   },
   {
     type: 'input',
     name: 'about',
     message: 'Provide some info bout urself:',
     when: ({confirmAbout}) => confirmAbout 
     }
  ]);
};



const promptProject = portfolioData => {

console.log(`
================
ADD A NEW PROJECT
================
`);

//if there's no project array property create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectName => {
        if (projectName) {
          return true; 
        } else {
          console.log('enter projectname');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('enter description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: projectLink => {
        if (projectLink) {
          return true;
        } else {
          console.log('enter a link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
  }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

     fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

       console.log('Page created! Check out index.html in this directory to see it!');
     });
  });

 







