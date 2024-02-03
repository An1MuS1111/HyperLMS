// // src/App.js
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './PerformAssessment.css'


// function PerformAssessment() {

//     const { id } = useParams;


//     const [assessments, setAssessments] = useState();

//     const [teams, setTeams] = useState();



//     return (
//         <div className="performAssessment">
//             <h1>Student Dashboard</h1>

//             <div className="assessment">
//                 <h2>My Assessments</h2>
//                 <ul>
//                     {assessments.map((assessment) => (
//                         // Need to add here
//                     ))}
//                 </ul>
//             </div>

//             <div className='group'>
//                 <h2>My Team</h2>
//                 <ul>
//                     {teams.map((team) => (
//                         <li key={team.id}>
//                             {team.name}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default PerformAssessment;



// src/App.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PerformAssessment.css'

function PerformAssessment() {
    const { id } = useParams();
    const [assessments, setAssessments] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Fetch teams
        fetch('http://localhost:4444/teams/')
            .then(response => response.json())
            .then(data => {
                // Filter teams by user id
                const userTeams = data.filter(team => team.members.includes(id));
                setTeams(userTeams);
                // Extract teamIds
                const teamIds = userTeams.map(team => team._id);

                // Fetch peer reviews
                fetch('http://localhost:4444/peerReviews/')
                    .then(response => response.json())
                    .then(peerReviews => {
                        // Filter peer reviews by teamIds
                        const userAssessments = peerReviews.filter(review => review.teams.some(teamId => teamIds.includes(teamId)));
                        setAssessments(userAssessments);
                    });
            });
    }, [id]);

    return (
        <div className="performAssessment">
            <h1>Student Dashboard</h1>

            <div className="assessment">
                <h2>My Assessments</h2>
                <ul>
                    {assessments.map((assessment) => (
                        <li key={assessment._id}>
                            {assessment.reviewName}
                            <Link to={`/peerReviews/${assessment._id}/${assessment.teams[0]}/${id}`}>
                                <button>Perform</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='group'>
                <h2>My Team</h2>
                <ul>
                    {teams.map((team) => (
                        <li key={team._id}>
                            {team.teamName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PerformAssessment;
