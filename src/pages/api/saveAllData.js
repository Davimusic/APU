import { connectToDatabase } from './connectToDatabase';

export default async function saveAllData(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    const correo = req.body.correo;
    const objetoMatematico = req.body.info;

    try {
        // Busca si el correo ya existe en la base de datos
        const existingDocument = await collection.findOne({ correo: correo });

        if (existingDocument) {
            // Define el documento que deseas guardar
            const newDocument = { 
                correo: correo, 
                ObjetosMatematicos: objetoMatematico
            };

            // Actualiza el documento existente
            const result = await collection.updateOne({ correo: correo }, { $set: newDocument });

            console.log('Data saved successfully');
            res.status(200).json({ message: 'Data saved successfully' });
        } else {
            // Si el correo no existe, responde con un mensaje de error
            console.error('Documento no encontrado');
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('An error occurred while saving the data:', error);
        res.status(500).json({ error: 'An error occurred while saving the data' });
    }
}





