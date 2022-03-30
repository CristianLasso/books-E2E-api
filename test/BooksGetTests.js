const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('get request tests', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });

    it('get info is not empty', async() => {
        //Act
        const res = await apiCall.get('/books');

        //Assert
        expect(res.data).to.not.be.empty;
    });

    it('get brings the info', async() => {
        //Act
        const res = await apiCall.get('/books');

        //Assert
        expect(res.status).to.equal(200);
    });

    it('get update the new info', async() => {
        //Act
        const firstRes = await apiCall.get('/books');
        const postRes = await apiCall.post('/books',{name:'dummy', author:'dummyAuthor'});
        const secondRes = await apiCall.get('/books');
    
        //Assert
        assert.isTrue(firstRes.data.length < secondRes.data.length);

        //Delete dummy book
        apiCall.delete('/books/' + postRes.data.id);
    });


});