import React, { useState } from 'react'
import { makeStyles, Typography, useTheme } from "@material-ui/core"
import LoaderIcon from '@material-ui/icons/ToysRounded'
import { useMsal } from '@azure/msal-react';
import ButtonPrimary from '../generic/buttons/ButtonPrimary';
import ButtonSecondary from '../generic/buttons/ButtonSecondary';
import LoaderAbsoluteCentred from '../generic/loaders/LoaderAbsoluteCentred';


const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        minHeight: '100vh',
        flexGrow: 1,
    },
    innerWrapper: {
        backgroundColor: '#FFF',
        borderRadius: theme.shape.borderRadius,
        width: 350,
    },
    icon: {
        fontSize: 125,
        animation: '$loader 5000ms infinite',
        backgroundColor: '#d8d9db',
        borderRadius: '50%',
        color: '#fefefb',
        padding: 8
    },
    content: {
        padding: theme.spacing(3),
        textAlign: 'center',
        position: 'relative',
    },
    text: {
        opacity: 0.8
    },
    "@keyframes loader": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        }
    },
}));


const UserLoginWidget = () => {

    const classes = useStyles();
    const { instance, inProgress } = useMsal();
    const [redirecting, setRedirecting] = useState(false);

    const login = () => {
        setRedirecting(true);
        try {
            instance.loginRedirect();
        }
        catch (e) {
            setRedirecting(false);
        }
    }


    const leaveApp = () => {
        setRedirecting(true);

        try {
            instance.loginRedirect();
        }
        catch (e) {
            setRedirecting(false);
        }
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
                <div className={classes.content}>
                    <Typography variant="caption" style={{ marginTop: 16, marginBottom: 16 }} display="block">
                        Please login in order to access your widget portal.
                    </Typography>
                    <ButtonSecondary onClick={leaveApp} style={{
                        marginRight: 16
                    }}>
                        Leave App
                    </ButtonSecondary>
                    <ButtonPrimary onClick={login}>
                        Login
                    </ButtonPrimary>
                    <LoaderAbsoluteCentred loading={redirecting || inProgress !== 'none'} />
                </div>
            </div>
        </div>
    )
}

export default UserLoginWidget;