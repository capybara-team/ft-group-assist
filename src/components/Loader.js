import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = ({ spacing, ...props }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: spacing, marginBottom: spacing }}>
            <CircularProgress {...props} />
        </div>
    );
};

export default Loader;