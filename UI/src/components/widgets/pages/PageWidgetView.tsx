import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux';
import { selectorGetWidgetById } from '../../../redux/widget/selectors';
import { CustomColors } from '../../../utilities/Styles';
import ButtonSecondary from '../../generic/buttons/ButtonSecondary';
import { UiFormStateIdEnum } from '../../../@types/UiFormState';
import { setFormOpenState } from '../../../redux/uiFormState/actions';
import EditWidgetIcon from '@material-ui/icons/EditTwoTone';
import { fetchCreateDashboardWidget } from '../../../redux/dashboardWidget/actions';


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

    const addWidgetToDashboardClick = async (e: any) => {

        setAddingWidget(true);

        debugger;

        try {
            await dispatch(fetchCreateDashboardWidget({
                dashboardWidget: {
                    dashboardWidgetId: '',
                    widgetId,
                    orderNumber: 0,
                    dashboardId,
                }
            }))
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
            <Grid container>
                <Grid item xs={10}>
                    {/* <Typography variant="body1" component="span" style={{
                        color: CustomColors.MetalDarkTextColor,
                        fontWeight: 600,
                    }} >
                        {widgetId}
                    </Typography>
                    {widget ? (
                        <>
                            <IconButton size="small" style={{ marginLeft: 8 }}>
                                <EditWidgetIcon style={{ height: 16, width: 16 }} />
                            </IconButton>
                        </>
                    ) : null} */}
                </Grid>

                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <>
                        <ButtonSecondary
                            variant="text"
                        >
                            Leave
                        </ButtonSecondary>
                        &nbsp;
                        <ButtonSecondary
                            variant="outlined"
                            onClick={addWidgetToDashboardClick}
                        >
                            {addingWidget ? (<LoaderAbsoluteCentred loading={loading} />) : "Add Widget"}
                        </ButtonSecondary>
                    </>
                </Grid>
                <Grid
                    container
                    xs={12}
                    direction="column"
                    justify="space-between"
                    style={{ marginTop: 24 }}
                >
                    <Grid item xs={12}>
                        <ButtonSecondary />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: 8, fontWeight: 600 }}>
                                {widget?.name}
                            </Typography>
                            <Typography variant="subtitle2">
                                {widget?.description}
                            </Typography>
                        </>
                    </Grid>
                </Grid>
            </Grid>
            <LoaderAbsoluteCentred loading={loading} />
        </Container>
    );
}


export default PageWidgetView;