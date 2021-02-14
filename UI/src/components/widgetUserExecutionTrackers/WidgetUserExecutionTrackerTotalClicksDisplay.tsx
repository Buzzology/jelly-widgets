import { makeStyles, Slide } from '@material-ui/core';
import { CustomColors } from '../../utilities/Styles';
import { GetUserId } from '../../utilities/ApiUtils';
import { useSelector } from 'react-redux';
import { selectorGetWidgetUserExecutionTrackerByUserDetailId } from '../../redux/widgetUserExecutionTracker/selectors';
import { RootState } from '../../redux';
import { selectorGetFirstActiveSubscription } from '../../redux/subscription/selectors';
import ISubscription from '../../@types/Subscription';
import IWidgetUserExecutionTracker from '../../@types/WidgetUserExecutionTracker';
import { Generic } from '../../utilities/Constants'
import React, { useEffect, useState } from 'react';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    wrapper: {
        marginRight: theme.spacing(2),
    },
    innerContentWrapper: {
        borderRadius: theme.shape.borderRadius,
    },
    freeRunsWrapper: {
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: '85%',
        color: CustomColors.MetalDefaultTextColor
    },
    countContainer: {
        color: '#f8f8fa',
        fontWeight: 'bold',
        fontSize: '15px',
        borderRadius: theme.shape.borderRadius,
        padding: `7px 8px`,
        position: 'relative',
        overflow: 'hidden',
        opacity: 1,
        // border: '1px solid rgba(0,0,0,0.1)'
    }
}));



function WidgetUserExecutionTrackerTotalClicksDisplay() {

    const userDetailId = GetUserId();
    const widgetUserExecutionTracker = useSelector((store: RootState) => selectorGetWidgetUserExecutionTrackerByUserDetailId(store, userDetailId));
    const classes = useStyles();
    const activeSubscription = useSelector((store: RootState) => selectorGetFirstActiveSubscription(store, userDetailId));

    if (!widgetUserExecutionTracker) return null;

    return (
        <div className={classes.wrapper}>
            <div className={classes.innerContentWrapper}>
                {!activeSubscription ? (
                    <SubscriberContent
                        subscription={activeSubscription}
                        executionTracker={widgetUserExecutionTracker}
                    />
                ) : (
                        <FreeUserContent
                            executionTracker={widgetUserExecutionTracker}
                        />
                    )}
            </div>
        </div>
    );
}


function SubscriberContent({ subscription }: { subscription: ISubscription, executionTracker: IWidgetUserExecutionTracker }) {
    return (
        <div>{subscription?.expires?.seconds}</div>
    )
}


function FreeUserContent({ executionTracker }: { executionTracker: IWidgetUserExecutionTracker }) {

    const classes = useStyles();
    const { dailyExecutions } = executionTracker;
    const [internailDailyExecutions, setInternalDailyExecutions] = useState(executionTracker?.dailyExecutions || Generic.DAILY_FREE_EXECUTIONS);
    const [visible, setVisible] = useState(true);
    const remainingRuns = Generic.DAILY_FREE_EXECUTIONS - internailDailyExecutions;
    const hoursUntilReset = Math.ceil(((executionTracker.dailyExecutionsReset.seconds * 1000) - new Date().getTime()) / 1000 / 3600);

    useEffect(() => {
        setVisible(false);
        setTimeout(() => {
            setVisible(true);
            setInternalDailyExecutions(dailyExecutions);
        }, 200);
    }, [dailyExecutions]);

    return (
        <div className={classes.freeRunsWrapper}>
            <div
                className={classes.countContainer}
                style={{
                    color: remainingRuns < 10 ? red[700] : CustomColors.DarkBrownSecondaryColor
                }}
            >
                {remainingRuns > 0 ? (
                    <>
                        <Slide in={visible} direction="down">
                            <div style={{ display: 'inline-block' }}>
                                {remainingRuns}&nbsp;

                            </div>
                        </Slide>
                        <span style={{
                            fontSize: '75%',
                            fontWeight: 'normal'
                        }}>
                            left today
                    </span>
                    </>
                ) : (
                        <div style={{
                            fontSize: '75%',
                            fontWeight: 'normal',
                        }}>
                            Resets in&nbsp;
                            <span style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                {hoursUntilReset}
                            </span>&nbsp;
                            {hoursUntilReset > 1 ? 'hrs' : 'hr'}
                        </div>
                    )}
            </div>
        </div>
    )
}


export default WidgetUserExecutionTrackerTotalClicksDisplay;