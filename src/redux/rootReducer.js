import { combineReducers } from "redux";
import { errorReducer } from "./Error/Error.reducer";
import { authReducer } from "./Auth/Auth.reducer";
import { successReducer } from "./Success/Success.reducer";
import { modalReducer } from "./Modal/Modal.reducer";
import { categoryReducer } from "./Category/Category.reducer";
import { languageReducer } from "./language/Language.reducer";
import { ProfileReducer } from "./Profile/Profile.reducer";
import { gigOverviewReducer } from "../components/Gig/GigOverviewForm/redux/Reducer";
import { CountryReducer } from "./Country/Country.reducer";
import { professionalReducer } from "./Professional/Professional.reducer";
import { gigReducer } from "../components/Gig/GigPage/redux/Reducer";
import { gigPricingReducer } from "../components/Gig/GigPricingForm/redux/Reducer";
import { spinnerReducer } from "../components/common/Spinner/redux/Reducer";
import { gigListReducer } from "../components/GigList/redux/Reducer";
import { singlGigDetail } from "../components/GigSingle/redux/Reducer";
import { tempGigList } from "../components/userHome/redux/Reducer";
import { siteSettingReducer } from "./Setting/Reducer";
import { checkoutReducer } from "../components/Order/redux/reducer";
import { orderReducer } from "../components/OrderList/redux/Reducer";
import { resolutionReducer } from "../components/SellerResolution/redux/Reducer";
import { gigGalleryReducer } from "../components/Gig/GigGalleryForm/redux/Reducer";
import { notificationReducer } from "../components/NavNotification/redux/Reducer";
import { chatReducer } from "../components/chat/redux/Reducer";
import { buyerResolutionReducer } from "../components/BuyerResolution/redux/Reducer";
import { chatOfferReducer } from "../components/chat/createOffer/redux/Reducer";
import { buyerRequestReducer } from "../components/BuyerRequest/redux/Reducer";
import { manageRequestReducer } from "../components/ManageRequest/redux/Reducer";
import { EditProfileReducer } from "../components/LoggedInProfile/EditProfile/redux/Reducer";
import { helpReducer } from "../components/HelpSupport/redux/Reducer";
import { wishListReducer } from "../components/List/redux/Reducer";
import { freelancerReducer } from "../components/Profile/Freelancer/redux/Reducer";
import { searchReducer } from "../components/Search/redux/Reducer";
import { sellerDashboardReducer } from "../components/sellerDashboard/redux/Reducer";
import { tagsReducer } from "../components/Tags/redux/Reducer";
import { faqReducer } from "../components/Support/redux/Reducer";
import { usernameReducer } from "../components/Settings/redux/Reducer";
import { onlineReducer } from "./Online/Reducer";

export const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  success: successReducer,
  modal: modalReducer,
  category: categoryReducer,
  lang: languageReducer,
  profile: ProfileReducer,
  gigOverview: gigOverviewReducer,
  countryList: CountryReducer,
  professionalInfo: professionalReducer,
  gig: gigReducer,
  spinner: spinnerReducer,
  gigPricing: gigPricingReducer,
  gigList: gigListReducer,
  gigDetails: singlGigDetail,
  gigGallery: gigGalleryReducer,
  tempGigList: tempGigList,
  siteSetting: siteSettingReducer,
  checkout: checkoutReducer,
  sellerOrders: orderReducer,
  resolution: resolutionReducer,
  buyerResolution: buyerResolutionReducer,
  notifications: notificationReducer,
  chats: chatReducer,
  chatOffer: chatOfferReducer,
  buyerRequest: buyerRequestReducer,
  manageRequest: manageRequestReducer,
  editProfile: EditProfileReducer,
  help: helpReducer,
  wishList: wishListReducer,
  freelancer: freelancerReducer,
  search: searchReducer,
  sellerDashboard: sellerDashboardReducer,
  tags: tagsReducer,
  faq: faqReducer,
  username: usernameReducer,
  online: onlineReducer
});
