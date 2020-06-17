import React from 'react';
import MaterialTable from 'material-table';

export const Table = props => {
  const { title, items } = props;

  let columns = [
    { title: 'Item Code', field: 'Item_Code' },
    { title: 'Item Name', field: 'Item_Name' },
    { title: 'Sub Category', field: 'SubCat' },
    { title: 'UOM', field: 'UOM' },
    { title: 'Purchasable Item', field: 'PItem', type: 'boolean' },
    { title: 'Customeer Order Item', field: 'COItem', type: 'boolean' },
    { title: 'Inventory Item', field: 'InvItem', type: 'boolean' },
    { title: 'Sales Order Item', field: 'SOItem', type: 'boolean' }
  ];

  const [state] = React.useState({
    columns: columns,
    data: items.data
  });

  return (
    <MaterialTable
      title={title}
      columns={state.columns}
      data={items.data}
      options={{ pageSize: 10 }}
    />
  );
};

export default Table;
