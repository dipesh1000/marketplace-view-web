import React from 'react';
import styles from "./DashTabContent.module.css";

import TabItem from "./TabItem";


const DashTabContent = ({ items }) => {
    return (
        <div className={styles.my_tabContent}>
            {
                items.map((item, index) => (
                   <TabItem key={index} icon={item.icon} text={item.text} />
                ))
            }
        </div>
    )
}

export default DashTabContent