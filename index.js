var inquirer = require("inquirer");

const generateMarkdown = require("./generateMarkdown.js");
const fs = require("fs");
const util = require("util");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


function writeToFile(fileName, data) {

    writeFileAsync(fileName, data).then(function () {
        console.log("Successfully wrote to README.md file");
    });
}

function init() {

    const questions = [
        {
            type: "input",
            message: "What is your user name?",
            name: "username"
        },
        {
            type: "input",
            message: "Project title:",
            name: "title"
        },
        {
            type: "input",
            message: "What is your description?",
            name: "description"
        },
        {
            type: "input",
            message: "What is your list?",
            name: "list_items"
        }
    ];

    inquirer
        .prompt(questions)
        .then(function (response) {

            //console.log(response);
            let output = generateMarkdown(response);
            console.log(output);
            writeToFile('README.md', output);
        });
}
init();