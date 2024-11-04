import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({
      errors: ['Login required'],
    });
  }

  try {
    const [, token] = authorization.split(' ');
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('os seus dados são:', dados);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(201).json({
      errors: ['Token invalido ou expirado'],
    });
  }
};
