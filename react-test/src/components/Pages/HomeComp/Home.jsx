import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import { auth } from '../../Firebase/firebase';
import './Home.css';

const Home = () => {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();
    const [spotStatus, setSpotStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonMessage, setButtonMessage] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'Spots');

        // Listen for real-time updates
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setSpotStatus(snapshot.val());
                }
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching spot status:', error);
                setLoading(false);
            }
        );

        setButtonMessage(currentUser ? 'Sign Out' : 'Sign In');

        return () => unsubscribe();
    }, [currentUser]);

    const handleSignOut = async () => {
        try {
            const db = getDatabase();
            const uid = auth.currentUser?.uid;
            const dbRef = ref(db, `user/${uid}`);

            await update(dbRef, { active: false });
            await signOut();
            console.log('User signed out');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleAuthButton = async () => {
        if (currentUser) {
            // Sign out the user
            try {
                const db = getDatabase();
                const uid = auth.currentUser?.uid;
                const dbRef = ref(db, `user/${uid}`);

                await update(dbRef, { active: false });
                await signOut();
                console.log('User signed out');
                setButtonMessage('Sign In');
                navigate('/');
            } catch (error) {
                console.error('Error signing out:', error);
            }
        } else {
            // Redirect to sign-in page
            navigate('/signin');
        }
    };

    const handleSpotButton = async (spotNumber) => {
        const db = getDatabase();
        const dbRef = ref(db, `Spots/Spot${spotNumber}`);
        const currentUserUid = auth.currentUser?.uid;

        try {
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const currentData = snapshot.val();

                // Check if spot is reserved by another user
                if (currentData.status === 'Reserved' && currentData.reservedBy !== currentUserUid) {
                    alert('This spot is already reserved by another user.');
                    return;
                }

                // Toggle reservation status
                const newStatus = currentData.status === 'Reserved' ? 'Free' : 'Reserved';
                const reservedBy = newStatus === 'Reserved' ? currentUserUid : null;

                await set(dbRef, {
                    status: newStatus,
                    reservedBy: reservedBy,
                    timestamp: new Date().toISOString(),
                });

                // Update local state
                setSpotStatus((prevState) => ({
                    ...prevState,
                    [`Spot${spotNumber}`]: {
                        status: newStatus,
                        reservedBy: reservedBy,
                        timestamp: new Date().toISOString(),
                    },
                }));
            } else {
                // Initialize spot data if it doesn't exist
                await set(dbRef, {
                    status: 'Reserved',
                    reservedBy: currentUserUid,
                    timestamp: new Date().toISOString(),
                });

                setSpotStatus((prevState) => ({
                    ...prevState,
                    [`Spot${spotNumber}`]: {
                        status: 'Reserved',
                        reservedBy: currentUserUid,
                        timestamp: new Date().toISOString(),
                    },
                }));
            }
        } catch (error) {
            console.error('Error updating spot status:', error);
            alert('An error occurred while updating the spot. Please try again.');
        }
    };

    return (
        <div>
            <header>
                <nav className="nav-container">
                    <div className="nav-div">
                        Hello {currentUser.email}, you are now logged in.
                    </div>
                    <div>
                    <button onClick={handleAuthButton}>
                            {buttonMessage}
                        </button>

                    </div>
                    <ul>
                        <li>
                            <a href="/about">Spot view</a>
                        </li>
                        <li>
                            <a href="/CameraFeed">Live View</a>
                        </li>
                        <li>
                            <a href="/Cars">Cars</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <button onClick={handleSignOut}>Sign Out</button>

            <div>
                {loading ? (
                    <p>Loading spots...</p>
                ) : (
                    [...Array(18).keys()].map((i) => {
                        const spotNumber = i + 1;
                        const isReserved = spotStatus[`Spot${spotNumber}`]?.status === 'Reserved';
                        return (
                            <button
                                key={spotNumber}
                                className="parking-button"
                                style={{
                                    backgroundColor: isReserved ? 'gray' : 'green',
                                }}
                                onClick={() => handleSpotButton(spotNumber)}
                            >
                                Spot {spotNumber}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Home;
