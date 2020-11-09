const inquirer = require('inquirer');
const HttpRequest = require('./HttpRequest')

var productModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all products', 'Create product','Update product', 'Delete product', 'Back'],
    message: 'Select the option:'
};

var productOrderBy = {
    name: 'funtion',
    type: 'list',
    choices:   ['id', 'name', 'value'], 
    message: 'Order products by:'
};

var productContinue = {
    name: 'enter',
    type: 'input',
    message: 'Press "enter" to continue:',
}

var productCreate = [
{
    type: 'input',
    name: 'categories',
    message: 'Insert product categories: (Follow the model: id1,id2,id3...):',
    validate(value) {
        if (value.length) {
            return (true);
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
{
    type: 'input',
    name: 'name', 
    message: 'Insert the product name:',
    validate(value) {
        if (value.length) {
            return (true);
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
{
    type: 'input',
    name: 'description', 
    message: 'Insert the product description:',
    validate(value) {
        if (value.length) {
            return (true);
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
{
    type: 'input',
    name: 'value',
    message: 'Insert the product value:',
    validate: function (value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "value" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
];

var productUpdateId = {
    name: 'id',
    type: 'input',
    message: 'Insert the product to be updated by id:',
    validate(value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "id" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
};

var productUpdate = [
    {
        type: 'input',
        name: 'categories',
        message: 'Insert new product categories: (Follow the model: id1,id2,id3...):',
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'name', 
        message: 'Insert the new product name:',
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'description', 
        message: 'Insert the new product description:',
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'value',
        message: 'Insert the new product value:',
        validate: function (value) {
            if(isNaN(value) == false){
                return (true);
            }
            else{
                return 'Error! The "value" field must be a number.';
            }
        }
    },
];

var productDelete = {
    name: 'id',
    type: 'input',
    message: 'Insert the product to be deleted by id:',
    validate(value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "id" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
};

module.exports = {

    productModule(){
        console.clear();
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
                                setTimeout(function() {
                                    HttpRequest.listProducts(1);
                                    setTimeout(function() { 
                                        console.log('\n');
                                        inquirer.prompt(productContinue)
                                        .then(answers => {
                                            const cli = require('./cliProductModule')
                                            cli.productModule();
                                        }).catch(error => {
                                            if(error.isTtyError) {
                                                // Prompt couldn't be rendered in the current environment
                                            } else {
                                                // Something else when wrong
                                            }
                                        });
                                    }, 500);
                                }, 500);
                            break;
                            case 'name':
                                setTimeout(function() {
                                    HttpRequest.listProducts(2);
                                    setTimeout(function() { 
                                        console.log('\n');
                                        inquirer.prompt(productContinue)
                                        .then(answers => {
                                            const cli = require('./cliProductModule')
                                            cli.productModule();
                                        }).catch(error => {
                                            if(error.isTtyError) {
                                                // Prompt couldn't be rendered in the current environment
                                            } else {
                                                // Something else when wrong
                                            }
                                        });
                                    }, 500);
                                }, 500);
                            break;
                            case 'value':
                                setTimeout(function() {
                                    HttpRequest.listProducts(3);
                                    setTimeout(function() { 
                                        console.log('\n');
                                        inquirer.prompt(productContinue)
                                        .then(answers => {
                                            const cli = require('./cliProductModule');
                                            cli.productModule();
                                        }).catch(error => {
                                            if(error.isTtyError) {
                                                // Prompt couldn't be rendered in the current environment
                                            } else {
                                                // Something else when wrong
                                            }
                                        });
                                    }, 500);
                                }, 500);
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
                    console.clear();
                    HttpRequest.listCategories();
                    setTimeout(function() {
                        console.log('\n');
                        inquirer.prompt(productCreate)
                        .then(answers => {
                            option = answers;
                            console.clear();
                            HttpRequest.createProduct(option.name, option.description, option.value, option.categories);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(productContinue)
                                .then(answers => {
                                    const cli = require('./cliProductModule');
                                    cli.productModule();
                                }).catch(error => {
                                    if(error.isTtyError) {
                                        // Prompt couldn't be rendered in the current environment
                                    } else {
                                        // Something else when wrong
                                    }
                                });
                            }, 1000);
                        }).catch(error => {
                            if(error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else when wrong
                            }
                        });
                    }, 500);
                break;
                case 'Update product':
                    HttpRequest.listProducts(1);
                    setTimeout(function() {
                    inquirer.prompt(productUpdateId)
                    .then(answers => {
                        const id = answers.id;
                        console.clear();
                        HttpRequest.listCategories();
                        setTimeout(function() {
                            console.log('\n');
                            inquirer.prompt(productUpdate)
                            .then(answers => {
                                option = answers;
                                console.clear();
                                HttpRequest.updateProduct(id, option.name, option.description, option.value, option.categories);
                                setTimeout(function() { 
                                    inquirer.prompt(productContinue)
                                    .then(answers => {
                                        const cli = require('./cliProductModule');
                                        cli.productModule();
                                    }).catch(error => {
                                        if(error.isTtyError) {
                                        // Prompt couldn't be rendered in the current environment
                                        } else {
                                        // Something else when wrong
                                        }
                                    });
                                }, 1000);
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
                case 'Delete product':
                    HttpRequest.listProducts(1);
                    setTimeout(function() {
                        console.log('\n');
                        inquirer.prompt(productDelete)
                        .then(answers => {
                            const id = answers.id;
                            console.clear();
                            HttpRequest.deleteProduct(id);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(productContinue)
                                .then(answers => {
                                    const cli = require('./cliProductModule');
                                    cli.productModule();
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




