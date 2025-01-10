import React, { useState } from 'react';
import styles from './Appointment.module.css';
import Button from '../../component/button/Button';

const Appointment = () => {
    const [doctor, setDoctor] = useState('');

    const handleChange = (e) => {
        setDoctor(e.target.getAttribute('data-name') || '');
    }

    return (
        <div className={styles.appointment}>
            <div className={styles.doctorBox}>
                <h1 className={styles.fields}>Doctor: </h1>
                <input className={styles.doctor} type="text" value={doctor} readOnly />   
                <div className={styles.dropdownContainer}>
                    <button className={styles.dropdownBtn}>Select: </button>
                    <div className={styles.dropdownContent}>
                        <a href="#" onClick={handleChange} data-name="divyasai">Option 1</a>
                        <a href="#" onClick={handleChange} data-name="option2">Option 2</a>
                        <a href="#" onClick={handleChange} data-name="option3">Option 3</a>
                    </div>
                </div>
            </div>

            <div>
                <h1 className={styles.fields}>Timeslot: </h1>
                <input className={styles.timeslot} type="datetime-local" />
            </div>

            <Button text="show nearby doctors"/>
        </div>
    );
}

export default Appointment;

