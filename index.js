var inquirer = require("inquirer");

const fs = require("fs");
const util = require("util");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let output = '';
const prompt_list = [
    {
        type: "input",
        message: "What is your user name?",
        name: "username"
    },
    {
        type: "password",
        message: "What is your password?",
        name: "password"
    },
    {
        type: "password",
        message: "Re-enter password to confirm:",
        name: "confirm"
    },

    {
        type: "input",
        message: "Project title:",
        name: "title"
    },
    {
        type: "input",
        message: "Description:",
        name: "description"
    },
    {
        type: "input",
        message: "Table of Contents:",
        name: "toc"
    },
    {
        type: "input",
        message: "Installation:",
        name: "installation"
    }
];

const prompt_list_test = [
    {
        type: "input",
        message: "What is your user name?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your description?",
        name: "description"
    }
];

inquirer
    .prompt(prompt_list_test)
    .then(function (response) {

        if (response.confirm === response.password) {
            console.log("Success!");
        }
        else {
            console.log("You forgot your password already?!");
        }

        let output = '';

        for (property in response) {
            console.log(`key= ${property} value = ${response[property]}`)
            output += `# ${property.capitalize()}: ${response[property]}\n\n`
        }

        writeFileAsync("README.md", output).then(function () {
            console.log("Successfully wrote to README.md file");
        });

    });


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}