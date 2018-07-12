import { createMuiTheme } from "@material-ui/core";
import {
    teal as primary, // Primary color
    brown as secondary, // Primary color
} from '@material-ui/core/colors'

/**
 * Material UI theme feature
 * @see https://material-ui.com/customization/themes/
 * @see https://material-ui.com/style/color/
 */
export const theme = createMuiTheme({
    palette: {
        primary,
        secondary,
    },
})