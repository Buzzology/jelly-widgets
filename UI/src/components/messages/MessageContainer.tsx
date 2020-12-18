import { makeStyles, Snackbar, IconButton } from "@material-ui/core";
import { green, amber } from "@material-ui/core/colors";
import React from "react";
import { requestMessageDelete } from "../../redux/message/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectorGetMessageNewest } from "../../redux/message/selectors";
import { RootState } from "../../redux";
import Close from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import IMessage from "../../@types/Message";


const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));



function MessagesContainer() {

    const classes = useStyles();
    const message = useSelector((state: RootState) => selectorGetMessageNewest(state));
    const dispatch = useDispatch();

    if (message == null) return null;

    const getClassForType = (message: IMessage)=> {

        if(message.type === 0) return classes.error;
        if(message.type === 1) return classes.success;
        if(message.type === 2) return classes.info;
        if(message.type === 3) return classes.warning;

        return "";
    }


    const getIconForMessage = (message: IMessage) => {

        if(message.type === 0) return <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`} />;
        if(message.type === 1) return <SuccessIcon className={`${classes.icon} ${classes.iconVariant}`} />;
        if(message.type === 2) return <InfoIcon className={`${classes.icon} ${classes.iconVariant}`} />;
        if(message.type === 3) return <WarningIcon className={`${classes.icon} ${classes.iconVariant}`} />;

        console.error(`Invalid message type: ${message.type}`)
    }


    const handleClose = (reason: string) => {
        
        if (reason === 'clickaway') {
            return;
        }

        dispatch(requestMessageDelete(message));
    };


    const handleExited = () => {
        dispatch(requestMessageDelete(message));
    };    

    // Render using the provided custom renderer
    return (
        <Snackbar
            key={message.messageId}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={message != null}
            autoHideDuration={6000}
            onClose={(e: any, reason: string) => handleClose(reason)}
            onExited={handleExited}
            className={getClassForType(message)}              
            ContentProps={{
                'aria-describedby': 'message-id',  
                className: getClassForType(message),
            }}
            message={<span id="message-id" className={classes.message}>{getIconForMessage(message)} {message.text}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => dispatch(requestMessageDelete(message))}
                >
                    <Close />
                </IconButton>,
            ]}
        />
    )
}

export default MessagesContainer;