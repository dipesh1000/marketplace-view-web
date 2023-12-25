import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead';

function CustomTypeHead({
    options,
    placeholder,
    setSingleSelections,
    singleSelections
}) {
    return (
        <>
            <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setSingleSelections}
                options={options}
                placeholder={placeholder ? placeholder : "Type your Text"} 
                selected={singleSelections}
            />
        </>
    )
}

export default CustomTypeHead
