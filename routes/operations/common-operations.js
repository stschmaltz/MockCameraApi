export const sendError = err => {
  res.status(500).send(`An error has occurred: ${err}`);
};
