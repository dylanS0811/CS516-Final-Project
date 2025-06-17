import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import parseJwt from '../utils/jwt-decode';



export function Scores() {
    const [scores, setScores] = useState([]);
    const [token] = useState(localStorage.getItem('id_token'))
    const [username, setUsername] = useState("")




    useEffect(() => {
        fetchScores()
        if (token) {
            const decoded = parseJwt(token);
            if (decoded?.email) {
                const email = decoded["email"];
                const namePart = email.split("@")[0];
                setUsername(namePart);
            }
          }
        

    }, []);





    const fetchScores = async () => {
        if (!token) return console.error('🚫 No id_token found.')

        try {
            const response = await fetch(import.meta.env.VITE_SCORES_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response)

            const result = await response.json();

            console.log(result)

            if (!response.ok) {
                console.error('❌ Error fetching scores:', result);
                alert(result.message || 'Failed to fetch scores');
                return;
            }

            setScores(result.scores || []);
            console.log('✅ Scores fetched:', result.scores);
        } catch (err) {
            console.error('❌ Failed to fetch scores:', err);
            alert('Network or server error');
        }
    };



    return (
        <>
            <div className='main'>

                <div className="scores-wrapper">
                    <h1>{username ? `${username}'s` : ''} Leaderboard</h1>                    
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{username} Score</th>
                                <th>Player 2 Score</th>
                                {/* <th>Score</th> */}
                                <th>Winner</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.player1Score}</td>
                                    <td>{entry.player2Score}</td>

                                    <td
                                        className={
                                            entry.player1Score === entry.player2Score
                                                ? "draw-cell"
                                                : entry.player1Score > entry.player2Score
                                                    ? "winner-cell"
                                                    : ""
                                        }
                                    >
                                        {entry.player1Score === entry.player2Score
                                            ? "Draw"
                                            : entry.player1Score > entry.player2Score
                                                ? entry.email.split("@")[0]
                                                : "Player2"}
                                    </td>

                                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
