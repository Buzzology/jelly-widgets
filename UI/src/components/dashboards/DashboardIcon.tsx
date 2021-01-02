import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CustomColors } from "../../utilities/Styles";
import { Link, useParams } from 'react-router-dom';
import { GetDashboardLinkByDashboardIdAndName } from '../../routes/RouteLinkHelpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';


const useStyles = makeStyles(theme => ({
    dashboardIconWrapper: {
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
    activeDashboard: {
        opacity: 1,
    },
    dashboardImage: {
    }
}));


function DashboardIcon({ dashboardName, dashboardId }: { dashboardName: string, dashboardId: string }) {

    const classes = useStyles();
    const { dashboardId: currentDashboardId } = useParams() as any;
    // const files = useSelector((store: RootState) => selectorGetFilesByEntityTypeAndEntityId(store, EntityTypeEnum.Dashboard, dashboardName))

    return (
        <Link to={GetDashboardLinkByDashboardIdAndName(dashboardId, dashboardName)} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={`${classes.dashboardIconWrapper} ${currentDashboardId === dashboardId ? classes.activeDashboard : null}`}>
                {/* {files.length ? (
                    <div className={classes.dashboardImage}>
                        <img src={files[0].preSignedUrl} alt={files[0].description} />
                    </div>
                ) */}
                {/* : */}
                <div className={classes.noImagePlaceholder}>
                    {dashboardName?.substring(0, 1)}
                </div>
                {/* } */}
            </div>
        </Link >
    );
}


export default DashboardIcon;