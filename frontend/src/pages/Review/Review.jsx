


import './Review.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewBox from '../../components/ReviewBox';

const Review = () => {
    const { peerReviewId, teamId, userId } = useParams();
    const [peerReview, setPeerReview] = useState(null);
    const [team, setTeam] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null)
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        // Fetch peer review data
        axios.get(`http://localhost:4444/peerReviews/${peerReviewId}`)
            .then(response => setPeerReview(response.data))
            .catch(error => console.error(error));

        // Fetch team data
        axios.get(`http://localhost:4444/teams/${teamId}`)
            .then(response => setTeam(response.data))
            .catch(error => console.error(error));

        // Fetch user data
        axios.get(`http://localhost:4444/users/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));

        axios.get(`http://localhost:4444/users`)
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));

    }, [peerReviewId, teamId, userId]);

    const handleRatingChange = (memberId, questionId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [`${memberId}_${questionId}`]: rating,
        }));
    };

    const handleSubmit = () => {
        // Prepare data for the POST request
        const reviewData = {

            peerReviewId,
            teamId,
            reviews: Object.keys(ratings).map(key => {
                const [memberId, questionId] = key.split('_');
                return {
                    reviewerId: userId,
                    reviewedUserId: memberId,
                    ratings: [ratings[key]],
                };
            }),
        };

        // POST request to submit the reviews
        axios.post('http://localhost:4444/reviews/add', [reviewData])
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    if (!peerReview || !team || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{peerReview.reviewName}</h1>
            <p>{peerReview.reviewDetails}</p>
            {peerReview.questions.map(question => (


                <div key={question.questionId}>

                    <ReviewBox questionId={question.questionId} question={question.question} />

                    {/* <p>{`Question: ${question.question}`}</p> */}
                    {team.members.map(memberId => (
                        memberId !== userId && (
                            <div key={memberId}>
                                {/* <p>{`Team Member: ${memberId}`}</p> */}
                                <p>{`Team Member: ${users.find(user => user._id === memberId)?.username || ''}`}</p>

                                <input
                                    type="number"
                                    min="0"
                                    max="3"
                                    value={ratings[`${memberId}_${question.questionId}`] || ''}
                                    onChange={(e) => handleRatingChange(memberId, question.questionId, e.target.value)}
                                />
                            </div>
                        )
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Reviews</button>
        </div>
    );
};

export default Review;
