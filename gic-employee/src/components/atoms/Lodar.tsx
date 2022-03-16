import React from 'react';
import { CircularProgress } from "@material-ui/core";

const Loadar = () => {

    return (
        <div
        className="ag-custom-loading-cell"
        style={{ marginTop: '100px', lineHeight: '25px', textAlign: 'center' }}>
            <CircularProgress />
        </div>
    )
};



export default Loadar;