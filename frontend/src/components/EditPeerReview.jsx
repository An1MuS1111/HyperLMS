import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const EditPeerReview = () => {
    const { id } = useParams(); // Use useParams to get the ID from the URL

    const [formData, setFormData] = useState({
        reviewName: '',
        reviewDetails: '',
        numQuestions: 0,
        questions: [],
        teams: [],
    });

    const [teamsList, setTeamsList] = useState([]);

    useEffect(() => {
        // Fetch existing peer review data based on ID from the URL
        axios.get(`http://localhost:4444/peerReviews/${id}`)
            .then(response => {
                const { reviewName, reviewDetails, questions, teams } = response.data;
                setFormData({
                    reviewName,
                    reviewDetails,
                    numQuestions: questions.length,
                    questions,
                    teams,
                });
            })
            .catch(error => console.error('Error fetching peer review data:', error));

        // Fetch teams on component mount
        axios.get('http://localhost:4444/teams')
            .then(response => setTeamsList(response.data))
            .catch(error => console.error('Error fetching teams:', error));
    }, [id]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare object for API request
        const apiRequestData = {
            reviewName: formData.reviewName,
            reviewDetails: formData.reviewDetails,
            questions: formData.questions,
            teams: formData.teams,
        };

        // Send API request for updating peer review
        axios.post(`http://localhost:4444/peerReviews/update/${id}`, apiRequestData)
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

export default EditPeerReview;
