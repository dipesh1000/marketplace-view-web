import React from "react";
import styles from "./style.module.css";
import {Brush} from "react-bootstrap-icons";
import {Trash} from "react-bootstrap-icons";

function NewSkillTable({handleShow, handleDelete, handleEdit, form}) {
	return (
		<>
			<table>
				<thead>
					<tr className={styles.tableRow}>
						<th>Skill</th>
						<th>Level</th>
						<th className={styles.addNewBtn} onClick={handleShow}>
							Add New
						</th>
					</tr>
				</thead>
				<tbody>
					{form.values.skills.map((skill, index) => (
						<tr key={index}>
							<td>{skill.name}</td>
							<td>{skill.level}</td>
							<td className='text-right'>
								<div className={styles.actionIcon}>
									<Brush
										className={styles.actionBtn}
										onClick={() => handleEdit(index)}
									/>
									<Trash
										className={`ml-2 ${styles.actionBtn}`}
										onClick={() => handleDelete(index)}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default NewSkillTable;
