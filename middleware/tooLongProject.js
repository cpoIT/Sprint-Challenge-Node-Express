module.exports = (req, res, next) => {
  req.body.name && req.body.description
  ? req.body.name.length < 129
  ? next()
  : res.json({ errorMessage: "provide a 'name' with less than 129 characters please" })
  : res.json({ errorMessage: "provide a 'name' with less than 129 characters, and 'description'" });
  };