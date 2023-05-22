import { blogs } from "../../data.js";

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
};
