import { Alert, Snackbar } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';

const Notify = ({ message, severity }) => {
	const [popup, setPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [popupSeverit, setPopupSeverit] = useState('info');

	useCallback(() => {
		setPopup(true);
		setPopupMessage(message);
		setPopupSeverit(severity ?? 'info');
	}, [message, severity]);

	return (
		<>
			<Snackbar
				open={popup}
				autoHideDuration={6000}
				onClose={() => setPopup(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={() => setPopup(false)} severity={popupSeverit}>
					{popupMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Notify;
