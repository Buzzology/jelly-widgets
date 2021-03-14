import { makeStyles } from '@material-ui/core';
import { CustomColors } from "../../utilities/Styles";


const useStyles = makeStyles(theme => ({
    widgetIconWrapper: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
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


function WidgetIcon({ widgetId }: { widgetId: string }) {

    const classes = useStyles();

    return (
        <div className={`${classes.widgetIconWrapper}`}>
            <div className={classes.noImagePlaceholder}>
                <img
                    alt="Widget Icon"
                    src={`/img/widgets/${widgetId}.jpg`}
                    style={{
                        height: 50,
                        width: 50,
                    }}
                    onError={(e: any) => e.target.src = '/img/widgets/no-image.jpg'}
                />
            </div>
        </div>
    );
}


export default WidgetIcon;