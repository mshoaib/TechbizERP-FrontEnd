import React, { useState, Fragment } from 'react';

import Supplier from './supplier/Supplier';
import PmsTable from './PmsTable';

const PmsReport = () => {
  const [supplier, setsupplier] = useState(false);
  const [table, setTable] = useState(true);
  const pmsHandler = event => {
    setsupplier(true);
    setTable(false);
  };
  const onClickBack = () => {
    setsupplier(false);
    setTable(true);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      {table && <PmsTable pmsHandler={pmsHandler} />}
      {supplier && <Supplier onClickBack={onClickBack} />}
    </div>
  );
};

export default PmsReport;
