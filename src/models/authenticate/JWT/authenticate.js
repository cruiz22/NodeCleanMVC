import jwt from 'jsonwebtoken';
import IAuthenticateModel from '../../interfaces/IAuthenticate.js'
import dotenv from 'dotenv';
dotenv.config();

export class AuthenticateModel extends IAuthenticateModel {
  static async login({ username }) {
    try {
      const user = { name: username };
      const accessToken = await jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.EXPIRES_IN }
      );
      return accessToken;
    } catch (error) {
      console.error('Error creating the login token');
      console.error(error);
      return;
    }
  }
}
