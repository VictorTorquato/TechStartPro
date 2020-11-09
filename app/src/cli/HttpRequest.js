var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {

    listCategories(){
        let xhr = new XMLHttpRequest();
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
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ("http://localhost:3333/category/"+categoryId), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    createCategoriesBySCV(){
        let xhr = new XMLHttpRequest();
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
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ("http://localhost:3333/product/"+sortCommand), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 201) {
                let response = xhr.responseText;
                console.log(response);
                return(response);
            }
        }
    },

    existProduct(id)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ("http://localhost:3333/product/exist/"+id), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;
        
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                return(1);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                return(0);
            }
        }
    },

    createProduct(name, description, value, category){
        let xhr = new XMLHttpRequest();
        var params = {
        name:name,
        description: description,
        value: value };

        xhr.open('POST', ("http://localhost:3333/product/"+category), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));
        
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 201) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    deleteProduct(id){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', ("http://localhost:3333/product/"+id), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    updateProduct(id, newName, newDescription, newValue, newCategories){
        let xhr = new XMLHttpRequest();

        var params = {
            id: id,
            newName: newName,
            newDescription: newDescription,
            newValue: newValue };
        
        xhr.open('PUT', ("http://localhost:3333/product/"+newCategories), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 201) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    }
}
