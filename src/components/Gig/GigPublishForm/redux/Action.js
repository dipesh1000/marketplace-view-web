import { publishGigApi } from '../../../../api/Gig/GigPublishApi';


export const publishGig = (data,id, handleHistory) => (dispatch) => {
  publishGigApi(data,id).then((res) => {
    handleHistory();
  });
};


