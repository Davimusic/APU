import { connectToDatabase } from './connectToDatabase';

export default async function deleteProject(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');
    const { correo, proyecto } = req.body;

    try {
        // Busca si el correo ya existe en la base de datos
        const document = await collection.findOne({ correo: correo });
        if (document) {
            // Si el correo existe, busca la llave ObjetosMatematicos
            if (document.ObjetosMatematicos[proyecto]) {
                // Si el proyecto existe, se elimina
                delete document.ObjetosMatematicos[proyecto];
                await collection.updateOne(
                    { correo: correo },
                    { $set: { ObjetosMatematicos: document.ObjetosMatematicos } }
                );
                return res.status(200).json({
                    message: 'Proyecto eliminado',
                    ObjetosMatematicos: document.ObjetosMatematicos
                });
            } else {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error eliminando el proyecto:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}

