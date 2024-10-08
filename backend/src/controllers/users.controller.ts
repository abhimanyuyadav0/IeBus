import bcrypt from 'bcrypt';
import {randomBytes} from 'crypto';
import {NextFunction, Request, Response} from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByIdV2,
  updateUser,
} from '../services/user.services';
import {loginOtp} from '../smsTemplates/loginOtp';
import {sendMailSignOtp} from '../config/mailer';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      mobile = '',
      profileImg = '',
      password = '',
    } = req?.body;

    let existingUser;
    console.log('test1');

    if (!email) {
      console.log('test2');
      return res
        .status(400)
        .json({message: 'Email is required.', status: 'success'});
    } else {
      existingUser = await getUserByEmail(email);
    }
    console.log('existingUser', existingUser);

    if (existingUser) {
      return res.status(400).json({message: 'Email already exists'});
    }
    const saltRounds = 10;
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : '';
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      profileImg: profileImg,
      password: hashedPassword,
    };
    console.log('email', email);

    const savedUser = await createUser(data);
    res.status(201).json({msg: 'User Created', savedUser});
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {type, city} = req.query;
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users: any = await getUserById(req.params.id);
    if (!users) {
      return res.status(404).json({message: 'Users not found'});
    }
    res.json({...users?._doc});
  } catch (error) {
    next(error);
  }
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {firstName, lastName, email, mobile, profileImg, password} =
      req?.body;

    const user = await getUserByIdV2(req.params.id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const saltRounds = 10;
    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    const data = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      mobile: mobile || user.mobile,
      profileImg: profileImg || user.profileImg,
      password: hashedPassword || user.password,
    };
    const updatedUser: any = await updateUser(req.params.id, data);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await deleteUser(req.params.id);
    if (!users) {
      return res.status(404).json({message: 'Users not found'});
    }
    res.json({message: 'Users deleted'});
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email;
    const inputPassword = req.body.password;
    let user;
    if (!email) {
      return res
        .status(400)
        .json({message: 'Email is required.', status: 'success'});
    } else {
      user = await getUserByEmail(email);
    }
    console.log('testing');
    if (user) {
      // const token = generateToken({ userId: user._id.toString() });
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
      if (isMatch) {
        return res.status(200).json(user);
      } else {
        return res
          .status(400)
          .json({message: 'Invalid password.', status: 'success'});
      }
    } else {
      return res
        .status(400)
        .json({message: 'User does not exist.', status: 'success'});
    }
  } catch (error) {
    next(error);
  }
};
