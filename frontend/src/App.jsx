import ManagePeerReview from "./pages/ManagePeerReview/ManagePeerReview";
import Review from "./pages/Review/Review"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPeerReview from './components/AddPeerReview'
import EditPeerReview from './components/EditPeerReview'
import StudentList from "./pages/StudentList/StudentList";
import EditNewStudent from './components/EditNewStudent'
import AddNewStudent from './components/AddNewStudent'
import PerformAssessment from "./pages/PerformAssessment/PerformAssessment";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export default function App() {
    return (<>

        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/admin" exact element={<ManagePeerReview />} />
                {/* <Route path="/peerReviews/:peerReviewId/:userId" exact element={<Review />} /> */}
                <Route path="/peerReviews/:peerReviewId/:teamId/:userId" exact element={<Review />} />
                <Route path="/addPeerReview" exact element={<AddPeerReview />} />
                <Route path='/edit/:id' exact element={<EditPeerReview />} />
                <Route path="/studentList" exact element={<StudentList />} />
                <Route path='/editNewStudent/:id' exact element={<EditNewStudent />} />
                <Route path="/addNewStudent" exact element={<AddNewStudent />} />
                <Route path='/performAssessment/:id' exact element={<PerformAssessment />} />
                <Route path="/forgotPassword" exact element={<ForgotPassword />} />



            </Routes>
        </Router>
    </>)
}