import React from 'react'
import { CircularProgress, makeStyles } from "@material-ui/core"
import { green } from '@material-ui/core/colors'


const useStyles = makeStyles(theme => ({
    buttonProgress: {
        color: green[500],
        left: '50%',
        top: '50%',
        position: 'absolute'
    },
    wrapper: {
        position: 'relative',
        marginBottom: 48,
        marginLeft: -theme.spacing(3),
    }
}));



type LoadingPlaceHolderProps = {
    loading: boolean,
    size?: number,
    paddingTop?: number,
    classNames?: string,
}

const LoaderPlaceholder = ({ classNames, loading, size = 24, paddingTop = 0 }: LoadingPlaceHolderProps) => {

    const classes = useStyles();
    
    if (!loading) return null;

    return (
        <div className={classes.wrapper} style={{ paddingTop }} >
            <CircularProgress size={size} className={`${classes.buttonProgress} ${classNames}`} />
        </div>
    )

}

export default LoaderPlaceholder;