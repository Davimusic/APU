import React, { useState } from 'react';

const MaterialFilter = ({ data, onSelect }) => {
    const [searchMaterial, setSearchMaterial] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [minQuantity, setMinQuantity] = useState('');

    const handleSearchMaterialChange = (e) => setSearchMaterial(e.target.value);
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMinQuantityChange = (e) => setMinQuantity(e.target.value);

    const filteredData = Object.entries(data).map(([id, empresa]) => {
        const filteredMaterials = empresa.materiales?.filter((item) => {
            const matchesMaterial = searchMaterial === '' || item.material.toLowerCase().includes(searchMaterial.toLowerCase());
            const matchesPrice = (!minPrice || item.precio >= minPrice);
            const matchesQuantity = (!minQuantity || item['cantidad disponible'] >= minQuantity);
            return matchesMaterial && matchesPrice && matchesQuantity;
        });

        return { id, empresa: { ...empresa, materiales: filteredMaterials } };
    }).filter(({ empresa }) => empresa.materiales.length > 0);


    return (
        <div>
            <div>
                <input type="text" placeholder="Buscar material" value={searchMaterial} onChange={handleSearchMaterialChange} />
                <input type="number" placeholder="Precio mínimo" value={minPrice} onChange={handleMinPriceChange} />
                <input type="number" placeholder="Cantidad mínima" value={minQuantity} onChange={handleMinQuantityChange} />
            </div>
            <div className="scroll" style={{ height: '100px' }}>
                {filteredData.map(({ id, empresa }) => (
                    <div key={id}>
                        <h2>{empresa['Nombre empresa']}</h2>
                        {empresa.materiales?.map((item, index) => {
                            let info = { 'material': item.material, 'precio': item.precio, 'cantidad': item['cantidad disponible'], 'nombreEmpresa': empresa['Nombre empresa'] };
                            return (
                                <div onClick={() => onSelect(info)} key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid black' }}>
                                    <p>Material: {item.material}</p>
                                    <p>Precio: {item.precio}</p>
                                    <p>Cantidad Disponible: {item['cantidad disponible']}</p>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaterialFilter;



