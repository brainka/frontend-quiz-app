import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className="homepage">
			<div className="homepage-left">
				<h1>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p>
					<span>Pick a subject to get started.</span>
				</p>
			</div>
			<div className="homepage-right">
				<Link to="/quiz/html" state={{ topic: 'HTML' }}>
					HTML
				</Link>
				<Link to="/quiz/css" state={{ topic: 'CSS' }}>
					CSS
				</Link>
				<Link to="/quiz/javascript" state={{ topic: 'JavaScript' }}>
					Javascript
				</Link>
				<Link to="/quiz/accessibility" state={{ topic: 'Accessibility' }}>
					Accessibility
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
