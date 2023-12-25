import { fetchSiteSettingApi } from '../../api/SiteSetting/SiteSettingApi'
import * as actions from './Type'

export const fetchSiteSetting =() =>(dispatch)=> {
    dispatch({
        type: actions.FETCH_SITESETTING_BEGIN
    })
    fetchSiteSettingApi().then((res)=>{
        dispatch({
            type: actions.FETCH_SITESETTING_SUCCESS,
            payload: res.data
        })
    }).catch((err)=>
    dispatch({
        type: actions.FETCH_SITESETTING_ERROR
    }))
}