import { connectToDatabase } from './connectToDatabase';

export default async function createUser(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');
    const { correo, contrasena } = req.body;

    try {
        // Busca si el correo ya existe en la base de datos
        const document = await collection.findOne({ correo: correo });

        if (document) {
            // Si el correo ya existe, responde con un mensaje de error
            return res.status(409).json({ error: 'Correo existente' });
        } else {
            // Si el correo no existe, crea un nuevo documento
            const newUser = {
                correo: correo,
                contrasena: contrasena,
                ObjetosMatematicos: {}
            };
            await collection.insertOne(newUser);

            // Responde con un mensaje de éxito
            return res.status(201).json({ message: 'Usuario creado' });
        }
    } catch (error) {
        console.error('Error creando el usuario:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
