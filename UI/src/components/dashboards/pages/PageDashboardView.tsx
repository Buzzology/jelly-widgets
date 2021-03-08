import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton, makeStyles, InputAdornment, TextField, Grow } from '@material-ui/core';
import { NavLink, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux';
import { selectorGetDashboardById } from '../../../redux/dashboard/selectors';
import { CustomColors } from '../../../utilities/Styles';
import ButtonSecondary from '../../generic/buttons/ButtonSecondary';
import { UiFormStateIdEnum } from '../../../@types/UiFormState';
import { setFormOpenState } from '../../../redux/uiFormState/actions';
import EditDashboardIcon from '@material-ui/icons/EditTwoTone';
import { selectorGetDashboardWidgetById, selectorGetDashboardWidgetsByDashboardId } from '../../../redux/dashboardWidget/selectors';
import { selectorFilterWidgetsBySearchString, selectorGetWidgetById } from '../../../redux/widget/selectors';
import WidgetGenerator from '../../generic/widgets/implementations/WidgetGenerator';
import { GetWidgetsSearchWithDashboardId } from '../../../routes/RouteLinkHelpers';
import { WidgetNoResultsPlaceholder } from '../../generic/widgets/WidgetNoResultsPlaceholder';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WidgetModalConfirmationDialog from '../../generic/widgets/WidgetModalConfirmationDialog';
import { fetchRemoveDashboardWidget } from '../../../redux/dashboardWidget/actions';
import ButtonPrimaryDark from '../../generic/buttons/ButtonPrimaryDark';
import TourDashboard from '../../tour/TourDashboard';

const useStyles = makeStyles(theme => ({
    widgetWrapper: {
        border: `none`,
        padding: theme.spacing(3),
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
    },
    searchRoot: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        marginBottom: theme.spacing(3),
    },
    input: {
        flex: 1,
    },
    "@keyframes highlight": {
        "0%": {
            backgroundColor: "rgba(255, 254, 0, 0.95)"
        },
        "25%": {
            backgroundColor: "rgba(255, 254, 0, 0.5)"
        },
        "100%": {
            backgroundColor: "#FFF"
        }
    },
    widgetMenuIcon: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    highlightedWidget: {
        animation: '$highlight 5000ms 1',
    }
}));


interface IPageDashboardViewProps {
    routeProps: RouteComponentProps<any>,
    loading: boolean,
    dashboardId: string,
}

const PageDashboardView = ({ loading, dashboardId }: IPageDashboardViewProps) => {

    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));
    const dispatch = useDispatch();

    function setUpdateDashboardOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardUpdate, true, { dashboard }));
    }

    if (!dashboard) {
        return (
            <Grid item xs={12} sm={7} md={3}
                style={{
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    opacity: 0.8,
                    marginTop: 32
                }}
            >
                {
                    loading ? (
                        <LoaderAbsoluteCentred loading={true} />
                    ) : (
                            <>
                                <Typography variant="subtitle1" style={{ marginBottom: 8, fontWeight: 600 }}>
                                    Dashboard not found.
                                </Typography>
                                <Typography variant="subtitle2">
                                    You may have followed an invalid link or the dashboard has been removed.
                                </Typography>
                            </>
                        )
                }
            </Grid>
        );
    }

    return (
        <Container style={{
            paddingTop: 24,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
        }}
            maxWidth={false}
        >
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="body1" component="span" style={{
                        color: CustomColors.MetalDarkTextColor,
                        fontWeight: 600,
                    }} >
                        {dashboard.name}
                    </Typography>
                    {dashboard ? (
                        <>
                            <IconButton size="small" style={{ marginLeft: 8 }} onClick={setUpdateDashboardOpen} id="btn-edit-dashboard">
                                <EditDashboardIcon style={{ height: 16, width: 16 }} />
                            </IconButton>
                        </>
                    ) : null}
                </Grid>

                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <NavLink
                        to={GetWidgetsSearchWithDashboardId(dashboardId, '')}
                        style={{ textDecoration: 'none' }}
                    >
                        <ButtonPrimaryDark
                            variant="outlined"
                            id="btn-add-widget"
                        >
                            Add Widget
                        </ButtonPrimaryDark>
                    </NavLink>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 24 }}>
                    <Grid item xs={12}>
                        <DashboardWidgets dashboardId={dashboardId} />
                    </Grid>
                </Grid>
            </Grid>
            <LoaderAbsoluteCentred loading={loading} />
            <TourDashboard />
        </Container>
    );
}


function DashboardWidgets({ dashboardId }: { dashboardId: string }) {

    var dashboardWidgets = useSelector((store: RootState) => selectorGetDashboardWidgetsByDashboardId(store, dashboardId));
    const classes = useStyles();
    const [dashboardSearchFilter, setDashboardSearchFilter] = useState('');
    const filteredWidgets = useSelector((store: RootState) => selectorFilterWidgetsBySearchString(store, dashboardSearchFilter));

    if (!dashboardWidgets.length) {
        return (
            <WidgetNoResultsPlaceholder
                text="No widgets"
                description="You haven't added any widgets to this dashboard."
                flip={true}
            />
        );
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Container style={{
                        paddingTop: 0,
                        paddingBottom: 24,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                        maxWidth={false}
                    >
                        <TextField
                            margin="none"
                            variant="outlined"
                            className={classes.input}
                            placeholder="Search dashboard"
                            defaultValue={dashboardSearchFilter}
                            onChange={(e: any) => setDashboardSearchFilter(e.target.value?.toLowerCase())}
                            type="text"
                            size="small"
                            fullWidth={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: {
                                    backgroundColor: '#FFF'
                                }
                            }}
                        />
                    </Container>
                </Grid>

                <>
                    {
                        !filteredWidgets.length ? (
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <WidgetNoResultsPlaceholder
                                        text="No results"
                                        description="No matching results on this dashboard"
                                        fade={true}
                                    />
                                </div>
                            </Grid>
                        ) : null
                    }

                    {dashboardWidgets.map(dw => {
                        return (
                            <Grow in={filteredWidgets.some(w => w.widgetId === dw.widgetId)} unmountOnExit={true}>
                                <Grid item xs={12} md={6} lg={4} xl={3}>
                                    <DashboardWidgetRenderer dashboardWidgetId={dw.dashboardWidgetId} />
                                </Grid>
                            </Grow>
                        )
                    })}

                </>
            </Grid>
        </div>
    )

}


function DashboardWidgetRenderer({ dashboardWidgetId }: { dashboardWidgetId: string }) {

    const match = useRouteMatch() as any;
    const isSidebarClickedWidget = match.params?.dashboardWidgetId === dashboardWidgetId;
    const dashboardWidget = useSelector((store: RootState) => selectorGetDashboardWidgetById(store, dashboardWidgetId));
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''));
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const toggleDeleteConfirmation = () => setShowDeleteConfirmation(!showDeleteConfirmation);

    const onDelete = async () => {

        handleMenuClose();

        if (!dashboardWidget) return;

        setDeleting(true);

        await dispatch(
            fetchRemoveDashboardWidget({
                dashboardWidgetId: dashboardWidget.dashboardWidgetId,
                dashboardId: dashboardWidget.dashboardId,
            })) as any;

        setDeleting(false);
    }

    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    if (!dashboardWidget || !widget) {
        return (
            <div>
                <Typography variant="subtitle1" style={{ marginBottom: 8, fontWeight: 600 }}>
                    Widget not found.
                </Typography>
                <Typography variant="subtitle2">
                    This widget was not able to be found. It may have been removed.
                </Typography>
            </div>
        )
    }

    return (
        <div
            className={`${classes.widgetWrapper} ${isSidebarClickedWidget ? classes.highlightedWidget : ''}`}
        >
            <IconButton
                className={classes.widgetMenuIcon}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={anchorEl !== null}
                onClose={handleMenuClose}
            >
                <MenuItem key="option-remove-widget" onClick={onDelete}>
                    Remove
                </MenuItem>
            </Menu>
            <WidgetGenerator widgetId={dashboardWidget.widgetId} dashboardWidgetId={dashboardWidget.dashboardWidgetId} />
            <WidgetModalConfirmationDialog
                open={showDeleteConfirmation}
                title={`Delete ${widget?.name || 'widget'}?`}
                subtitle="Confirm delete"
                description="Are you sure that you'd like to remove this widget?"
                onCancelCallback={toggleDeleteConfirmation}
                onConfirmCallback={onDelete}
                confirmButtonText="Delete"
            />
            <LoaderAbsoluteCentred loading={deleting} />
        </div>
    )
}


export default PageDashboardView;