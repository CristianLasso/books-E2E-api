const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('post request tests', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });

    it('post create a new book', async() => {

        const postTest = {name:'postTest', author:'postTestAuthor'};

        //Act
        const res = await apiCall.post('/books',postTest);

        //Assert
        expect(res.status).to.equal(200);
        assert.equal(res.data.name, postTest.name);
        assert.equal(res.data.author, postTest.author);

        //Delete postTest
        apiCall.delete('/books/' + res.data.id);

    });

    it('post do not create an invalid book', async() => {

        const invalidBook = {name:'book'};

        //Act
        const response = await apiCall.post('/books',invalidBook);
        
        //Assert
        expect(response.status).to.equal(400);

        //Delete postTest
        apiCall.delete('/books/' + response.data.id);
    });

    it('post do not create an empty book', async() => {

        const emptyBook = {};

        //Act
        const res = await apiCall.post('/books',emptyBook);

        //Assert
        expect(res.status).to.equal(400);

        //Delete postTest
        apiCall.delete('/books/' + res.data.id);
    });

});