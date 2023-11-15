export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Whooops - Not Found ${req.path}` });
};

export const internalErrorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
};
