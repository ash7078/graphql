const graphql = require('graphql');

const axios = require('axios');

const {

    GraphQLObjectType,

    GraphQLString,

    GraphQLInt,

    GraphQLNonNull,

    GraphQLSchema

} = graphql;

const ProductType = new GraphQLObjectType({

         name: 'Product',

         fields : {

            name: {

                type :GraphQLString
            },

           price : {
                
              type : GraphQLString

            },

            id : {

                type : GraphQLInt
            }
         }
 });


//// creating query  builder

const RootQuery = new GraphQLObjectType({

              name: 'RootQueryType',  

        fields : {

              product :{

                type : ProductType,

            args : {

                id : {

                type : GraphQLInt

               }

            },        

            resolve(parentValue,args) {

                return axios.get(`http://localhost:3000/products/id=${args.id}`)

                   .then(resp => {

                    return resp.data[1];
                 })
                   .catch(err => err);

            }

        }
    }

})   
                

// let creating mutation //////////////////////////////////////////////////////////////////

const mutation =  new GraphQLObjectType({

    name: 'Mutation',

    fields: { 

        addProduct : {
         
            type: ProductType,

            args: {

                name: {

                    type: GraphQLString
                },

                price : {

                    type: GraphQLString
                },

                id : {

                    type: GraphQLInt
                }
            }, 

            resolve(parentValue,args) {

                const {

                    name,

                    id,

                    price

                } = args;

                return axios.post(`http://localhost:4000/products`,{name,id,price})

                 .then (resp =>{

                    return resp.data;
                }) 
                
                .catch(err => err);

            }
        }
    }
})

/// creating schema  definition

module.exports = new GraphQLSchema({

    query:RootQuery,

    mutation : mutation
});