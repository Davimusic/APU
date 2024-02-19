export default async function llamarGuardarObjetoMatematico(objetosMatematicos) {
    console.log('llega');
    console.log(objetosMatematicos);
    const data = { 
        correo: 'davipianof@gmail.com', // se debe quitar después
        objetosMatematicos: objetosMatematicos // los nuevos objetos matemáticos que quieres guardar
    };

    try {
        const response = await fetch('/api/guardarObjetoCompleto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            console.log(response.status);
            throw new Error(message);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al guardar todos los objetos:', error);
    }
}
