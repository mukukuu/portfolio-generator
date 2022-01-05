//import fs library
const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', fileContent, err => {
        //reject if got error
        if (err) {
            reject(err);
            return;
        }
           resolve({
            ok: true,
            message: 'File created'
        });   
      });
    });
};

//copy file
const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message:'stylesheet created'
            });
        });
    });
};

module.exports = { writeFile, copyFile };