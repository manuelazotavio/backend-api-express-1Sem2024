import userModel from "../../models/userModel.js"

const update = async (req, res) => {
    try{
        const id = +req.params.id
        const user = req.body
        const userEditado = await userModel.edit({id, ...user})
        res.json({
            success: `Usuário ${id} editado com sucesso!`,
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