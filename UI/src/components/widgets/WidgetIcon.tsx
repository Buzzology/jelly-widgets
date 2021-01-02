import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CustomColors } from "../../utilities/Styles";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';


const useStyles = makeStyles(theme => ({
    widgetIconWrapper: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        border: `1px solid ${CustomColors.MetalDarkTextColor}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: CustomColors.DarkBrownSecondaryColor,
        color: '#FFF',
        transition: 'box-shadow 200ms ease-in-out, opacity 200ms ease-in-out',
        opacity: 0.85,
        '&:hover': {
            opacity: 1,
        },
        overflow: 'hidden',
    },
    noImagePlaceholder: {
        textTransform: 'uppercase',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '35px',
        verticalAlign: 'middle',
    },
    activeWidget: {
        opacity: 1,
    },
    widgetImage: {
    }
}));


function WidgetIcon({ widgetName }: { widgetName: string }) {

    const classes = useStyles();
    const { widgetId } = useParams() as any;

    return (
        // <Link to={GetWidgetLinkByWidgetName(widgetName)} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`${classes.widgetIconWrapper} ${widgetId === widgetName ? classes.activeWidget : null}`}>
            <div className={classes.noImagePlaceholder}>
                {widgetName?.substring(0, 1)}
            </div>
        </div>
        // </Link >
    );
}


export default WidgetIcon;