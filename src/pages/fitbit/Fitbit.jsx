import React from 'react';
import styles from './Fitbit.module.css';
import Card from '../../component/card/Card';
import SlidingButton from '../../component/slidingbutton/Slide';
import Header from '../../container/header/Header';
import Button from '../../component/button/Button';

const Fitbit = () => {
    return (
        <div className={styles.fitbit}>
            <Header/>
            <SlidingButton/> 
            <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                    <Card title="Steps count"/>
                </div>
                <div className={styles.gridItem}>
                    <Card title="Steps count"/>
                </div>
                <div className={styles.gridItem}>
                    <Card title="Steps count"/>
                </div>
                <div className={styles.gridItem}>
                    <Card title="Steps count"/>
                </div>   
            </div>
            <Button text="download your report" />
        </div>
    );
}

export default Fitbit;

