import React from 'react';
import { makeStyles, Typography, Modal } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import AttachFileIcon from '@material-ui/icons/AttachFile'
import AnimationWrapper from '../animations/AnimationWrapper';


const useStyles = makeStyles(theme => ({
    dialogHeaderContainer: {
        padding: theme.spacing(3),
    },
    paper: {
        position: 'absolute',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #CCC',
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
    },
    iconContainer: {
        display: 'none',
        position: 'absolute',
        left: theme.spacing(2),
        top: -theme.spacing(2),
        height: 75,
        width: 75,
        backgroundColor: deepOrange[500],
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        '& svg': {
            color: '#FFF',
            fontSize: 30,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        outline: 'none',
    },
    contentWrapper: {
        overflowY: 'auto',
        maxHeight: 500,
    },
}));


export interface WidgetModalBaseProps {
    children: React.ReactNode,
    fullWidth?: boolean,
    maxWidth?: 'lg' | 'md' | 'sm' | 'xs',
    open: boolean,
    title: string,
    subtitle: string,
    handleCancel(): void,
    headerIcon?: React.ReactNode,
    headerColor?: string,
    style?: React.CSSProperties,
}


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


function WidgetModalBase({
    title,
    children,
    subtitle,
    headerColor = teal[500],
    headerIcon = <AttachFileIcon />,
    open,
    handleCancel,
    style,
}: WidgetModalBaseProps) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal
            open={open}
            onClose={handleCancel}
            // scroll={"paper"} (used on dialogs)
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            // fullWidth={fullWidth} (used on dialogs)
            // maxWidth={maxWidth} (used on dialogs)
            style={{ overflow: 'inherit', outline: 'none' }}
            tabIndex={-1}
        >
            <AnimationWrapper>
                <div style={{ ...modalStyle, ...style }} className={classes.paper} tabIndex={-1}>
                    <div className={classes.iconContainer} style={{ backgroundColor: headerColor }}>
                        {headerIcon}
                    </div>
                    <div className={classes.dialogHeaderContainer}>
                        <Typography variant="h5" style={{ marginBottom: 16 }}>{title}</Typography>
                        <Typography variant="body1" color="textSecondary">{subtitle}</Typography>
                    </div>
                    <div className={classes.contentWrapper}>
                        {
                            children
                        }
                    </div>
                </div>
            </AnimationWrapper>
        </Modal>
    );
}


export default WidgetModalBase;