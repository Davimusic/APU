import { connectToDatabase } from './connectToDatabase';

export default async function getMaterials(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    try {
        // Busca todos los documentos que tienen la llave 'uso' con el valor 'materiales'
        const documents = await collection.find({ uso: 'materiales' }).toArray();

        if (documents.length > 0) {
            // Retorna los documentos encontrados
            return res.status(200).json(documents);
        } else {
            // Si no se encuentran documentos, responde con un mensaje de error
            return res.status(404).json({ error: 'No se encontraron documentos con uso "materiales"' });
        }
    } catch (error) {
        console.error('Error obteniendo los documentos:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
