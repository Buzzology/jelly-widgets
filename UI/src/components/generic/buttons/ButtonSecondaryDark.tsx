import { withStyles, Button } from "@material-ui/core";
import { CustomColors } from "../../../utilities/Styles";

export default withStyles({
    root: {
        backgroundColor: 'none',
        color: CustomColors.MetalDarkTextColor,
        fontWeight: 'bold',
        textTransform: 'none',
    },
    label: {
        textTransform: 'none',
    },
})(Button);