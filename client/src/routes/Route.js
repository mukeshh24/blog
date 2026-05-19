const IndexRoute = "/";
const SignInRoute = "/sign-in";
const SignUpRoute = "/sign-up";
const ProfileRoute = "/profile";
const CategoryDetailsRoute = "/categories";
const CategoryAddRoute = "/categories/add";
const CategoryEditRoute = (categoryId) => {
  if (categoryId) {
    return `/categories/edit/${categoryId}`;
  } else {
    return `/categories/edit/:categoryId`;
  }
};
const BlogRoute = "/blogs";
const BlogAddRoute = "/blogs/add";
const BlogEditRoute = (blogId) => {
  if (blogId) {
    return `/blogs/edit/${blogId}`;
  } else {
    return `/blogs/edit/:blogId`;
  }
};
const BlogDetailaRoute = (category, slug) => {
  if (!category || !slug) {
    return `/blogs/:category/:slug`;
  } else {
    return `/blogs/${category}/${slug}`;
  }
};
const BlogByCategoryRoute = (category) => {
  if (!category) {
    return `/blogs/:category`;
  } else {
    return `/blogs/${category}`;
  }
};
const CommentDetailsRoute = "/comments";
const UserDetailsRoute = "/users";

export {
  IndexRoute,
  SignInRoute,
  SignUpRoute,
  ProfileRoute,
  CategoryDetailsRoute,
  CategoryAddRoute,
  CategoryEditRoute,
  BlogRoute,
  BlogAddRoute,
  BlogEditRoute,
  BlogDetailaRoute,
  BlogByCategoryRoute,
  CommentDetailsRoute,
  UserDetailsRoute,
};
