// middleware/opsMiddleware.js
const opsOnly = (req, res, next) => {
  if (req.user.role !== 'ops') {
    return res.status(403).json({ message: 'Ops only' })
  }
  next()
}

export default opsOnly