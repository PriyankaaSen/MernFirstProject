const baseUrl = 'http://localhost:3000';

export const api = 'http://localhost:3000/admin/signin';
// export const generatePublicUrl = (fileName) => {
//   return `${baseUrl}/public/${fileName}`;
// };
export const generatePublicUrl = (fileName) => {
  return `http://localhost:3000/public/${fileName}`;
};
