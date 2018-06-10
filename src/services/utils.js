const hasAccess = (req, res) => {
  if(!req.payload._id) {
    return res.status(401).json({
      "message": "Unauthorized",
    })
  } else {
    return true;
  }
}

module.exports = {
  hasAccess,
}