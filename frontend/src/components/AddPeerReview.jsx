

import { useState, useEffect } from 'react';
import axios from 'axios';

const AddPeerReview = () => {
    const [formData, setFormData] = useState({
        reviewName: '',
        reviewDetails: '',
        numQuestions: 0,
        questions: [],
        teams: [],
    });

    const [teamsList, setTeamsList] = useState([]);

    useEffect(() => {
        // Fetch teams on component mount
        axios.get('http://localhost:4444/teams')
            .then(response => setTeamsList(response.data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const handleTeamAdd = (teamId) => {
        setFormData(prevData => ({
            ...prevData,
            teams: [...prevData.teams, teamId],
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            question: value,
        };

        setFormData({
            ...formData,
            questions: updatedQuestions,
        });
    };

    const handleTeamChange = (index, value) => {
        const updatedTeams = [...formData.teams];
        updatedTeams[index] = value;

        setFormData({
            ...formData,
            teams: updatedTeams,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Make the API request with axios
    //         const response = await axios.post('http://localhost:4444/apiname/add', formData);
    //         console.log(response.data); // Handle the response accordingly
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare object for API request
        const apiRequestData = {
            reviewName: formData.reviewName,
            reviewDetails: formData.reviewDetails,
            questions: formData.questions,
            teams: formData.teams,
        };

        console.log(apiRequestData)
        // Send API request
        axios.post('http://localhost:4444/peerReviews/add', apiRequestData)
            .then(response => {
                // Handle success
                console.log('API Response:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('API Error:', error);
            });
    };

    const renderQuestionsInputs = () => {
        const questionInputs = [];
        for (let i = 0; i < formData.numQuestions; i++) {
            questionInputs.push(
                <div key={i}>
                    <label>{`Question ${i + 1}:`}</label>
                    <input
                        type="text"
                        value={formData.questions[i]?.question || ''}
                        onChange={(e) => handleQuestionChange(i, e.target.value)}
                    />
                </div>
            );
        }
        return questionInputs;
    };

    const renderTeamsInputs = () => {
        const teamInputs = formData.teams.map((team, index) => (
            <div key={index}>
                <label>{`Team ${index + 1}:`}</label>
                <input
                    type="text"
                    value={team}
                    onChange={(e) => handleTeamChange(index, e.target.value)}
                />
            </div>
        ));
        return teamInputs;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Peer Review Name:</label>
                <input
                    type="text"
                    name="reviewName"
                    value={formData.reviewName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Peer Review Details:</label>
                <input
                    type="text"
                    name="reviewDetails"
                    value={formData.reviewDetails}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Number of Questions:</label>
                <input
                    type="number"
                    name="numQuestions"
                    value={formData.numQuestions}
                    onChange={handleChange}
                />
            </div>
            {renderQuestionsInputs()}
            {/* {renderTeamsInputs()} */}


            <h3>Select Teams:</h3>
            <table>
                <tbody>
                    {teamsList.map(team => (
                        <tr key={team._id}>
                            <td>{team.teamName}</td>
                            <td>
                                <button onClick={() => handleTeamAdd(team._id)}>
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                Team added: {formData.teams.map(teamId => teamsList.find(team => team._id === teamId)?.teamName).join(', ')}
            </div>


            <button type="submit">Submit</button>
        </form>
    );
};

export default AddPeerReview;














// ***
// Last part last part last part
// ***




// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManagePeerReview = () => {
//     const [formData, setFormData] = useState({
//         reviewName: '',
//         reviewDetails: '',
//         questions: [],
//         teams: [],
//     });

//     const [teamsList, setTeamsList] = useState([]);

//     useEffect(() => {
//         // Fetch teams on component mount
//         axios.get('http://localhost:4444/teams')
//             .then(response => setTeamsList(response.data))
//             .catch(error => console.error('Error fetching teams:', error));
//     }, []);

//     const handleQuestionCountChange = (count) => {
//         const questionsArray = Array.from({ length: count }, (_, index) => ({
//             questionId: 100 + index, // You can adjust the starting questionId as needed
//             question: '',
//         }));
//         setFormData(prevData => ({
//             ...prevData,
//             questions: questionsArray,
//         }));
//     };

//     const handleTeamAdd = (teamId) => {
//         setFormData(prevData => ({
//             ...prevData,
//             teams: [...prevData.teams, teamId],
//         }));
//     };

//     const handleSubmit = () => {
//         // Prepare object for API request
//         const apiRequestData = {
//             reviewName: formData.reviewName,
//             reviewDetails: formData.reviewDetails,
//             questions: formData.questions,
//             teams: formData.teams,
//         };

//         // Send API request
//         axios.post('YOUR_API_ENDPOINT', apiRequestData)
//             .then(response => {
//                 // Handle success
//                 console.log('API Response:', response.data);
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error('API Error:', error);
//             });
//     };

//     return (
//         <div>
//             <label>Peer Review Name:
//                 <input
//                     type="text"
//                     value={formData.reviewName}
//                     onChange={(e) => setFormData({ ...formData, reviewName: e.target.value })}
//                 />
//             </label>

//             <label>Peer Review Details:
//                 <input
//                     type="text"
//                     value={formData.reviewDetails}
//                     onChange={(e) => setFormData({ ...formData, reviewDetails: e.target.value })}
//                 />
//             </label>

//             <label>Number of Questions:
//                 <input
//                     type="number"
//                     value={formData.questions.length}
//                     onChange={(e) => handleQuestionCountChange(e.target.value)}
//                 />
//             </label>

//             <h3>Select Teams:</h3>
//             <table>
//                 <tbody>
//                     {teamsList.map(team => (
//                         <tr key={team._id}>
//                             <td>{team.teamName}</td>
//                             <td>
//                                 <button onClick={() => handleTeamAdd(team._id)}>
//                                     Add
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div>
//                 Team added: {formData.teams.map(teamId => teamsList.find(team => team._id === teamId)?.teamName).join(', ')}
//             </div>

//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//     );
// };

// export default ManagePeerReview;
