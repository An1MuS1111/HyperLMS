import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPeerReview = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        reviewName: '',
        reviewDetails: '',
        numQuestions: 0,
        questions: [],
        teams: [],
    });

    const [teamsList, setTeamsList] = useState([]);
    const [addedTeams, setAddedTeams] = useState([]);

    useEffect(() => {
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

        axios.get('http://localhost:4444/teams')
            .then(response => setTeamsList(response.data))
            .catch(error => console.error('Error fetching teams:', error));
    }, [id]);

    const handleTeamAdd = (teamId) => {
        if (!formData.teams.includes(teamId) && !addedTeams.includes(teamId)) {
            setFormData(prevData => ({
                ...prevData,
                teams: [...prevData.teams, teamId],
            }));
            setAddedTeams(prevTeams => [...prevTeams, teamId]);
        }
    };

    const handleTeamRemove = (teamId) => {
        setFormData(prevData => ({
            ...prevData,
            teams: prevData.teams.filter(id => id !== teamId),
        }));
        setAddedTeams(prevTeams => prevTeams.filter(id => id !== teamId));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleQuestionChange = (index, value) => {
        setFormData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                questionId: index + 1, // Assuming questionId starts from 1
                question: value,
            };

            return {
                ...prevData,
                questions: updatedQuestions,
            };
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

        const apiRequestData = {
            reviewName: formData.reviewName,
            reviewDetails: formData.reviewDetails,
            questions: formData.questions,
            teams: formData.teams,
        };
        console.log(apiRequestData)
        axios.post(`http://localhost:4444/peerReviews/update/${id}`, apiRequestData)
            .then(response => {
                console.log('API Response:', response.data);
            })
            .catch(error => {
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
        const teamInputs = formData.teams.map((teamId, index) => (
            <div key={index}>
                <label>{`Team ${index + 1}:`}</label>
                <input
                    type="text"
                    value={teamsList.find(team => team._id === teamId)?.teamName || ''}
                    readOnly
                />
                <button type="button" onClick={() => handleTeamRemove(teamId)}>
                    Remove
                </button>
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
                <h3>Selected Teams:</h3>
                {renderTeamsInputs()}
            </div>


            <button type="submit">Update</button>
        </form>
    );
};

export default EditPeerReview;
