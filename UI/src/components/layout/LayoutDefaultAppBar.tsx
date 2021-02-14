import React from "react"
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom'
import { DrawerWidth } from "./LayoutConstants";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CustomColors } from "../../utilities/Styles";
import ButtonPrimary from "../generic/buttons/ButtonPrimary";
import { Logout } from "../../utilities/ApiUtils";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoaderAbsoluteCentred from "../generic/loaders/LoaderAbsoluteCentred";
import WidgetUserExecutionTrackerTotalClicksDisplay from "../widgetUserExecutionTrackers/WidgetUserExecutionTrackerTotalClicksDisplay";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: CustomColors.DarkBrownSecondaryColor,
    },
    title: {
        flexGrow: 1,
    },
    menuLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: CustomColors.MetalBackgroundColor,
        boxShadow: 'none',
        borderBottom: `1px solid ${CustomColors.MetalBorderColor}`
    },
    appBarShift: {
        marginLeft: DrawerWidth,
        width: `calc(100% - ${DrawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: CustomColors.MetalBackgroundColor,
    },
    drawerOpen: {
        width: DrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        backgroundColor: CustomColors.MetalBackgroundColor,
    },
}));


interface ILayoutDefaultAppBarProps {
    open: boolean,
    setDrawerOpen(open: boolean): void,
}


const LayoutDefaultAppBar = ({ open, setDrawerOpen }: ILayoutDefaultAppBarProps) => {

    const classes = useStyles();
    const isAuthenticated = useIsAuthenticated();
    const { instance, inProgress } = useMsal();

    console.log(inProgress)

    const internalLogout = () => {
        instance.logout();
        Logout();
    }

    const internalLogin = () => {
        instance.acquireTokenRedirect({
            scopes: ["openid"],
        });
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My Application
                    </Typography>
                    <WidgetUserExecutionTrackerTotalClicksDisplay />
                    {
                        isAuthenticated ? (
                            <RouterLink
                                to="/login"
                                className={classes.menuLink}
                            >
                                <ButtonPrimary variant="outlined" onClick={internalLogout}>
                                    Logout <LoaderAbsoluteCentred loading={inProgress !== 'none'} />
                                </ButtonPrimary>
                            </RouterLink>
                        ) : (
                                <ButtonPrimary variant="contained" onClick={internalLogin}>
                                    Login <LoaderAbsoluteCentred loading={inProgress !== 'none'} />
                                </ButtonPrimary>
                            )
                    }
                </Toolbar>
            </AppBar>
        </div >
    );
}


export default LayoutDefaultAppBar;