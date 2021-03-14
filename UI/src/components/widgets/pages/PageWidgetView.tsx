import React, { useState } from 'react';
import { Container, Grid, Typography, useTheme } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux';
import { selectorGetWidgetById } from '../../../redux/widget/selectors';
import { fetchCreateDashboardWidget } from '../../../redux/dashboardWidget/actions';
import { GetDashboardLinkByDashboardIdAndName } from '../../../routes/RouteLinkHelpers';
import { selectorGetDashboardById } from '../../../redux/dashboard/selectors';
import ButtonPrimaryDark from '../../generic/buttons/ButtonPrimaryDark';
import ButtonSecondaryDark from '../../generic/buttons/ButtonSecondaryDark';


interface IPageWidgetViewProps {
    routeProps: RouteComponentProps<any>,
    loading: boolean,
    widgetId: string,
    dashboardId: string,
}

const PageWidgetView = ({ loading, widgetId, dashboardId }: IPageWidgetViewProps) => {

    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, widgetId));
    const dispatch = useDispatch();
    const [addingWidget, setAddingWidget] = useState(false);
    let history = useHistory();
    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));
    const theme = useTheme();

    const addWidgetToDashboardClick = async () => {

        setAddingWidget(true);

        try {
            var dashboardWidgets = await dispatch(fetchCreateDashboardWidget({
                dashboardWidget: {
                    dashboardWidgetId: '',
                    widgetId,
                    orderNumber: 0,
                    dashboardId,
                }
            })) as any;

            if (dashboardWidgets?.length) history.push(GetDashboardLinkByDashboardIdAndName(dashboardId, dashboard?.name || ''));
        }
        finally {
            setAddingWidget(false);
        }
    }

    if (!widget) {
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
                                    Widget not found.
                                </Typography>
                                <Typography variant="subtitle2">
                                    You may have followed an invalid link or the widget has been removed.
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
            <Grid container
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item xs={12} md={6} xl={4} style={{
                    backgroundColor: '#FFF',
                    padding: theme.spacing(3),
                    borderRadius: theme.shape.borderRadius,
                    minWidth: '400px',
                }}>
                    <Typography variant="body2" style={{marginBottom: theme.spacing(3)}}>
                        Add the <i>{widget?.name}</i> widget to your {dashboard?.name} dashboard?
                    </Typography>
                    <Typography variant="caption" color="textSecondary" style={{ margin: theme.spacing(3), }}>
                        {widget.description}
                    </Typography>
                    <div
                        style={{
                            textAlign: 'right',
                            marginTop: theme.spacing(3),
                        }}
                    >
                        <ButtonSecondaryDark
                            variant="text"
                            onClick={() => history.goBack()}
                        >
                            Back
                        </ButtonSecondaryDark>
                        &nbsp;
                        <ButtonPrimaryDark
                            variant="outlined"
                            onClick={addWidgetToDashboardClick}
                        >
                            Confirm<LoaderAbsoluteCentred loading={addingWidget} />
                        </ButtonPrimaryDark>
                    </div>
                </Grid>
            </Grid>
            <LoaderAbsoluteCentred loading={loading} />
        </Container>
    );
}


export default PageWidgetView;