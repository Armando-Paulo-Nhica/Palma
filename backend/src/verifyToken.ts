import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET: number = parseInt('hsI89nDq32nsk' as string, 10);
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token as string;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, SECRET.toString(), (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user as any;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if ((req.user as any).id === req.params.id || (req.user as any).isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if ((req.user as any).isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
