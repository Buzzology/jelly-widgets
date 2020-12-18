import React from "react"
import MessagesContainer from "../messages/MessageContainer";
import { makeStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import LayoutSidebar from "./LayoutSidebar";
import LayoutDefaultAppBar from "./LayoutDefaultAppBar";
import { DrawerWidth } from "./LayoutConstants";
import clsx from 'clsx';
import { SetLocalStorageItem, GetLocalStorageItem } from "../../utilities/Helpers";
import LayoutGlobalForms from "./LayoutGlobalForms";


const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: 75,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(9),
    },
    drawerOpen: {
        marginLeft: DrawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClosed: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(9) + 1,
        },
    }
}));


interface ILayoutDefaultProps {
    routeProps: RouteComponentProps<any>,
    children: React.ReactNode,
}

const SidebarToggleLocalStorageKey = 'SidebarToggle';

function LayoutDefault({ routeProps, children }: ILayoutDefaultProps) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(GetLocalStorageItem(SidebarToggleLocalStorageKey));

    const ChangeSidebarState = (newState: boolean) => {
        SetLocalStorageItem(SidebarToggleLocalStorageKey, newState);
        setOpen(newState);
    }

    return (
        <div className={classes.root}>
            <LayoutDefaultAppBar open={open} setDrawerOpen={ChangeSidebarState} />
            <LayoutSidebar open={open} setDrawerOpen={ChangeSidebarState} />
            <main className={classes.content}>
                <div className={
                    clsx(classes.toolbar, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClosed]: !open,
                    })
                }>
                    {children}
                </div>
            </main>
            <MessagesContainer />
            <LayoutGlobalForms />
        </div>
    );
}


export default LayoutDefault;
