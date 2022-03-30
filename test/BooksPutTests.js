const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('put request tests', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });
    const putTest = {name:'putTest', author:'putTestAuthor'};

    it('put updates the book info', async() => {
        //Act
        const res = await apiCall.post('/books',putTest);
        const changeRes = await apiCall.put('/books/'+ res.data.id, {name:"putTestChange", author:"putTestAuthorChange"});

        //Assert
        expect(res.data.name).to.not.equal(changeRes.data.name);
        expect(res.data.author).to.not.equal(changeRes.data.author);

        //Delete putTest
        apiCall.delete('/books/' + changeRes.data.id);
    });

    it('put can not update the data with invalid fields', async() => {

        const invalidBook = {name:'book'};

        //Act
        const res = await apiCall.post('/books',putTest);
        const changeRes = await apiCall.put('/books/'+ res.data.id, invalidBook);

        //Assert
        expect(changeRes.status).to.equal(400);

        //Delete putTest
        apiCall.delete('/books/' + changeRes.data.id);
    });

    it('put can not update a book with empty data', async() => {

        const emptyBook = {};

        //Act
        const res = await apiCall.post('/books',putTest);
        const changeRes = await apiCall.put('/books/'+ res.data.id, emptyBook);

        //Assert
        expect(changeRes.status).to.equal(400);

        //Delete putTest
        apiCall.delete('/books/' + changeRes.data.id);
    });

});