export const pathFinal = (reqPath) => {
  let path = reqPath.split("/");
  return path[path.length - 1];
};
