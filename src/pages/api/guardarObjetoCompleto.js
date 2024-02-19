import { connectToDatabase } from './connectToDatabase';

export default async function guardarObjetoCompleto(req, res) {
    // Obtén la referencia a la base de datos y a la colección
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    // Obtiene el correo del usuario
    const correo = req.body.correo;

    try {
        // Busca si el correo ya existe en la base de datos
        const existingDocument = await collection.findOne({ correo: correo });

        if (existingDocument) {
            // Define el documento que deseas guardar
            const newDocument = { 
                correo: correo, 
                ObjetosMatematicos: {
                    ...existingDocument.ObjetosMatematicos,
                    [req.body.nombre]: {
                        objetos: req.body.info,
                        sumaObjeto: req.body.sumaObjeto
                    }
                }
            };

            // Actualiza el documento existente
            const result = await collection.updateOne({ correo: correo }, { $set: newDocument });

            // Responde al cliente con el resultado de la operación
            return res.status(200).json(result);
        } else {
            // Si el correo no existe, responde con un mensaje de error
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error al guardar el documento en la base de datos:', error);
        throw error;
    }
}
