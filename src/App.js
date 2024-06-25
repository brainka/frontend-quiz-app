import './App.css';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/quiz/:topic" element={<QuizPage />} />
				<Route path="/results" element={<ResultsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
