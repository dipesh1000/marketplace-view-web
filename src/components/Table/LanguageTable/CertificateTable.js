import React from 'react'
import styles from './style.module.css'
import { Brush } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

function CertificateTable({handleShow, handleDelete, handleEdit, form}) {
    
    return (
        <>
            <table>
                <thead>
                    <tr className={styles.tableRow}>
                        <th>Certificate or Award</th>
                        <th>Year</th>
                        <th className={styles.addNewBtn} onClick={handleShow}>Add New</th>
                    </tr>
                </thead>
                <tbody>
                {
                    form.values.certifications.map((certificate, index) => (
                        <tr key={index}>
                            <td>{certificate.award}</td>
                            <td>{certificate.year }</td>
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

export default CertificateTable
