
import React from 'react'
import styles from './Error.module.css'

function ErrorField(props) {
    return (
        <div className={styles.inputError}>
            {props.children}
        </div>
    )
}

export default ErrorField