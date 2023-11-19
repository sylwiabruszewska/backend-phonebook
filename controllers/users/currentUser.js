export const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  return res.status(200).json({
    data: {
      email,
      subscription,
    },
  });
};
