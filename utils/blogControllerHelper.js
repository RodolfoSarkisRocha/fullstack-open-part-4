const notExists = (value) => value === undefined || value === null;

const verifyTitleAndUrl = ({ title, url }) => {
  if (notExists(title) || notExists(url)) return true;
  return false;
};

module.exports = {
  verifyTitleAndUrl,
  notExists,
};
