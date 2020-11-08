var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let xhr = new XMLHttpRequest();

module.exports = {

    listCategories(){
        xhr.open('GET', ("http://localhost:3333/category"), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    listCategoryProducts(categoryId){
        xhr.open('GET', ("http://localhost:3333/category/"+categoryId), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    createCategoriesBySCV(){
        xhr.open('POST', ("http://localhost:3333/category/scv/Categories.scv"), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    listProducts(sortCommand){
        xhr.open('GET', ("http://localhost:3333/product/"+sortCommand), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    createProduct(category){
        xhr.open('POST', ("http://localhost:3333/product/"+category), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    deleteProduct(id){
        xhr.open('DELETE', ("http://localhost:3333/product/"+id), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    updateProduct(newCategories){
        xhr.open('PUT', ("http://localhost:3333/product/"+newCategories), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    }
}
