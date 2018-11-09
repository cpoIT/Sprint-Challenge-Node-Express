module.exports = (req, res, next) => {
  const { project_id } = req.body;
  console.log(project_id)
  if (!project_id) {
    res.status(404).json({ errorMessage: 'project_id must be included' })
    next()
  } else if (typeof (project_id/1) !== 'number') {
    res.status(404).json({ errorMessage: 'project_id must be a number' })
    next();
  } else {
    next();
  }
}