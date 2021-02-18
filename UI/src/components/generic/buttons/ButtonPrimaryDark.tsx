import { withStyles, Button } from "@material-ui/core";
import { CustomColors } from "../../../utilities/Styles";

export default withStyles({
    root: {
        backgroundColor: CustomColors.DarkBrownSecondaryColor,
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'opacity 200ms ease-out',
        '&:hover': {
            opacity: 0.8,
            backgroundColor: CustomColors.DarkBrownSecondaryColor,
        }
    },
    label: {
        textTransform: 'none',
    },
})(Button);