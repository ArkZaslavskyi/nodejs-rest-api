const handleSchemeValidationError = (err, _, next) => {
  // --
  const isConflict = ({ name, code }) =>
    name === "MongoServerError" && code === 11000;
  //
  const capsFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  // --

  err.status = isConflict(err) ? 409 : 400;

  if (err.status === 409) {
    err.message = capsFirstLetter(`${Object.keys(err.keyValue)[0]} in use`);
  }

  next();
};

module.exports = handleSchemeValidationError;
