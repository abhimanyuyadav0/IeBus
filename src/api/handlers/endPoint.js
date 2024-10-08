const apiEndPoint = {
   user:"/users",
   login:"/users/login",
   userById: (id) => `/users/${id}`,
   order:"/order",
   bus:"/bus",
   location:"/locations",
};
export default apiEndPoint;
