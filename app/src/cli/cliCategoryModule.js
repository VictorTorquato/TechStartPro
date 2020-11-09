const inquirer = require('inquirer');
const HttpRequest = require('./HttpRequest')

var categoryModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all categories', 'List category products', 'Create categories by ".app/Categories.scv" file', 'Back'],
    message: 'Select the option:'
};

var categoryId = {
    name: 'id',
    type: 'input',
    message: 'Insert the category by id:',
    validate: function (value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "id" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
};

var categoryContinue = {
    name: 'enter',
    type: 'input',
    message: 'Press "enter" to continue:',
}

module.exports = {

    categoryModule(){
        console.clear();
        console.log('Category Module\n');
        inquirer.prompt(categoryModule)
        .then(answers => {
            console.clear();
            option = answers.funtion;
            switch(option){
                case 'List all categories':
                    setTimeout(function() {
                        HttpRequest.listCategories();
                        setTimeout(function() { 
                            console.log('\n');
                            inquirer.prompt(categoryContinue)
                            .then(answers => {
                                const cli = require('./cliCategoryModule');
                                cli.categoryModule();
                            }).catch(error => {
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        }, 500);
                    }, 500)
                break;
                case 'List category products':
                    HttpRequest.listCategories();
                    setTimeout(function() {
                        console.log('\n');
                        inquirer.prompt(categoryId)
                        .then(answers => {
                            console.clear();
                            option = answers.id;
                            HttpRequest.listCategoryProducts(option);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(categoryContinue)
                                .then(answers => {
                                    const cli = require('./cliCategoryModule');
                                    cli.categoryModule();
                                }).catch(error => {
                                    if(error.isTtyError) {
                                        // Prompt couldn't be rendered in the current environment
                                    } else {
                                        // Something else when wrong
                                    }
                                });
                            }, 500);
                        }).catch(error => {
                            if(error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else when wrong
                            }
                        });
                    }, 500);
                break;
                case 'Create categories by ".app/Categories.scv" file':
                    console.clear();
                    console.log('\nAdding categories from the "Categories.scv"..');
                    HttpRequest.createCategoriesBySCV();
                    setTimeout(function() { 
                        console.log('\n');
                        inquirer.prompt(categoryContinue)
                        .then(answers => {
                            const cli = require('./cliCategoryModule');
                            cli.categoryModule();
                        }).catch(error => {
                            if(error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else when wrong
                            }
                        });
                    }, 1500);
                break;
                case 'Back':
                    const cli = require('./cli');
                    cli.menu();
                break;
            }
        }).catch(error => {
            if(error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });    
    },

}