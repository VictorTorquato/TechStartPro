const figlet = require('figlet');
const inquirer = require('inquirer');
const cliCategoryModule = require('./cliCategoryModule');
const cliProductModule = require('./cliProductModule');


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
                            cliCategoryModule.categoryModule();
                        break;
                    case 'Product':
                            cliProductModule.productModule();
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