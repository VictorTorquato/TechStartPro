const { json } = require('express');
const figlet = require('figlet');
const inquirer = require('inquirer');
const HttpRequest = require('./HttpRequest')

var productModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all products', 'Create product','Update product', 'Delete product'],
    message: 'Select the option:'
};

var productOrderBy = {
    name: 'funtion',
    type: 'list',
    choices:   ['id', 'name', 'value'], 
    message: 'Order products by:'
};

var categoryModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all categories', 'List category products', 'Create categories by ".app/Categories.scv" file'],
    message: 'Select the option:'
};

var categoryId = {
    name: 'id',
    type: 'input',
    message: 'Select the category:'
};

var menuInit = {
    name: 'module',
    type: 'list',
    choices:   ['Category', 'Product', 'Exit'],
    message: 'Select the module:'
};

module.exports = {

    menu() {

        console.clear();

        console.log(figlet.textSync('TechStartPro API', { horizontalLayout: 'full' }));

        var option = '';

        inquirer.prompt(menuInit)
        .then(answers => {

            option = answers.module;
            console.clear();

            switch (option) {
                case 'Category':
                        console.log('Category Module\n');
                        inquirer.prompt(categoryModule)
                        .then(answers => {
                            option = answers.funtion;
                            console.clear();
                            switch(option){
                                case 'List all categories':
                                        HttpRequest.listCategories();
                                    break;
                                case 'List category products':
                                        HttpRequest.listCategories();
                                        inquirer.prompt(categoryId)
                                        .then(answers => {
                                            console.clear();
                                            option = answers.id;
                                            HttpRequest.listCategoryProducts(option);
                                        }).catch(error => {
                                            if(error.isTtyError) {
                                                // Prompt couldn't be rendered in the current environment
                                            } else {
                                                // Something else when wrong
                                            }
                                        });
                                    break;
                                case 'Create categories by ".app/Categories.scv" file':
                                        console.log('\nAdding categories from the "Categories.scv"...\n');
                                        HttpRequest.createCategoriesBySCV();
                                        setTimeout(function() {
                                            HttpRequest.listCategories();
                                          }, 4000)
                                    break;

                            }


                        // }).catch(error => {
                        //     if(error.isTtyError) {
                        //         // Prompt couldn't be rendered in the current environment
                        //     } else {
                        //         // Something else when wrong
                        //     }
                        });
                    
                    break;
                case 'Product':
                        console.log('Product Module\n');
                        inquirer.prompt(productModule)
                        .then(answers => {
                            option = answers.funtion;
                            console.clear();
                            switch(option){
                                case 'List all products':
                                    inquirer.prompt(productOrderBy)
                                    .then(answers => {
                                        option = answers.funtion;
                                        console.clear();
                                        switch(option){
                                            case 'id':
                                                HttpRequest.listProducts(1)
                                                break;
                                            case 'name':
                                                HttpRequest.listProducts(2)
                                                break;
                                            case 'value':
                                                HttpRequest.listProducts(3)
                                                break;
                                        }
                                    }).catch(error => {
                                    if(error.isTtyError) {
                                        // Prompt couldn't be rendered in the current environment
                                    } else {
                                        // Something else when wrong
                                    }
                                    });
                                    break;
                                case 'Create product':

                                    break;
                                case 'Update product':

                                    break;
                                case 'Delete product':

                                    break;
                            }
                        }).catch(error => {
                            if(error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else when wrong
                            }
                        });
                    break;
                case 'Exit':
                        console.log('Exiting...\n');
                        process.kill(process.pid, 'SIGTERM');
                    break;
                default:
                    console.log('\nError! Unknown command.');
                    break;
            }
        }).catch(error => {
        if(error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
        });
    }
}