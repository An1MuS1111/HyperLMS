import './Review.css'
import ReviewBox from '../../components/ReviewBox'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useState } from 'react';


// export default function Review() {

//     const { assessment_id, team_id, user_id } = useParams();
//     const [isLoading, setIsLoading] = useState(true)
//     const [assessment, setAssessment] = useState({})
//     const [team, setTeam] = useState()
//     const [user, setUser] = useState()

//     useEffect(() => {

//         console.log("assessment_id: " + assessment_id)
//         console.log("team_id: " + team_id)
//         console.log("user_id: " + user_id)
//         fetchAssessment()
//         fetchTeam()
//         fetchUser()
//         console.log("This is......" + assessment)

//     }, [])

//     // fetching starts here
//     const fetchAssessment = () => {
//         axios.get('http://localhost:4444/assessments/' + assessment_id)
//             .then(({ data }) => console.log(data))


//     }

//     const fetchTeam = () => {
//         axios.get('http://localhost:4444/teams/' + team_id)
//             .then(response => console.log(response.data))
//     }

//     const fetchUser = () => {
//         axios.get('http://localhost:4444/users/' + user_id)
//             .then(response => console.log(response.data))
//     }

//     return (
//         <ReviewBox />
//     )
// }

const Review = () => {

    const assessment = {
        "assessmentId": 1,
        "questions": [
            {
                "questionId": 101,
                "question": "What is your favorite color?"
            },
            {
                "questionId": 102,
                "question": "How many hours do you sleep on average?"
            }
        ]
    }

    const team = {
        "teamId": "T002",
        "teamName": "Good Team",
        "members": ["659ef24319285740f5962580", "659ef42b19285740f5962585"]
    }


    const user = {
        "userId": "01",
        "username": "khalid",
        "email": "khalidrafi1111@gmail.com"
    }

    const [reviews, setReviews] = useState([]);

    const handleInputChange = (questionId, memberId, value) => {
        const updatedReviews = [...reviews];
        const existingReviewIndex = updatedReviews.findIndex(
            (review) => review.questionId === questionId && review.reviewedUserId === memberId
        );

        if (existingReviewIndex !== -1) {
            updatedReviews[existingReviewIndex].rating = value;
        } else {
            updatedReviews.push({
                assessmentId: assessment.assessmentId,
                reviewId: generateReviewId(), // Implement a function to generate a unique reviewId
                reviewerId: user.userId,
                reviewedUserId: memberId,
                teamId: team.teamId,
                rating: value,
                comments: '',
            });
        }

        setReviews(updatedReviews);
    };

    const handleSubmit = () => {
        // Perform API requests for each review
        reviews.forEach((review) => {
            // Implement your API request logic here
            console.log('Sending API request for review:', review);
        });

        // Optionally, you can reset the state or perform other actions after submission
        setReviews([]);
    };

    return (
        <div>
            <h2>{assessment.questions.length} Questions</h2>
            {assessment.questions.map((question) => (
                <div key={question.questionId}>

                    <ReviewBox question={question.question} />
                    {team.members.map((memberId) => (
                        <div key={memberId}>
                            <label>
                                {`Member ${memberId}: `}
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    onChange={(e) => handleInputChange(question.questionId, memberId, e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Review;