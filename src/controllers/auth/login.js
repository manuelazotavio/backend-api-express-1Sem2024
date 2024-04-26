import userModel from "../../models/userModel.js";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js";


const login = async (req, res) => {
  try {
    //pegar os dados da rquisição (tela de login)
    const { email, pass } = req.body;

    //fazer a validação dos dados
    const result = userModel.validateUserToLogin({ email, pass });

    if (!result.success) {
      return res.status(400).json({
        error: `Dados de Login Inválidos`,
        fields: zodErrorFormat(result.error),
      });
    }
    //encontrar se o usuario existe vendo o email
    const userFound = await userModel.getByEmail(email);
    if (!userFound) {
      return res.status(401).json({
        error: `Usuário não foi encontrado`,
      });
    }

    //comparar se a senha informada bate com o hash salvo
    //pass é oq é colocado no meu body, e o userFound.pass é oq esta gravado no banco ja com o hash

    const passIsValid = await bcrypt.compare(pass, userFound.pass)

    //validacao da senha
    if(!passIsValid){
        return res.status(401).json({
            error: `E-mail ou senha inválidos`,
          });
    }

    //se o email esta certo e a senha tambem, vou gerar o token do usuario
    const token = jwt.sign({id: userFound.id, name: userFound.name}, SECRET_KEY, {expiresIn: '3m'}
    )



    res.json({ message: "Login feito com sucesso", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default login;
