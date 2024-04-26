import userModel from "../../models/userModel";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";

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

    const userFound = await userModel.getByEmail(email);
    if (!userFound) {
      return res.status(401).json({
        error: `Usuário não foi encontrado`,
      });
    }
    res.json({ message: "Login" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default login;
