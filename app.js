const express = require('express');

const expressGraphQL = require('express-graphql').graphqlHTTP;
// import the express-graphql 

// import the schema // 

const schema = require('./Schema/schema');

const app = express();

const port  =4000;

app.use('/graphql',expressGraphQL({

    graphiql: true,

    schema 
}));

app.listen(port , ()=>{

    console.log(`server is running on port ${port}`);
});