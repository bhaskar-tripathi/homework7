var genHTML = require("./generateHTML");
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");
var pdfConverter = require('html-pdf');
var htmltopdf = require('htmltopdf');


function writeToFile(fileName, htmlContent) {
    fs.writeFile(fileName, htmlContent, function (err) {
        if (err) {
            console.log("Error writing file");
        }
        else {
            console.log("Profile successfully generated");
        }
    })
}

function init() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's your github ID?",
                name: "username"
            },
            {
                type: "list",
                message: "Pick the color of your profile?",
                name: "color",
                choices: ["Green", "Blue", "Pink", "Red"]
            },
        ])
        .then(function (response) {



            const queryUrl = `https://api.github.com/users/${response.username}`;

            axios.get(queryUrl).then(apiResponse => {
                var profileData = {
                    color: response.color.toLowerCase(),
                    profileImg: apiResponse.data.avatar_url,
                    name: apiResponse.data.name,
                    company: apiResponse.data.company,
                    location: apiResponse.data.location,
                    profile: apiResponse.data.html_url,
                    blog: apiResponse.data.blog,
                    bio: apiResponse.data.bio,
                    numRepos: apiResponse.data.public_repos,
                    numFollowers: apiResponse.data.followers,
                    numGitstats: apiResponse.data.public_gists,
                    numFollowing: apiResponse.data.following
                }

                var htmlContent = genHTML.generateHTML(profileData);
                var options = { "width": "8in" };
                pdfConverter.create(htmlContent, options).toFile(`./${response.username}-Profile.pdf`, function (err, res) {
                    if (err) return console.log(err);
                    // console.log(res);
                    writeToFile("userProfile.html", htmlContent);
                });

                // const htmlToPDF = new HTMLToPDF(htmlContent);

                // htmlToPDF.convert()
                //     .then((buffer) => {
                //         writeToFile("userProfile.html", buffer);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     });



            })


        });

}

init();