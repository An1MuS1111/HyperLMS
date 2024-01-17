import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PeerReview = (props) => (
    <tr>
        <td>{props.peerReview.reviewName}</td>
        <td>
            <Link to={`/edit/${props.peerReview._id}`}>edit</Link> |{' '}
            <a href="#" onClick={() => props.deletePeerReview(props.peerReview._id)}>
                delete
            </a>
        </td>
    </tr>
);

const ManagePeerReview = () => {
    const [peerReviews, setPeerReviews] = useState([]);

    useEffect(() => {
        // Fetch data from the API and update the state
        axios.get('http://localhost:4444/peerReviews')
            .then(response => {
                setPeerReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const deletePeerReview = (id) => {
        axios.delete(`http://localhost:4444/peerReviews/${id}`)
            .then(res => console.log(res.data))
            .catch(error => console.error('Error deleting peer review:', error));

        setPeerReviews(prevPeerReviews => prevPeerReviews.filter(pr => pr._id !== id));
    };

    return (
        <>
            <Link to="/addPeerReview">
                Add Peer review
            </Link>
            <div>
                <h2>Peer Reviews</h2>
                <table>
                    <thead>
                        <tr>
                            <th>PeerReviewName</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peerReviews.map((peerReview) => (
                            <PeerReview
                                key={peerReview._id}
                                peerReview={peerReview}
                                deletePeerReview={deletePeerReview}
                            />
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default ManagePeerReview;
