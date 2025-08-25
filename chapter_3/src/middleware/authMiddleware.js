import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']
  // console.log('Auth header:', token)

  if (!token) return res.status(401).json({ message: 'No token provided' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.log('JWT error:', err.message)
      return res.status(401).json({ message: 'Invalid token' })
    }
    // console.log('Decoded token:', decoded)
    req.userId = decoded.id
    next()
  })
}

export default authMiddleware
