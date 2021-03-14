import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ScrollbarPretty, CustomColors } from '../../utilities/Styles';
import { DrawerWidth } from './LayoutConstants';
import { Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NewTopicIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import AboutIcon from '@material-ui/icons/ContactSupport'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { GetDashboardLinkWithHighlightedWidget, GetProductsLink, GetWidgetsSearchWithDashboardId } from '../../routes/RouteLinkHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { UiFormStateIdEnum } from '../../@types/UiFormState';
import { RootState } from '../../redux';
import { setFormOpenState } from '../../redux/uiFormState/actions';
import { WidgetNoResultsPlaceholder } from '../generic/widgets/WidgetNoResultsPlaceholder';
import { selectorGetDashboardWidgetsByDashboardId } from '../../redux/dashboardWidget/selectors';
import { selectorGetDashboardById, selectorGetDashboards } from '../../redux/dashboard/selectors';
import IDashboard from '../../@types/Dashboard';
import IDashboardWidget from '../../@types/DashboardWidget';
import EditIcon from '@material-ui/icons/Edit';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AddWidgetIcon from '@material-ui/icons/AddOutlined';
import DashboardIcon from '../dashboards/DashboardIcon';
import PaymentsIcon from '@material-ui/icons/Payment';
import PremiumIcon from '@material-ui/icons/PresentToAll';
import { selectorGetWidgetById } from '../../redux/widget/selectors';
import { fetchAccountManagementPortalUrl } from '../../redux/paymentSessions/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#FFF',
        overflowX: 'hidden',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: DrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: '#FFF',
    },
    drawerOpen: {
        width: DrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#FFF',
        overflowX: 'hidden',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        backgroundColor: '#FFF',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        backgroundColor: '#FFF',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: '#FFF',
    },
    ...ScrollbarPretty,
    sidebarSelectionsWrapper: {
        width: DrawerWidth,
        display: 'flex',
        flexDirection: 'row',
        height: '50%',
        overflow: 'hidden',
    },
    topicIconsContainer: {
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        minWidth: theme.spacing(9) + 1,
        flexDirection: 'column',
        borderLeft: '1px solid #EEE',
        borderBottom: '1px solid #EEE',
        overflowY: 'scroll',
        transform: 'scaleX(-1)', /* Used to place scrollbar on left side */
        marginBottom: -1,
    },
    topicTagCategoriesContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        '&$selected': {
            backgroundColor: 'red',
        }
    },
    topicIconWrapper: {
        // padding: theme.spacing(1),
        // height: 50,
        // width: 50,
        // border: '1px solid #EEE',
        // borderRadius: theme.shape.borderRadius,
        // margin: theme.spacing(1),
        // transform: 'scaleX(-1)', /* Used to place scrollbar on left side */
        // backgroundColor: '#FFF',
        transform: 'scaleX(-1)', // Used to reverse the container flip
        marginBottom: theme.spacing(1),
    },
    topicTagCategoryWrapper: {
        padding: theme.spacing(1),
        color: CustomColors.MetalDefaultTextColor,
        position: 'relative',
    },
    topicTagCategoryTree: {
        flexGrow: 1,
    },
    dashboardWidgetSidebarLink: {
        textDecoration: 'none',
        color: 'inherit',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        paddingRight: theme.spacing(2),
        '&:hover': {
            opacity: 0.75,
        },
        display: 'flex',
        alignItems: 'center'
    },
    dashboardWidgetSidebarLinkWrapper: {
        marginBottom: theme.spacing(1),
    },
    newTopicIcon: {
        fontSize: 32,
        marginTop: theme.spacing(1) + 4,
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sidebarEditIcon: {
        opacity: 0,
        fontSize: 16,
        position: 'absolute',
        right: 0,
        top: 0,
    },
}));


interface ILayoutSidebarProps {
    open: boolean,
    setDrawerOpen(open: boolean): void,
}


const LayoutSidebar = ({ open, setDrawerOpen }: ILayoutSidebarProps) => {

    const classes = useStyles();
    const { dashboardId } = useParams() as any;
    const dashboards = useSelector((store: RootState) => selectorGetDashboards(store));
    const activeDashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));
    const activeDashboardWidgets = useSelector((store: RootState) => selectorGetDashboardWidgetsByDashboardId(store, dashboardId));
    const dispatch = useDispatch();
    const history = useHistory();

    function setCreateDashboardFormOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardCreate, true));
    }

    function redirectToProducts() {
        history.push(GetProductsLink());
    }

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={() => setDrawerOpen(!open)}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <div className={classes.sidebarSelectionsWrapper}>
                <div id="dashboard-selection" className={classes.topicIconsContainer}>
                    <div>
                        <IconButton
                            onClick={setCreateDashboardFormOpen}
                            className={classes.newTopicIcon}
                            id="btn-add-dashboard"
                        >
                            <NewTopicIcon />
                        </IconButton>
                    </div>
                    {
                        dashboards.map(x => {
                            return (
                                <div className={classes.topicIconWrapper}>
                                    <DashboardIcon dashboardName={x.name} dashboardId={x.dashboardId} />
                                </div>
                            );
                        })
                    }
                </div>
                <div className={classes.topicTagCategoriesContainer}>
                    <div className={classes.topicTagCategoryWrapper}>
                        <Typography variant="h6" style={{
                            color: CustomColors.MetalDarkTextColor,
                        }}
                            noWrap={true}
                        >
                            {activeDashboard?.name || "No dashboard selected."}
                        </Typography>
                        <Typography
                            variant="caption"
                            style={{
                                color: CustomColors.MetalDefaultTextColor
                            }}
                            noWrap={true}
                        >
                            {activeDashboardWidgets.length} Dashboard Widgets
                        </Typography>
                    </div>
                    <Divider />
                    <DashboardWidgets dashboardId={dashboardId} />
                </div>
            </div>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><HomeIcon style={{ marginLeft: 8 }} /></ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button onClick={fetchAccountManagementPortalUrl}>
                    <ListItemIcon><PaymentsIcon style={{ marginLeft: 8 }} /></ListItemIcon>
                    <ListItemText primary={"Payments"} />
                </ListItem>
                <ListItem button onClick={redirectToProducts}>
                    <ListItemIcon><PremiumIcon style={{ marginLeft: 8 }} /></ListItemIcon>
                    <ListItemText primary={"Support Me"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><AboutIcon style={{ marginLeft: 8 }} /></ListItemIcon>
                    <ListItemText primary={"About"} />
                </ListItem>
            </List>
        </Drawer>
    );
}


function DashboardWidgets({ dashboardId }: { dashboardId: string }) {

    const classes = useStyles();
    const widgets = useSelector((store: RootState) => selectorGetDashboardWidgetsByDashboardId(store, dashboardId));
    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));
    const theme = useTheme();

    if (!dashboard) return (
        <div style={{ marginRight: theme.spacing(3), marginLeft: theme.spacing(2) }}>
            &nbsp;<br />
            <WidgetNoResultsPlaceholder
                text="Click an Icon"
                description="No dashboard selected."
                fade={true}
            />
        </div>
    )

    return (
        <div className={classes.topicTagCategoryWrapper}>
            {widgets.length ? (
                <>
                    <WidgetsDisplay dashboardWidgets={widgets} dashboard={dashboard} />
                    <Divider style={{ marginBottom: theme.spacing(1), marginRight: -theme.spacing(1), marginLeft: -theme.spacing(1) }} />
                </>
            ) : null}
            <NavLink
                to={GetWidgetsSearchWithDashboardId(dashboardId, '')}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <IconButton aria-label="Add Widget" color="default"
                    style={{
                        padding: 3,
                        border: `1px solid ${CustomColors.MetalBorderColor}`,
                        marginRight: theme.spacing(1),
                    }}>
                    <AddWidgetIcon />
                </IconButton> Add Widget
            </NavLink>
        </div >
    )
}


function WidgetsDisplay({ dashboardWidgets }: { dashboard: IDashboard, dashboardWidgets: IDashboardWidget[] }) {
    return (
        <>
            {
                dashboardWidgets.map((widget: IDashboardWidget) => {
                    return (
                        <WidgetDisplay dashboardWidget={widget} />
                    )
                })
            }
        </>
    )
}


function WidgetDisplay({ dashboardWidget }: { dashboardWidget: IDashboardWidget }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''))
    const theme = useTheme();
    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardWidget?.dashboardId));

    function setDashboardAddWidgetFormOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardAddWidget, true, { dashboardId: dashboardWidget?.dashboardId }));
    }

    return (
        <div
            className={classes.dashboardWidgetSidebarLinkWrapper}
        >
            <Typography
                component={NavLink}
                to={`${GetDashboardLinkWithHighlightedWidget(dashboardWidget?.dashboardId, dashboard?.name || '', dashboardWidget?.dashboardWidgetId)}`}
                variant="body2"
                className={classes.dashboardWidgetSidebarLink}>
                <WidgetsIcon style={{ fontSize: 18, marginRight: theme.spacing(1) }} /> {widget?.name || 'Unknown'}
                <IconButton
                    className={classes.sidebarEditIcon}
                    onClick={setDashboardAddWidgetFormOpen}
                    size="small">
                    <EditIcon className={classes.sidebarEditIcon} />
                </IconButton>
            </Typography>
        </div>
    )
}


export default LayoutSidebar;