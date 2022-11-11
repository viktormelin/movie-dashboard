import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: 'rgba(255, 255, 255, 0.54)',
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(255, 255, 255, 0.06)',
					'&::before': {
						borderColor: 'rgba(255, 255, 255, 0.54)',
					},
					color: '#fff',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				h1: {
					fontSize: '3rem',
					fontWeight: 'bold',
				},
				h2: {
					fontSize: '2.5rem',
					fontWeight: 'bold',
				},
				h3: {
					fontSize: '2rem',
					fontWeight: 'bold',
				},
				body2: {
					fontSize: '1rem',
					color: 'rgba(255, 255, 255, 0.54)',
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: '#f2ec9b',
					color: '#000',
				},
				tooltipArrow: {
					backgroundColor: '#f2ec9b',
					color: '#000',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#212121',
					borderRadius: '0.5rem',
				},
			},
		},
	},
	palette: {
		primary: {
			light: '#ffffcd',
			main: '#f2ec9b',
			dark: '#beba6c',
		},
		secondary: {
			light: '#59abf2',
			main: '#007cbf',
			dark: '#00508e',
		},
		gray: {
			light: '#484848',
			main: '#212121',
			dark: '#000000',
		},
	},
});
