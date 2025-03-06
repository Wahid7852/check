import styles from './Appointment.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const doctorDistances = {
    "Dr. Deepak Patil": "2 km away",
    "Dr. Tamboli": "20 minutes away",
    "Dr. vaze": "5 km away",
    "Dr. Joshi": "7 km away"
};

const Appointment = () => {
    const [doctor, setDoctor] = useState('');
    const [doctorDistance, setDoctorDistance] = useState('');
    const [showDoctorInfo, setShowDoctorInfo] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const selectedDoctor = e.target.textContent;
        setDoctor(selectedDoctor);
        setDoctorDistance(doctorDistances[selectedDoctor] || "Distance not available");
        setShowDoctorInfo(false); // Hide previous selection
    };

    const showSelectedDoctor = () => {
        if (doctor) {
            setShowDoctorInfo(true);
        }
    };

    return (
        <div className={styles.appointment}>
            <h1 className={styles.title}>Book an Appointment</h1>
            <div className={styles.doctorbox}>
                <h1 className={styles.fields}>Doctor: </h1>
                <input className={styles.doctor} type="text" value={doctor} readOnly />
                <div className={styles.dropdownContainer}>
                    <button className={styles.dropdownBtn}>Select: </button>
                    <div className={styles.dropdownContent}>
                        <a href="#" onClick={handleChange}>Dr. Deepak Patil</a>
                        <a href="#" onClick={handleChange}>Dr. Tamboli</a>
                        <a href="#" onClick={handleChange}>Dr. vaze</a>
                        <a href="#" onClick={handleChange}>Dr. Joshi</a>
                    </div>
                </div>
            </div>

            <div>
                <h1 className={styles.fields}>Timeslot: </h1>
                <input className={styles.timeslot} type="datetime-local" />
            </div>

            <button className={styles.showNearbyBtn} onClick={showSelectedDoctor}>
                Show Nearby Doctor
            </button>

            {/* Show only selected doctor's distance */}
            {showDoctorInfo && doctor && (
                <div className={styles.nearbyDoctors}>
                    <h2>Selected Doctor's Location:</h2>
                    <p>{doctor} - {doctorDistance}</p>
                    <button onClick={() => setShowDoctorInfo(false)} className={styles.closeBtn}>
                        Close
                    </button>
                </div>
            )}

            {/* Back to Homepage Link */}
            <button className={styles.backBtn} onClick={() => navigate('/')}>
                Back to Homepage
            </button>
        </div>
    );
};

export default Appointment;