export const getCurrentUser = async (req, res) => {
  const { name, email, subscription, avatarURL } = req.user;

  res.json({
    status: "Success",
    code: 200,
    data: { name, email, subscription, avatarURL },
  });
};
