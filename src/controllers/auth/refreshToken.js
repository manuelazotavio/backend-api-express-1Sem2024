import sessionModel from "../../models/sessionModel.js";

const logout = async (req, res) => {
  try {
    let token = false;
    token = req.cookies?.token;
    token = req.headers?.authorization?.split(" ")[1];

    //não passou token
    if (!token) {
      return res.status(401).json({
        error: `Usuário não autenticado`,
      });
    }
    //passou o token e ele ainda é ativo
    try {
      const { id, name } = jwt.verify(token, SECRET_KEY);
        return res.json({message: 'Token ativo', user: {id, name}})
       
    } catch (error) { 
    //token expirado
      if (error.name === "TokenExpiredError") {
        //obter os dados da session
        const session = await sessionModel.getByToken(token)
        console.log(session)

        //verificar se a data de criacao é menor que um dia
        
    
        //se nao for mais valido, deletar sessao, limpar o cookie 

        //gerar novo token e atualizar dados da sessao, gerar novo cookie


        return res.status(401).json({ error: "Token ativo." });
      }
      return res
        .status(401)
        .json({ error: "Token Inválido.", code: "invalid-token" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    // limpar dados bd
    await sessionModel.remove(req.userLogged.id, req.userLogged.token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default logout;
