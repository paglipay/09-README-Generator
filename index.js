var inquirer = require("inquirer");
var axios = require("axios");
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

            axios
                .get(`https://api.github.com/users/${response.username}`)
                .then(function (res) {
                    console.log(res.data);
                    //console.log(response);
                    response['avatar_url'] = res.data['avatar_url'];
                    response['html_url'] = res.data['html_url'];
                    let output = generateMarkdown(response);
                    console.log(output);
                    writeToFile('README.md', output);

                });



        });
}
init();