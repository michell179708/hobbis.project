const swaggerpractice = require ('swagger-autogen')();

const doc = {
    info: {
        title : 'Second API for the new project call HOBBIES',
        description: 'this API work witht the database MONGODB to get,update and delete contact information'
    },
    host: 'project-hobbiescse341.onrender.com',
    schemes: ['https']
};

const outputFile ='./swagger.json';
const endpoints = ['./app.js'];

//with this code will be generate the document swagger.json
swaggerpractice(outputFile, endpoints, doc);