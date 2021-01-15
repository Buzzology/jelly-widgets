import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton, makeStyles, InputAdornment, TextField, Grow } from '@material-ui/core';
import { NavLink, RouteComponentProps } from 'react-router-dom';
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


const useStyles = makeStyles(theme => ({
    widgetWrapper: {
        border: `none`,
        padding: theme.spacing(3),
        height: '100%',
        backgroundColor: '#FFFFFF75',
        borderRadius: theme.shape.borderRadius,
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
    postSearchResultWrapper: {
        transition: 'background 200ms ease-out',
        textDecoration: 'none',
        padding: theme.spacing(2),
        borderBottom: `1px solid ${CustomColors.MetalBorderColor}`,
        overflowX: 'hidden',
        position: 'relative',
    },
    linkedPostSearchResultWrapper: {
        animation: '$highlight 5000ms 1'
    },
    postSearchResultDivider: {
    },
    nextPageOfImagesWrapper: {
    },
    "@keyframes highlight": {
        "0%": {
            backgroundColor: "rgba(255, 254, 0, 0.5)"
        },
        "100%": {
            backgroundColor: "inherit"
        }
    },
    morePagesWrapper: {
        marginTop: theme.spacing(3),
        backgroundColor: CustomColors.ActiveItemBlue,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        transition: 'opacity 300ms ease-in-out',
        position: 'relative',
        '&:hover': {
            opacity: 0.6,
        }
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
                            <IconButton size="small" style={{ marginLeft: 8 }} onClick={setUpdateDashboardOpen}>
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
                        <ButtonSecondary
                            variant="outlined"
                        >
                            Add Widget
                        </ButtonSecondary>
                    </NavLink>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 24 }}>
                    <Grid item xs={12}>
                        <DashboardWidgets dashboardId={dashboardId} />
                    </Grid>
                </Grid>
            </Grid>
            <LoaderAbsoluteCentred loading={loading} />
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

    const dashboardWidget = useSelector((store: RootState) => selectorGetDashboardWidgetById(store, dashboardWidgetId));
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''));
    const classes = useStyles();

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
        <div className={classes.widgetWrapper}>
            <WidgetGenerator widgetId={dashboardWidget.widgetId} dashboardWidgetId={dashboardWidget.dashboardWidgetId} />
        </div>
    )
}


export default PageDashboardView;