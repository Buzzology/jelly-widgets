import React from 'react'
import { makeStyles, Typography } from "@material-ui/core"
import LoaderIcon from '@material-ui/icons/ToysRounded'
import { CustomColors } from '../../../utilities/Styles';


const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        minHeight: '100vh',
        flexGrow: 1,
        animation: '$fadeIn 1s 1',
    },
    innerWrapper: {
        backgroundColor: '#FFF',
        borderRadius: theme.shape.borderRadius,
        width: 200,
    },
    icon: {
        fontSize: 125,
        animation: '$loader 4000ms infinite',
        backgroundColor: CustomColors.DarkGreenPrimaryColor,
        borderRadius: '50%',
        color: '#fefefb',
        padding: 8,
    },
    content: {
        padding: theme.spacing(3),
    },
    text: {
        opacity: 0.8
    },
    "@keyframes loader": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(-360deg)",
        },
    },
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0.1,
        },
        "100%": {
            opacity: 1,
        },
    },
}));



type LoaderInitialPageProps = {
    loading: boolean,
}

const LoaderInitialPage = ({ loading }: LoaderInitialPageProps) => {

    const classes = useStyles();

    if (!loading) return null;

    return (
        <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
                <div className={classes.content}>
                    <div style={{ textAlign: 'center' }}>
                        <LoaderIcon className={classes.icon} />
                    </div>
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <Typography variant="overline" style={{ opacity: 0.8 }}>Loading</Typography>
                        <Typography variant="caption" style={{ opacity: 0.5, marginTop: -4 }} display='block'>Preparing your widgets.</Typography>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoaderInitialPage;