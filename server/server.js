const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const _ = require('lodash');

let nutritions = [
  {
    id: 1,
    Dessert: 'Oreo',
    nutritionInfo: {
        calories: 437,
        fat: 18,
        carb: 63,
        protein: 4,
    }
  },
  {
    id: 2,
    Dessert: 'Nougat',
    nutritionInfo: {
        calories: 308,
        fat: 19,
        carb: 9,
        protein: 37,
    }
  },
  {
    id: 3,
    Dessert: 'Marshmallow',
    nutritionInfo: {
        calories: 318,
        fat: 8,
        carb: 81,
        protein: 2,
    }
  },
  {
    id: 4,
    Dessert: 'Lollipop',
    nutritionInfo: {
        calories: 398,
        fat: 2,
        carb: 98,
        protein: 0,
    }
  },
  {
    id: 5,
    Dessert: 'KitKat',
    nutritionInfo: {
        calories: 510,
        fat: 26,
        carb: 65,
        protein: 60,
    }
  }
];

const typeDefs = gql`
  type Nutrition {
    id: Int!,
    Dessert: String!,
    nutritionInfo: NutritionInfo!,
  }

  type NutritionInfo {
    calories: Int!,
    fat: Int!,
    carb: Int!,
    protein: Int!,
  }

  type NutritionOut {
    total: Int!,
    nutritions: [Nutrition],
  }

  type Query {
    nutritions(skip: Int, take: Int, sortKey: String, sortDir: String): NutritionOut
  }

  type Mutation {
    createNutrition(dessert: String!, calories: Int!, fat: Int!, carb: Int!, protein: Int!): Int
    removeNutrition(id: Int!): Int
    removeNutritions(ids: [Int!]!): [Int!]!
  }
`;

const resolvers = {
  Query: {
    nutritions: (parent, args, context, info) => {
      if(args.skip <= 0 || args.take <= 0) {
        return {nutritions, total: nutritions.length};
      } else {
        let list = _.assign([], nutritions);
        if(!_.isEmpty(args.sortKey)) {
          list = _.orderBy(list, [args.sortKey], [args.sortDir || 'asc']);
        }
        list = list.slice(args.skip - 1, (args.skip - 1) + args.take);        

        return {nutritions: list, total: nutritions.length};
      }
    }
  },

  Mutation: {
    createNutrition: (parent, args, context, info) => {
      const id = (_.sortBy(nutritions.map(n => n.id)).slice(-1).pop() || 0) + 1;

      nutritions.push({
        id,
        Dessert: args.dessert,
        nutritionInfo: {
            calories: args.calories,
            fat: args.fat,
            carb: args.carb,
            protein: args.protein,
        }
      });

      return id;
    },
    removeNutrition: (parent, args, context, info) => {
      let removed = false;
      const id = args.id;

      for (let i in nutritions) {
        if (nutritions[i].id === id) {
          nutritions.splice(i, 1);
          removed = true;
        }
      }

      return removed ? id : 0;
    },
    removeNutritions: (parent, args, context, info) => {
      let removed = 0;
      const ids = args.ids;

      nutritions = nutritions.filter(n => ids.indexOf(n.id) < 0)

      return ids;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);