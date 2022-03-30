const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('delete request tests', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });
    const deleteTest = {name:'deleteTest', author:'deleteTestAuthor'};

    it('delete removes a book', async() => {
        //Act
        const res = await apiCall.post('/books',deleteTest);
        apiCall.delete('/books/' + res.data.id).then( () => {
            const getRes = apiCall.get('/books');
            getRes.data.map((book)=>{
                //Assert
                expect(book.id).to.not.equal(res.data.id);
            });
        });
    });

});