import React, { useState, useEffect } from 'react'
import { useAuth } from '../Context/authContext'
import { useNavigate } from 'react-router-dom'
import { getDatabase,ref,set,update, get } from 'firebase/database'
import { doSignOut } from '../Firebase/auth'
import { auth } from '../Firebase/firebase'


const Home = () => {
    const { currentUser, signOut } = useAuth()
    const navigate = useNavigate();
    const [spotStatus, setSpotStatus] = useState({});

    useEffect(() => {
        const fetchSpotStatus = async () => {
          const db = getDatabase();
          const dbRef = ref(db, 'Spots');
    
          try {
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
              setSpotStatus(snapshot.val());
            }
          } catch (error) {
            console.error('Error fetching spot status:', error);
          }
        };
    
        fetchSpotStatus();
      }, []);



    const handleSignOut = () => {
        const db = getDatabase();
        const uid = auth.currentUser?.uid; // Get the current user's UID
        const dbRef = ref(db, "user/" + `Google-users/${uid}`);
    
        
        update(dbRef, { active: false })
        .then(() => {
           
            signOut().then(() => {
                console.log('User signed out');
                navigate("/");
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        })
        .catch((error) => {
            console.error('Error updating loggedIn status:', error);
        });
    };

    const handleSpotButton = async (spotNumber) => {
        const db = getDatabase();
        const dbRef = ref(db, `Spots/Spot${spotNumber}`);
        const currentUserUid = auth.currentUser?.uid;
    
        try {
          const snapshot = await get(dbRef);
          if (snapshot.exists()) {

            const currentData = snapshot.val();
            if(currentData.status === 'Reserved' && currentData.reservedBy !== currentUserUid) {
              alert('This spot is already reserved by another user.');
              return;
            }
            const newStatus = currentData.status === 'Reserved' ? 'Free' : 'Reserved';
            const reservedBy = newStatus === 'Reserved' ? currentUserUid : null;

            await set(dbRef,{
              status: newStatus,
              reservedBy: reservedBy,
              timestamp: new Date().toISOString()
            })
    
            
            setSpotStatus((prevState) => ({
              ...prevState,
              [`Spot${spotNumber}`]: 
              { 
                status : newStatus,
                reservedBy : currentData.reservedBy,
                timestamp : currentData.timestamp
               }
            }));

          } else {

            await set(dbRef, {
              status: 'Reserved',
              reservedBy: currentUserUid,
              timestamp: new Date().toISOString()
             });
               setSpotStatus((prevState) => ({
              ...prevState,
              [`Spot${spotNumber}`]: {
                status : 'Reserved',
                reservedBy : currentUserUid,
                timestamp : new Date().toISOString()
               }
            }));
          }
        } catch (error) {
          console.error('Error updating spot status:', error);
        }
      };
    



    return (
        <div>
            <div>
                <header>
                    <nav className='nav-container'>
                        <div className='nav-div'>Hello {currentUser.email ? currentUser.email : currentUser.email}, you are now logged in.</div>
                        <ul>
                            <li><a href="/about">Spot view</a></li>
                            <li><a href= '/Live-view'>Live View</a></li>
                        </ul>
                    </nav>
                </header>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
             {[...Array(10).keys()].map(i => {
          const spotNumber = i + 1;
          const isReserved = spotStatus[`Spot${spotNumber}`]?.status === 'Reserved';
          return (
            <button
              key={spotNumber}
              className='parking-button'
              style={{
                backgroundColor: isReserved ? 'gray' : 'green' // Gray if reserved, green if free
              }}
              onClick={() => handleSpotButton(spotNumber)}
            >
              Spot {spotNumber}
            </button>
          );
        })}
    </div>    
    )
}

export default Home