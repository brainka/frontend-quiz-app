import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
	const location = useLocation();
	const { score, topic } = location.state;
	const navigate = useNavigate();

	function goBackToHomePage() {
		navigate('/');
	}

	return (
		<div>
			<div>ResultsPage</div>
			<div>{score}</div>
			<div>{topic}</div>
			<button onClick={goBackToHomePage}>Play again</button>
		</div>
	);
};

export default ResultsPage;
