import { useEffect, useState } from 'react';
import getActorApi from '../api/getActorApi';

export const useActor = (id) => {
	const [actorData, setActorData] = useState({
		loading: true,
		actorData: null,
	});

	useEffect(() => {
		const fetchActor = async () => {
			const response = await getActorApi(id);
			console.log(response);
			setActorData({
				loading: false,
				actorData: response,
			});
		};

		fetchActor();
	}, []);

	return actorData;
};
