import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import AboutIcon from '@material-ui/icons/ContactSupportOutlined'
import { NavLink, useParams } from 'react-router-dom';
import { GetDashboardLinkByDashboardIdAndName, GetTopicsSearch, GetWidgetsSearchWithDashboardId } from '../../routes/RouteLinkHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { UiFormStateIdEnum } from '../../@types/UiFormState';
import { RootState } from '../../redux';
import { setFormOpenState } from '../../redux/uiFormState/actions';
import { WidgetNoResultsPlaceholder } from '../generic/widgets/WidgetNoResultsPlaceholder';
import { selectorGetDashboardWidgetsByDashboardId } from '../../redux/dashboardWidget/selectors';
import { selectorGetDashboardById, selectorGetDashboards } from '../../redux/dashboard/selectors';
import IDashboard from '../../@types/Dashboard';
import { TreeView } from '@material-ui/lab';
import IDashboardWidget from '../../@types/DashboardWidget';
import EditIcon from '@material-ui/icons/Edit';
import AddSubjectIcon from '@material-ui/icons/Add';
import DashboardIcon from '../dashboards/DashboardIcon';
import { selectorGetUiFormStateById } from '../../redux/uiFormState/selectors';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: CustomColors.MetalBackgroundColor,
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
        backgroundColor: CustomColors.MetalBackgroundColor,
    },
    drawerOpen: {
        width: DrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: CustomColors.MetalBackgroundColor,
        overflowX: 'hidden',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        backgroundColor: CustomColors.MetalBackgroundColor,
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: CustomColors.MetalBackgroundColor,
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
    treeItem: {
        textTransform: 'lowercase',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        '&[aria-selected="true"] > div:nth-of-type(1)': {
            backgroundColor: CustomColors.ActiveItemBlue,
            color: '#FFF',
            borderRadius: theme.shape.borderRadius,
            padding: 4,
        },
    },
    topicTagCategoryTreeItem: {
        textDecoration: 'none',
        color: 'inherit',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        paddingRight: theme.spacing(2),
        '&:hover': {
            '& $sidebarEditIcon': {
                opacity: 1,
            }
        }
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
                <div className={classes.topicIconsContainer}>
                    <div>
                        <IconButton
                            component={NavLink}
                            to={GetTopicsSearch()}
                            className={classes.newTopicIcon}
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
                            {activeDashboardWidgets.length} Widgets
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
    const dispatch = useDispatch();
    const widgets = useSelector((store: RootState) => selectorGetDashboardWidgetsByDashboardId(store, dashboardId));
    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));

    function setWidgetAddFormOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardAddWidget, true, dashboardId));
    }

    if (!dashboard) return (
        <>
            &nbsp;<br />
            <WidgetNoResultsPlaceholder
                text="No dashboard selected"
                fade={true}
            />
        </>
    )

    return (
        <div className={classes.topicTagCategoryWrapper}>
            <Typography variant="body2">
                Widgets
                    <IconButton aria-label="Add Widget" color="default"
                    component={NavLink}
                    to={GetWidgetsSearchWithDashboardId(dashboardId, '')}
                    style={{
                        position: 'absolute',
                        right: 3,
                        top: 3,
                        padding: 3,
                    }}>
                    <AddSubjectIcon />
                </IconButton>
            </Typography>
            <WidgetsDisplay widgets={widgets} dashboard={dashboard} />
        </div>
    )
}


function WidgetsDisplay({ widgets, dashboard }: { dashboard: IDashboard, widgets: IDashboardWidget[] }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState<string[]>();
    const [selected, setSelected] = React.useState<string[]>();

    const handleToggle = (event: any, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: any, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    function setDashboardAddWidgetFormOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardAddWidget, true, { dashboardId: dashboard?.dashboardId }));
    }

    return (
        <>
            {
                widgets.map((widget: IDashboardWidget) => {
                    return (
                        <Typography
                            component={NavLink}
                            to={`${GetDashboardLinkByDashboardIdAndName(dashboard?.dashboardId, dashboard?.name)}`}
                            variant="body2"
                            className={classes.topicTagCategoryTreeItem}>
                            {widget.orderNumber}
                            <IconButton
                                className={classes.sidebarEditIcon}
                                onClick={setDashboardAddWidgetFormOpen}
                                size="small">
                                <EditIcon className={classes.sidebarEditIcon} />
                            </IconButton>
                        </Typography>
                    )
                })
            }
        </>
    )
}


export default LayoutSidebar;