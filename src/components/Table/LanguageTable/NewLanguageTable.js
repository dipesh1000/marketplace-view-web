import React from "react";
import styles from "./style.module.css";
import {Brush} from "react-bootstrap-icons";
import {Trash} from "react-bootstrap-icons";

function NewLanguageTable({handleShow, handleDelete, handleEdit, form}) {
	return (
		<>
			<table>
				<thead>
					<tr className={styles.tableRow}>
						<th>Language</th>
						<th>Proficiency</th>
						<th className={styles.addNewBtn} onClick={handleShow}>
							Add New
						</th>
					</tr>
				</thead>
				<tbody>
					{form.values?.language?.map((language, index) => (
						<tr key={index}>
							<td>{language.value}</td>
							<td>{language.proficiency}</td>
							<td className='text-right'>
								<div className={styles.actionIcon}>
									<Brush onClick={() => handleEdit(index)} />
									<Trash className='ml-2' onClick={() => handleDelete(index)} />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default NewLanguageTable;
