import ManagePeerReview from "./pages/ManagePeerReview/ManagePeerReview";
import Review from "./pages/Review/Review"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPeerReview from './components/AddPeerReview'
import EditPeerReview from './components/EditPeerReview'

export default function App() {
    return (<>

        <Router>
            <Routes>
                <Route path="/" exact element={<ManagePeerReview />} />
                {/* <Route path="/peerReviews/:peerReviewId/:userId" exact element={<Review />} /> */}
                <Route path="/peerReviews/:peerReviewId/:teamId/:userId" exact element={<Review />} />
                <Route path="/addPeerReview" exact element={<AddPeerReview />} />
                <Route path='/edit/:id' exact element={<EditPeerReview />} />

            </Routes>
        </Router>
    </>)
}