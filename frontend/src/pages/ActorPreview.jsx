import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useActor } from '../hooks/useActor';

const ActorPreview = () => {
	const { id } = useParams();
	const { loading, actorData } = useActor(id);

	const userData = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!userData.user) {
		navigate('/login');
	}

	return (
		<div>
			<p>Hello World</p>
		</div>
	);
};

export default ActorPreview;
