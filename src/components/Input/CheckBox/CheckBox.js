import React from 'react'
import styles from './CheckBox.module.css'

function CheckBox() {
    return (
        <>
            <div>
                <input type="checkbox" name="test" value="test" className="mr-2" />
                <label htmlFor="test" className={styles.boxLevel}>Test</label>
            </div>
        </>
    )
}

export default CheckBox
