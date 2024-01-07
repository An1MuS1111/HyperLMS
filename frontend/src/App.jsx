import Review from "./pages/Review/Review"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/assessments/:assessment_id/:team_id/:user_id" component={Review} />
                {/* Other routes go here */}
            </Switch>
        </Router>
    )
}