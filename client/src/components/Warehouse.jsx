import React from 'react';

const warehouseStyle = {
  padding: '1rem',
  boxShadow: '1px 1px 3px rgba(0,0,0,0.6)',
};

function Warehouse(props) {
  return (
    <div>
      {props.warehouses.map((warehouse) => (
        <div key={warehouse.id} style={warehouseStyle}>
          <h3>{warehouse.name}</h3>
          <p>{warehouse.address}</p>
          <h4>{warehouse.manager}</h4>
          {warehouse.categories &&
            JSON.parse(warehouse.categories).map((category, index) => (
              <li key={index}>{category}</li>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Warehouse;
