export const sendError = (res, err) => {
  res.status(500).send(`An error has occurred: ${err}`);
};
