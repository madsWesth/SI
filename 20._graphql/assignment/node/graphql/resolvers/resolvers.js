import { blogs, users } from "../../data.js";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";

let BLOGS_HIGHEST_ID = blogs.reduce(
  (acc, element) => (element.id > acc ? element.id : acc),
  0
);

let USERS_HIGHEST_ID = users.reduce(
  (acc, element) => (element.id > acc ? element.id : acc),
  0
);

export const resolvers = {
  Query: {
    blogs: () => ({ blogs }),
    blog: (parent, args, contextValue, info) => {
      const blogId = args.blogId;
      const blog = blogs.find((blog) => Number(blogId) === blog.id);
      if (!blog) return { errors: [`blog with id ${blogId} not found`] };
      return { blog };
    },
  },
  Mutation: {
    createblog: (parent, args, contextValue, info) => {
      const { title, description } = args;
      if (!(title && description)) {
        throw new GraphQLError("missing either title or description", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const newId = ++BLOGS_HIGHEST_ID;

      const newBlog = {
        id: newId,
        title,
        description,
        completed: false,
      };
      blogs.push(newBlog);

      return { id: newId };
    },
    createUser: (parent, args, contextValue, info) => {
      const { email, password } = args;
      if (!(email && password)) {
        throw new GraphQLError("missing either username or password", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const newId = ++USERS_HIGHEST_ID;

      const newUser = {
        id: newId,
        email,
        password,
      };
      users.push(newUser);

      return { id: newId };
    },
    createToken: (parent, args, contextValue, info) => {
      const { email, password } = args;
      // just returns a dummy token since the point of this isnt to build auth

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new GraphQLError("no user found matching credentials", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      return { token: "dummy token" };
    },
  },
};
