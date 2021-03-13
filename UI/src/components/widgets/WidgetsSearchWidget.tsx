import React, { useState } from 'react';
import { makeStyles, Typography, Grid, Divider, TextField, InputAdornment, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LoaderAbsoluteCentred from '../generic/loaders/LoaderAbsoluteCentred';
import { CustomColors } from '../../utilities/Styles';
import WidgetIcon from './WidgetIcon';
import ButtonSecondary from '../generic/buttons/ButtonSecondary';
import { Link, useHistory } from 'react-router-dom';
import { IUseFetchWidgetsPageHookProps, useFetchWidgetsPageHook } from './Hook';
import { WidgetSearchOrderTypeEnum } from '../../redux/widget/types';
import IWidget from '../../@types/Widget';
import { GetWidgetLinkByNameIdAndDashboardId } from '../../routes/RouteLinkHelpers';
import { GetUserId } from '../../utilities/ApiUtils';
import ButtonPrimaryDark from '../generic/buttons/ButtonPrimaryDark';
import ButtonSecondaryDark from '../generic/buttons/ButtonSecondaryDark';


const useStyles = makeStyles(theme => ({
    searchRoot: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        marginBottom: theme.spacing(3),
    },
    input: {
        flex: 1,
    },
    widgetSearchResultWrapper: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        cursor: 'default',
    },
    widgetSearchResultInnerWrapper: {
        transition: 'background 200ms ease-out',
        cursor: 'pointer',
        backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#DEDEDE',
        },
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        padding: theme.spacing(2),
    },
    widgetSearchResultDivider: {
    }
}));




interface IWidgetsSearchWidgetProps {
    query: string,
    dashboardId: string,
}


function WidgetsSearchWidget({ query, dashboardId }: IWidgetsSearchWidgetProps) {

    const classes = useStyles();
    const theme = useTheme();
    const [searchText, setSearchTextFilter] = useState<string>(query || '');
    const [orderTypeToSearchWith] = useState<WidgetSearchOrderTypeEnum>();
    const userId = GetUserId();
    const history = useHistory();
    const [currentSearchValues, setCurrentSearchValues] = useState<IUseFetchWidgetsPageHookProps>({
        pageNumber: 1,
        pageSize: 30,
        minPageNumberToFetch: 1,
    });

    function runSearch(e: any) {
        setCurrentSearchValues({
            ...currentSearchValues,
            text: searchText,
            orderType: orderTypeToSearchWith,
        });

        e?.preventDefault?.();
    }

    function onSearchTextChangeHandler(event: any) {
        setSearchTextFilter(event.target.value);
    }

    // Fetch first page of widgets
    const { fetching: fetchingWidgets, lastResultSet } = useFetchWidgetsPageHook({
        ...currentSearchValues
    });

    return (
        <>
            <Grid container style={{ marginBottom: 32 }}>
                <Grid item xs={10}>
                    <Typography variant="body1" style={{
                        color: CustomColors.MetalDarkTextColor,
                        fontWeight: 600,
                    }} >
                        Widget browser
                </Typography>
                </Grid>
                {userId ? (
                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                        <ButtonSecondaryDark
                            variant="text"
                            onClick={() => history.goBack()}
                        >
                            Back
                        </ButtonSecondaryDark>
                    </Grid>
                ) : null}
            </Grid>
            <div
                style={{
                    marginLeft: theme.spacing(2),
                    marginRight: theme.spacing(2),
                }}
            >
                <form
                    className={classes.searchRoot}
                    onSubmit={runSearch}
                >
                    <TextField
                        margin="none"
                        variant="outlined"
                        className={classes.input}
                        placeholder="Search widgets"
                        onChange={onSearchTextChangeHandler}
                        type="text"
                        onSubmit={runSearch}
                        size="small"
                        fullWidth={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            style: {
                                backgroundColor: '#FFF',
                                padding: '6px 10px'
                            }
                        }}
                    />
                </form>
            </div>

            <div>
                <Grid container>
                    {
                        lastResultSet.map(x => {
                            return (
                                <>
                                    <WidgetSearchResult widget={x} dashboardId={dashboardId} />
                                </>
                            )
                        })
                    }
                    {
                        (lastResultSet.length || fetchingWidgets) ? null : (
                            <Grid item xs={12} sm={7} md={3}
                                style={{
                                    textAlign: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    opacity: 0.8,
                                    marginTop: 16,
                                }}
                            >
                                <Typography variant="body2" style={{ marginBottom: 16 }}>
                                    No results
                               </Typography>
                                <Typography variant="body2">
                                    You can try using different keywords, checking for typos or adjusting filters.
                               </Typography>
                            </Grid>
                        )
                    }
                </Grid>
                <LoaderAbsoluteCentred loading={fetchingWidgets} />
            </div>
        </>
    );
}


const WidgetSearchResult = ({ widget, dashboardId }: { widget: IWidget, dashboardId: string }) => {

    const classes = useStyles();

    return (
        <Grid
            item
            xs={12}
            md={6}
            xl={4}
            className={classes.widgetSearchResultWrapper}
            component={Link}
            to={GetWidgetLinkByNameIdAndDashboardId(widget?.widgetId, widget?.name, dashboardId)}
        >
            <div className={classes.widgetSearchResultInnerWrapper}>
                <div style={{ flexShrink: 0, display: 'flex', marginRight: 16 }}>
                    <WidgetIcon widgetName={widget.name} />
                </div>
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    <div>
                        <Typography variant="body2" style={{
                            color: CustomColors.MetalDarkTextColor,
                            fontWeight: 600,
                        }} >
                            {widget.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: CustomColors.MetalDefaultTextColor }} >
                            10 members <b>&middot;</b>&nbsp;
                                4 posts <b>&middot;</b>&nbsp;
                                {widget.description}
                        </Typography>
                    </div>
                </div>
            </div>
        </Grid>
    )
}


export default WidgetsSearchWidget;