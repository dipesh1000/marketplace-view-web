import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import styles from './StepsNav.module.css';

function StepsNav() {
    return (
        <>
            <div className={styles.stepsNav}>
                <div className={styles.stepsNav_inner_one}>
                    <div className={styles.active}>
                        <span className={styles.active}>1</span>
                        Personal Info
                        {/* <strong>></strong> */}
                    </div>
                    <div>
                        <span>2</span>
                        Professional Info
                        {/* <strong>></strong> */}
                    </div>
                    <div>
                        <span>3</span>
                        Linked Account
                        {/* <strong>></strong> */}
                    </div>
                    <div>
                        <span>4</span>
                        Account Security
                    </div>
                </div>
                <div className={styles.stepsNav_inner_two}>
                    complection Rate: 60%
                    <ProgressBar className={styles.stepsNav_inner_two_inner} variant="warning" now={60} />
                </div>
            </div>
        </>
    )
}

export default StepsNav
