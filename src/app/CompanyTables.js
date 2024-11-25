import React from 'react';
import './globals.css';

const CompanyTable = ({ data }) => {
    console.log(data);
    
    return (
        <div style={{ padding: '20px', overflowX: 'auto', padding: '30px' }}>
            <table className={'color2'} style={styles.table}>
                <thead >
                    <tr>
                        <th style={styles.th}>Nombre Empresa</th>
                        <th style={styles.th}>Contacto</th>
                        <th style={styles.th}>Descripciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(companyKey => {
                        const company = data[companyKey];

                        // Verificar que 'empresa' esté definido
                        if (!company.empresa) {
                            console.error(`La empresa para la clave ${companyKey} no está definida.`);
                            return null;
                        }

                        const nombreEmpresa = company.empresa["Nombre empresa"];
                        const contacto = company.contacto || "N/A";

                        return (
                            <tr className='bordes' key={companyKey}>
                                <td className='bordes' style={styles.td}>{nombreEmpresa}</td>
                                <td style={styles.td}>{contacto}</td>
                                <td style={styles.td}>
                                    <ul className='bordes' style={styles.ul}>
                                        {company.descripciones && company.descripciones.map((descripcion, index) => (
                                            <li className='bordes' key={index} style={styles.li}>{descripcion}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    th: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        fontWeight: 'bold',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        verticalAlign: 'top',
    },
    ul: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    li: {
        marginBottom: '8px',
    },
};

export default CompanyTable;




/*import React from 'react';
'./globals.css'

const CompanyTable = ({ data }) => {
    return (
        <div style={{ padding: '20px', overflowX: 'auto', padding: '30px' }}>
            <table className={'color2'} style={styles.table}>
                <thead >
                    <tr>
                        <th style={styles.th}>Nombre Empresa</th>
                        <th style={styles.th}>Contacto</th>
                        <th style={styles.th}>Descripciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(companyKey => {
                        const company = data[companyKey];
                        const nombreEmpresa = company.empresa["Nombre empresa"];
                        const contacto = company.contacto || "N/A";

                        return (
                            <tr className='bordes' key={companyKey}>
                                <td className='bordes' style={styles.td}>{nombreEmpresa}</td>
                                <td style={styles.td}>{contacto}</td>
                                <td style={styles.td}>
                                    <ul className='bordes' style={styles.ul}>
                                        {company.descripciones.map((descripcion, index) => (
                                            <li className='bordes' key={index} style={styles.li}>{descripcion}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    th: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        fontWeight: 'bold',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        verticalAlign: 'top',
    },
    ul: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    li: {
        marginBottom: '8px',
    },
};

export default CompanyTable;*/


