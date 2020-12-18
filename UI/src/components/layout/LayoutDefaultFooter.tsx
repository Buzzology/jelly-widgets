import React from 'react';
import { BottomNavigation, makeStyles, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';

const footerHeight = 75;
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minHeight: footerHeight,
        backgroundColor: '#EEE',
        color: '#FEFEFE',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        borderTop: '1px solid #CCC',
    }
}));


const LayoutDefaultFooter = () => {

    const classes = useStyles();

    return (
        <BottomNavigation className={classes.root} showLabels>
            <BottomNavigationAction label="Footer" icon={<RestoreIcon />} />
        </BottomNavigation>
    )
}


export default LayoutDefaultFooter;