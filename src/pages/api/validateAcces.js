import { connectToDatabase } from './connectToDatabase';

export default async function validateAcces(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');
    const { correo, contrasena } = req.body;

    try {
        // Busca si el correo ya existe en la base de datos
        const document = await collection.findOne({ correo: correo });
        
        if (document) {
            // Verifica si la contraseña es correcta
            if (document.contrasena === contrasena) {
                return res.status(200).json({ loginState: true });
            } else {
                // Si la contraseña es incorrecta, responde con un mensaje de error
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            // Si el correo no existe, responde con un mensaje de error
            return res.status(404).json({ error: 'Correo no encontrado' });
        }
    } catch (error) {
        console.error('Error obteniendo las claves:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
