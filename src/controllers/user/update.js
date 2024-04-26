import userModel from "../../models/userModel.js"

const update = async (req, res) => {
    try{
        user.id = +req.params.id
        const user = req.body
        const result = userModel.validateUserToEdit(user)
        if(!result.success){
            return res.status(400).json({
                error: `Dados de Cadastro Inválido`,
                fields: zodErrorFormat(result.error)
            })
        }
        const userEditado = await userModel.edit(user)
        res.json({
            success: `Usuário ${userEditado.id} editado com sucesso!`,
            user: userEditado
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default update