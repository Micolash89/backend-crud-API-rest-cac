
export default class ProfesorDTO {

    static profesorToken = (profesor) => {

        return {
            id: profesor.id,
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            email: profesor.email,
            role: profesor.role,
            estado: profesor.estado,
            telefono: profesor.telefono,
            url: profesor.url
        }

    }

    static profesorgetOne = (profesor) => {

        return {
            id: profesor.id,
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            email: profesor.email,
            role: profesor.role,
            estado: profesor.estado,
            telefono: profesor.telefono,
            url: profesor.url
        }

    }

};