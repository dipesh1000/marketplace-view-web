import React from 'react'
import { FaCheck } from 'react-icons/fa';
// import { MenuPortal } from 'react-select/src/components/Menu';

function Services({gigPackageMeta, gigPackageTitle}) {
    return (
        <div className="orderServices">
            <h6>{gigPackageTitle?.title}</h6>
            <p>{gigPackageTitle?.description}</p>
            <div className="serivce-summary">
                <div className="service-list compact">
                        {gigPackageTitle?.revision  ?  (
                            <div className="service-item">
                                        <>
                                        <FaCheck />{" "}{gigPackageTitle.revision} Revisions
                                        </>
                            </div>
                            ) : null
                        }
                    { 
                        gigPackageMeta?.filter((item) => item.value !==  "" && item.value !== "off" ).map((meta) => (
                        <>
                            <div className="service-item">                               
                                {meta.type === "Checkbox" ?
                                    <FaCheck /> 
                                    :  (<><FaCheck />{" "}
                                    {meta.value}
                                    </>)
                                }
                                {" "}{meta.title}
                            </div>
                        </>
                        )) 
                     }
                </div>
            </div>
        </div>
    )
}

export default Services
