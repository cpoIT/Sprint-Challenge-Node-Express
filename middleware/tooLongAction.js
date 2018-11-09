module.exports = (req, res, next) => {
  req.body.project_id && req.body.description && req.body.notes
  ? req.body.description.length < 129
  ? next()
  : res.json({ errorMessage: "provide a 'description' with less than 129 characters please" })
  : res.json({ errorMessage: "provide a established 'project_id', a 'description' with less than 129 characters, and 'notes'" });
  };