import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { Message } from '@material-ui/icons';
import AnimationWrapper from '../animations/AnimationWrapper';


const useStyles = makeStyles(theme => ({
    noMessagesIconWrapper: {
        opacity: 0.5,
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    noMessagesIcon: {
        color: 'rgba(0,0,0,0.5)',
        width: 75,
        height: 75,
    },
    noResultsTextWrapper: {
        textAlign: 'center',
    },
    noResultsText: {
        opacity: 0.5,
        textAlign: 'center',
        fontSize: '85%',
        marginBottom: 0,
    },
    noResultsDescription: {
        opacity: 0.5,
        textAlign: 'center',
        marginBottom: 0,
        marginTop: -8,
    },
    spin: {
        animation: '$spin 5000ms infinite',
    },
    flip: {
        animation: '$flip 5000ms infinite',
    },
    fade: {
        animation: '$fade 5000ms infinite',
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    "@keyframes flip": {
        "0%": {
            transform: 'rotateY(0)',
        },
        "25%": {
            transform: "rotateY(360deg)"
        },
        "75%": {
            transform: 'rotateY(0)',
        },
    },
    "@keyframes fade": {
        "0%": {
            opacity: 1,
        },
        "25%": {
            opacity: 0.5,
        },
        "75%": {
            opacity: 1,
        },
    },
}));


interface WidgetNoResultsPlaceholder {
    icon?: any,
    text?: string,
    description?: string,
    spin?: boolean,
    flip?: boolean,
    fade?: boolean,
}


export function WidgetNoResultsPlaceholder({ icon = Message, text = "No results", description, spin = false, flip = false, fade = false }: WidgetNoResultsPlaceholder) {

    const classes = useStyles();
    const Icon = icon;

    return (
        <AnimationWrapper>
        <div>
            <Avatar sizes="lg" className={classes.noMessagesIconWrapper}>
                <Icon
                    className={`${classes.noMessagesIcon} ${spin ? classes.spin : null} ${flip ? classes.flip : null} ${fade ? classes.fade : null}`}
                />
            </Avatar>
            <div className={classes.noResultsTextWrapper}>
                <Typography variant="overline" className={classes.noResultsText}>{text}</Typography>
                {description && (
                    <Typography variant="caption" component="p" color="textSecondary" className={classes.noResultsDescription}>
                        {description}
                    </Typography>
                )}
            </div>
        </div>
        </AnimationWrapper>
    )
}