import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolvers/resolvers.js";

const typeDefs = fs.readFileSync("graphql/schema.graphql", "utf8");

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`🚀 Server ready at: ${url}`);
