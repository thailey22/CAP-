import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Context/authContext'
import { useNavigate } from 'react-router-dom'
import { getDatabase, set, ref, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import './Car.css'

const Cars = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [car_color, setCarColor] = useState('');
    const [car_make, setCarMake] = useState('');
    const [car_model, setCarModel] = useState('');
    const [car_lpn, setCarLPN] = useState('');
    const [userCars, setUserCars] = useState([]);

    const auth = getAuth();

    useEffect(() => {
        const db = getDatabase();
        const uid = auth.currentUser?.uid;
        const userCarsRef = ref(db, `user/${uid}/Cars`);

        // Listen for changes in the user's cars data
        onValue(userCarsRef, (snapshot) => {
            const carsData = snapshot.val();
            if (carsData) {
                const carsArray = Object.entries(carsData).map(([key, value]) => ({
                    make: key,
                    ...value
                }));
                setUserCars(carsArray); // Set the cars data in state
            } else {
                setUserCars([]); // No cars found
            }
        });
    }, [auth.currentUser?.uid]);


    const pushCarData = (e) => {
        e.preventDefault();
        const db = getDatabase();
        const uid = auth.currentUser?.uid; 
        const userRef = ref(db, `user/${uid}/Cars/${car_make}`);
    
        set(userRef, {
          Color: car_color,
          Make: car_make,
          Model: car_model,
          LPN: car_lpn
        });
        navigate('/Cars')
      };

      
    

    return(
        <div>
             <header>
                    <nav className='nav-container'>
                        <div className='nav-div'>Hello {currentUser.email ? currentUser.email : currentUser.email}, you are now logged in.</div>
                        <ul>
                            <li><a href="/about">Spot view</a></li>
                            <li><a href= '/Live-view'>Live View</a></li>
                            <li><a href="/Cars"> Cars</a></li>
                            <li><a href="/"> Home</a></li>
                        </ul>
                    </nav>
                </header>
          <section className='add-car-section'>      
            <form onSubmit={pushCarData}>
                 <div>
                    <label>Enter the color of your car </label>
                    <input type="text"
                     value={car_color}
                     onChange={(e) => setCarColor(e.target.value)}
                     required
                     />
                </div>

                <div>
                    <label>Enter the make of your car </label>
                    <input type="text"
                     value={car_make}
                     onChange={(e) => setCarMake(e.target.value)}
                     required
                     />
                </div>

                <div>
                    <label>Enter the model of your car </label>
                    <input type="text"
                     value={car_model}
                     onChange={(e) => setCarModel(e.target.value)}
                     required
                     />
                </div>
                
                <div>
                    <label>Enter the LPN of your car </label>
                    <input type="text"
                     value={car_lpn}
                     onChange={(e) => setCarLPN(e.target.value)}
                     required
                     />
                </div>
                
                <button type="submit">Submit</button>
           </form>
            </section>

            <section className='car-list-section'>
           <h3>Your Cars:</h3>
                {userCars.length > 0 ? (
                    <ul>
                        {userCars.map((car, index) => (
                            <li key={index}>
                                 {car.Color} - {car.Make} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cars found.</p>
                )}
                </section>
           </div>
    )
}

export default Cars