import {createMuiTheme} from "@material-ui/core/styles";
// import purple from '@material-ui/core/colors/purple';
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[400],
		},
		secondary: {
			main: green[500],
		},
	},
});

export default theme;
