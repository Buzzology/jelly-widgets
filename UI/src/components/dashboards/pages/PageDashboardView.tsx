import React, { } from 'react';
import { Container, Grid, Typography, IconButton } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux';
import { selectorGetDashboardById } from '../../../redux/dashboard/selectors';
import { CustomColors } from '../../../utilities/Styles';
import ButtonSecondary from '../../generic/buttons/ButtonSecondary';
import { UiFormStateIdEnum } from '../../../@types/UiFormState';
import { setFormOpenState } from '../../../redux/uiFormState/actions';
import EditDashboardIcon from '@material-ui/icons/EditTwoTone';


interface IPageDashboardViewProps {
    routeProps: RouteComponentProps<any>,
    loading: boolean,
    dashboardId: string,
}

const PageDashboardView = ({ loading, dashboardId }: IPageDashboardViewProps) => {

    const dashboard = useSelector((store: RootState) => selectorGetDashboardById(store, dashboardId));
    const dispatch = useDispatch();

    function setPostFormOpen() {
        dispatch(setFormOpenState(UiFormStateIdEnum.DashboardCreate, true, dashboardId));
    }

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
                        {dashboardId}
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
                    <>
                        <ButtonSecondary
                            variant="text"
                            onClick={setPostFormOpen}
                        >
                            Leave
                        </ButtonSecondary>
                        &nbsp;
                        <ButtonSecondary
                            variant="outlined"
                            onClick={setPostFormOpen}
                        >
                            Create Dashboard
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
                        {/* <PostsSearchWidget dashboardId={dashboard?.dashboardId} tags={tags} /> */}
                        Search Widget
                    </Grid>
                </Grid>
            </Grid>
            <LoaderAbsoluteCentred loading={loading} />
        </Container>
    );
}


export default PageDashboardView;