import React from 'react';
import styles from './TabItem.module.css';

const TabItem = ({ icon, text }) => {
    return (
        <>
            <div className={styles.tabContents__items}>
                <div className={styles.tabIcon}>
                    {icon}
                </div>
                <p>
                    <a href="#!">{text}</a>
                </p>
                <div className={styles.hiddenAction}>
                    <button>Update Now</button>
                </div>
            </div>
        </>
    )
}

export default TabItem
