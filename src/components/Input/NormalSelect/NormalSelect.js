import React from 'react'
import { Form, Spinner } from 'react-bootstrap'

function NormalSelect({lang, name, langHandleChange, prof_value}) {
    const proficiencyOption = lang.isLoading ? (
        <> 
            <Spinner animation="border" />
        </>
        ) : (
                <>
                    <option value={lang?.data?.proficiency?.basic}>{lang && lang.data && lang.data.proficiency && lang.data.proficiency.basic}</option>
                    <option value={lang?.data?.proficiency?.fluent}>{lang && lang.data && lang.data.proficiency && lang.data.proficiency.fluent}</option>
                    <option value={lang?.data?.proficiency?.conversational}>{lang && lang.data && lang.data.proficiency && lang.data.proficiency.conversational}</option>
                    <option value={lang?.data?.proficiency?.native}>{lang && lang.data && lang.data.proficiency && lang.data.proficiency.native}</option>
                </>
            )
    return (
        <>
            <Form.Control as="select" 
                name={name}  
                custom 
                onChange={langHandleChange}
                >
                {proficiencyOption}
            </Form.Control>
        </>
    )
}

export default NormalSelect
