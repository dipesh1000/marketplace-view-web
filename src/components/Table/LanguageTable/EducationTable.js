import React from 'react'
import styles from './style.module.css'
import { Brush } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

function EducationTable({handleShow, handleDelete, handleEdit, form}) {
    
    return (
        <>
            <table>
                <thead>
                    <tr className={styles.tableRow}>
                        <th>Degree</th>
                        <th>Years</th>
                        <th className={styles.addNewBtn} onClick={handleShow}>Add New</th>
                    </tr>
                </thead>
                <tbody>
                {
                    form.values.education.map((education, index) => (
                        <tr key={index}>
                            <td>{education.major}</td>
                            <td>Graduated at {education.year }</td>
                            <td className="text-right">
                                <div className={styles.actionIcon}>
                                    <Brush  onClick={() => handleEdit(index)}/>
                                    <Trash  className="ml-2" onClick={()=> handleDelete(index)} />
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>

            </table>  
        </>
    )
}

export default EducationTable
