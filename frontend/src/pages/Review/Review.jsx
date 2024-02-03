


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
    const [users, setUsers] = useState(null);
    const [ratings, setRatings] = useState({});
    const [firstTime, setFirstTime] = useState(true); // Added local state
    const [endPoint, setEndPoint] = useState('add')

    // useEffect(() => {
    //     // Fetch peer review data
    //     axios.get(`http://localhost:4444/peerReviews/${peerReviewId}`)
    //         .then(response => setPeerReview(response.data))
    //         .catch(error => console.error(error));

    //     // Fetch team data
    //     axios.get(`http://localhost:4444/teams/${teamId}`)
    //         .then(response => setTeam(response.data))
    //         .catch(error => console.error(error));

    //     // Fetch user data
    //     axios.get(`http://localhost:4444/users/${userId}`)
    //         .then(response => setUser(response.data))
    //         .catch(error => console.error(error));

    //     axios.get(`http://localhost:4444/users`)
    //         .then(response => setUsers(response.data))
    //         .catch(error => console.error(error));

    // }, [peerReviewId, teamId, userId]);

    useEffect(() => {
        // Fetch peer review data
        axios.get(`http://localhost:4444/peerReviews/${peerReviewId}`)
            .then(response => {
                setPeerReview(response.data);
                // Check if there are existing reviews for the user
                const userReview = response.data.reviews.find(review => review.reviewerId === userId);
                if (userReview) {
                    // If there's an existing review, set ratings accordingly
                    const newRatings = {};
                    userReview.ratings.forEach((rating, index) => {
                        const memberId = team.members[index];
                        const questionId = response.data.questions[index].questionId;
                        newRatings[`${memberId}_${questionId}`] = rating;
                    });
                    setRatings(newRatings);
                    setFirstTime(false); // Update firstTime state
                }
            })
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
            reviews: team.members
                .filter(memberId => memberId !== userId)
                .map(memberId => {
                    const userRatings = peerReview.questions.map(question => {
                        const ratingKey = `${memberId}_${question.questionId}`;
                        return ratings[ratingKey] || 0;
                    });

                    return {
                        reviewerId: userId,
                        reviewedUserId: memberId,
                        ratings: userRatings,
                    };
                }),
        };

        console.log(reviewData);

        // Determine the endpoint based on whether it's the first time or an update
        // const endpoint = firstTime ? 'add' : `update/${peerReviewId}`;


        if (!firstTime) {
            const apiUrl = 'http://localhost:3000/reviews';

            axios.post(`${apiUrl}/add`, reviewData)
                .then(response => {
                    const { message, reviewId } = response.data;

                    console.log(message);
                    console.log('Review ID:', reviewId);
                    setEndPoint(`update/${reviewId}`)
                })
                .catch(error => {
                    console.error('Error adding review:', error);
                });




            // POST request to submit or update the reviews
            axios.post(`http://localhost:4444/reviews/${endPoint}`, reviewData)
                .then(response => console.log(response.data))
                .catch(error => console.error(error));
        }
    };

    if (!peerReview || !team || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>{peerReview.reviewName}</h1>
            <p>{peerReview.reviewDetails}</p>
            {peerReview.questions.map(question => (


                <div key={question.questionId}>

                    <ReviewBox questionId={question.questionId} question={question.question} />

                    {/* <p>{`Question: ${question.question}`}</p> */}
                    {team.members.map(memberId => (
                        memberId !== userId && (
                            <div className='form-element' key={memberId}>
                                <p>{`Team Member: ${users.find(user => user._id === memberId)?.username || ''}`}</p><input
                                    type="number"
                                    min="0"
                                    max="3"
                                    value={ratings[`${memberId}_${question.questionId}`] || ''}
                                    onChange={(e) => {
                                        const inputValue = parseInt(e.target.value, 10); // Parse the input value as an integer
                                        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 3) {
                                            handleRatingChange(memberId, question.questionId, inputValue);
                                        }
                                    }}
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
