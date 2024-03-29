import { connectToDatabase } from './connectToDatabase';

export default async function createDocument(req, res) {
  console.log('llamad');
  const db = await connectToDatabase();
  const collection = db.collection('buildingProject');

  const correo = req.body.correo;
  const nombre = req.body.nombre;
  const compararNombre = req.body.compararNombre;
  const saveEntireBody = req.body.saveEntireBody

  try {
    // Busca si el correo ya existe en la base de datos
    const existingDocument = await collection.findOne({ correo: correo });

    if (existingDocument) {
      let objName = compararNombre;

      // Si nombre y compararNombre son diferentes, busca el objeto con el nombre actual (nombre) en ObjetosMatematicos y luego reemplaza los valores
      if (nombre !== compararNombre && existingDocument.ObjetosMatematicos[nombre]) {
        // Verifica si el nuevo nombre ya existe en la base de datos
        if (existingDocument.ObjetosMatematicos[compararNombre]) {
          return res.status(400).json({ error: 'Nombre ya existente en la base de datos' });
        }

        existingDocument.ObjetosMatematicos[compararNombre] = existingDocument.ObjetosMatematicos[nombre];
        delete existingDocument.ObjetosMatematicos[nombre];
        objName = compararNombre;
      }

      // Define el documento que deseas guardar
      let newDocument;
      if (saveEntireBody) {//req.body;
        newDocument = { 
          correo: correo, 
          ObjetosMatematicos: req.body
        };
      } else {
        newDocument = { 
          correo: correo, 
          ObjetosMatematicos: {
            ...existingDocument.ObjetosMatematicos,
            [objName]: {
              objetos: req.body.info,
              sumaObjeto: req.body.sumaObjeto
            }
          }
        };
      }

      console.log('llega');
      console.log(newDocument);

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









