import Review from "./pages/Review/Review"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/assessments/:assessment_id/:team_id/:user_id" exact element={<Review />} />

            </Routes>
        </Router>
    )
}