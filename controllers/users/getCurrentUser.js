export const getCurrentUser = async (req, res) => {
  const { name, email, subscription, avatarURL } = req.user;

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};
