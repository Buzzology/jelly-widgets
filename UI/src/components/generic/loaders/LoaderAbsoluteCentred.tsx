import React from 'react'
import { CircularProgress, makeStyles } from "@material-ui/core"
import { green } from '@material-ui/core/colors'


const useStyles = makeStyles(() => ({
    buttonProgress: {
        color: green[500],
        left: '50%',
        top: '50%',
        position: 'absolute'
    },
    wrapper: {
        position: 'relative',
    }
}));


interface ILoaderAbsoluteCentred {
    loading: boolean,
    size?: number,
}


function LoaderAbsoluteCentred({ loading, size = 24 } : ILoaderAbsoluteCentred) {

    const classes = useStyles();

    if (!loading) return null;

    return (
        <div style={{
            top: '0px',
            bottom: '0px',
            right: '0px',
            left: '0px',
            position: 'absolute',
            zIndex: 999,
            borderRadius: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.28)',
        }}>
            <CircularProgress
                size={size}
                className={classes.buttonProgress}
                style={{
                    marginTop: -(size / 2),
                    marginLeft: -(size / 2),
                }}
            />
        </div >
    )
}

export default LoaderAbsoluteCentred;