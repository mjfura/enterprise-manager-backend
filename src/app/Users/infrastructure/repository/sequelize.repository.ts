import { ResponseErrorValue } from "../../../../domain/responser"
import { ResponseUserEntity, UserEntity, UserRepository, UserValue } from "../../domain"
import { UserModel } from "../model"

export class SequelizeRepository implements UserRepository {
    
    async createUser(body: UserValue): Promise<ResponseUserEntity | ResponseErrorValue> {
        try{
            const newUser=await UserModel.create(body)
            return newUser
        }catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al crear un usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }   

            })
            return responseError
        }
    }
    async getUserByEmpresaAndCorreo(empresa: string, correo: string): Promise<ResponseUserEntity | ResponseErrorValue> {
        try{
            const user=await UserModel.findOne({
                where:{
                    empresa_id:empresa,
                    correo
                }
                
            })
            if(!user) throw new Error("Usuario no encontrado")
            return user
        }
        catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al obtener el usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }
            })
            return responseError
        }
    }
    async editUser(id:string,params: Partial<Omit<UserEntity,'id'>>): Promise<ResponseUserEntity | ResponseErrorValue> {
        try{
            const user=await UserModel.findByPk(id)
            if(!user) throw new Error("Usuario no encontrado")
            const response=await user.update(params)
            
            return response
        }
        catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al obtener el usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }
            })
            return responseError
        }
    }
   
}