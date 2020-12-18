import { withStyles, Button } from "@material-ui/core";
import { CustomColors } from "../../../utilities/Styles";

export default withStyles({
    root: {
        backgroundColor: CustomColors.DarkGreenPrimaryColor,
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'opacity 200ms ease-out',
        '&:hover': {
            opacity: 0.8,
            backgroundColor: CustomColors.DarkGreenPrimaryColor,
        }
    },
    label: {
        textTransform: 'none',
    },
})(Button);