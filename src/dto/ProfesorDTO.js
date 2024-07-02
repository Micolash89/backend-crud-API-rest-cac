
export default class ProfesorDTO {

    static profesorToken = (profesor) => {

        return {
            id: profesor.id,
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            email: profesor.email,
            //rol: profesor.rol,
            estado: profesor.estado,
            telefono: profesor.telefono
        }

    }

};