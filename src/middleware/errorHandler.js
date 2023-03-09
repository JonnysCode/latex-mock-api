function errorHandler(err, res) {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal server error' });
}

module.exports = errorHandler;
