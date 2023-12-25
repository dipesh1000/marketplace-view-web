import { updateGigRequirementApi } from '../../../../api/Gig/GigRequirementApi';


export const updateGigRequirement = (data,id, handleHistory) => (dispatch) => {
  updateGigRequirementApi(data,id).then((res) => {
    handleHistory();
  });
};


