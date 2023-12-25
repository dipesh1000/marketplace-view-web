// import { FieldArray } from 'formik';
// import React, { useEffect, useState } from 'react'
// import SkillTable from '../../../Table/LanguageTable/LanguageTable';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import { Col, Row } from 'react-bootstrap';
// import styles from '../styles.module.css'

// function SkillsRepeater({
//     CustomSellerInput,
//     CustomSellerSelect,
//     skillLevels,
//     handleLevelSet,
//     setData,
//     setFieldClose,
//     fieldClose
// }) {
//     return (
//         <>
//             <FieldArray name="skills">
//             {({form, push, remove, insert}) => { 
//                 const openForm = (e) => {
//                     setFieldClose(false);
//                     push({name: '', value: ''})
//                 }        
//                 const handleAddStateData = (e) => {
//                     e.preventDefault();
//                     setFieldClose(true);
//                 }
//                 const newIndex = form.values.skills.length;
//                 return(
//                 <React.Fragment>
//                     { fieldClose ? '' : (
//                         <>
//                         {
//                             form.values.skills.map((_, index) => {
                               
//                                     return (
//                                         <div className={styles.selectorWrapper}>  
//                                          <Row>
//                                             <Col md={5}>
//                                                 <CustomSellerInput name={`skills[${index}].name`} placeholder="skill" />
//                                             </Col>
//                                             <Col md={4} className="pl-0 pr-2">
//                                                 <CustomSellerSelect 
//                                                     name={`skills[${index}].level`} 
//                                                     className={styles.select} 
//                                                     options={skillLevels} 
//                                                     setId={handleLevelSet}  
//                                                     setData={setData} />
//                                                 <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} />
//                                             </Col>
//                                             <Col md={3} className="d-flex justify-content-between">
//                                                 <button className={styles.RepeaterBtnCancel} onClick={() => setFieldClose(true)}>
//                                                     Cancel
//                                                 </button>
//                                                 <button type="button" onClick={handleAddStateData} className={styles.RepeaterBtnAdd}>
//                                                     Add
//                                                 </button>
//                                             </Col>
//                                         </Row>
//                                     </div> 
                                        
//                                         )
                               
//                             })
                            
//                         }
                               
//                         </>
//                     )}
//                 <SkillTable headFirst="Skill" headSecond="Level" formData={form?.values?.skills} openForm={openForm} />
//                 </React.Fragment>
//             )}}
//         </FieldArray>
//         </>
//     )
// }

// export default SkillsRepeater
