import { verifyEmail, verifyPassword, encriptPassword } from '../helpers/user';
import { registerUser } from '../services/user';

export default {
  add: async (req, res) => {
    const { nombre, apellido, email } = req.body;
    const pwd = await verifyPassword(req.body.contraseña);
    if (!pwd) res.status(422).json('La contraseña debe tener minimo 8 caracteres y ser alfanumerica');
    const contraseña = await encriptPassword(req.body.contraseña);
    const emailVerify = verifyEmail(email);
    if (!emailVerify) res.status(422).json('El email no pertenece al dominio de la compañia');
    const addUser = await registerUser(nombre, apellido, email, contraseña);
    res.status(addUser.status).json(addUser.data);
  }
};
