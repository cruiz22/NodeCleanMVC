import { validateUser } from '../schemas/user.js';

export class AuthenticateController {
  constructor({ authenticateModel }) {
    this.authenticateModel = authenticateModel;
  }

  login = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const accessToken = await this.authenticateModel.login(
      result.data.username
    );
    res.status(200).json({ accessToken });
  };
}
