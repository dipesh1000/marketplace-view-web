import BuyerIndex from "../pages/Dashboard/BuyerDashboard/Index.js";
import SellerForm from "../pages/Dashboard/SellerForm/SellerForm";
import AccountSecurityPage from "../pages/Dashboard/SellerForm/StepsFrom/accountSecurity.js";
import linkedAccount from "../pages/Dashboard/SellerForm/StepsFrom/linkedAccount.js";
import SellerIndex from "../pages/Dashboard/SellerDashboard/index.js";
import GigContainer from "../pages/Dashboard/SellerDashboard/createGig/GigContainer.js";
import GigsGallery from "../pages/Dashboard/SellerDashboard/createGig/GigGallery.js";
import GigsOverview from "../pages/Dashboard/SellerDashboard/createGig/GigsOverview.js";
import GigsOverviewEdit from "../pages/Dashboard/SellerDashboard/createGig/GigsOverviewEdit.js";
import GigsPricing from "../pages/Dashboard/SellerDashboard/createGig/GigsPricing.js";
import GigsRequirement from "../pages/Dashboard/SellerDashboard/createGig/GigsRequirement.js";
import GigsFaq from "../pages/Dashboard/SellerDashboard/createGig/GigsFaq.js";
import SellerDashboard from "../pages/Dashboard/SellerDashboard/Dashboard.js";
import Gigs from "../pages/Dashboard/SellerDashboard/Gigs.js";
import PersonalInfoPage from "../pages/Dashboard/SellerForm/StepsFrom/PersonalInfoPage.js";
import ProfessionalInfoPage from "../pages/Dashboard/SellerForm/StepsFrom/ProfessionalInfoPage.js";
import About from "../pages/Home/About/About";
import CategoryPage from "../pages/Home/CategoryPage/CategoryPage";
import ForgotPasswordPage from "../pages/Home/ForgotPassword/ForgotPasswordPage";
import TokenPage from "../pages/Home/ForgotPassword/TokenPage";
import Homepage from "../pages/Home/Homepage/Homepage";
import VerifyAccount from "../pages/Home/VerifyAccount/VerifyAccount";
import GigsPublish from "../pages/Dashboard/SellerDashboard/createGig/GigPublish.js";
import GigsPublishDone from "../pages/Dashboard/SellerDashboard/createGig/GigPublishDone.js";
import UserHome from "../pages/Home/Homepage/UserHome/UserHome.js";
import GigList from "../pages/Home/GigList/GigList.js";
import SingleGig from "../pages/Home/Gigs/SingleGig.js";
import OrderPage from "../pages/Home/Order/OrderPage.js";
import Profile from "../pages/Home/Profile/Profile.js";
import ConfirmPay from "../components/Order/ConfirmPay/ConfirmPay.js";
import SubmitRequirements from "../components/Order/SubmitRequirements/SubmitRequirements.js";
import Orders from "../pages/Dashboard/SellerDashboard/Orders.js";
import SingleOrder from "../components/OrderList/SingleOrder/SingleOrder.js";
import SingleOrderBuyer from "../components/OrderList/SingleOrderBuyer/SingleOrderBuyer.js";
import BuyerDashboard from "../pages/Dashboard/BuyerDashboard/Dashboard.js";
import ResolutionSelect from "../components/SellerResolution/ResolutionSelect/ResolutionSelect.js";
import ResolutionExtend from "../components/SellerResolution/Extend/ResolutionExtend.js";
import ResolutionCancel from "../components/SellerResolution/Cancel/ResolutionCancel.js";
import ResolutionModify from "../components/SellerResolution/Modify/ResolutionModify.js";
import BuyerOrders from "../pages/Dashboard/BuyerDashboard/BuyerOrders.js";
import BuyerResolutionSelect from "../components/BuyerResolution/ResolutionSelect/ResolutionSelect.js";
import BuyerResolutionCancel from "../components/BuyerResolution/Cancel/ResolutionCancel.js";
import BuyerResolutionProgress from "../components/BuyerResolution/Progress/ResolutionProgress.js";
import Inbox from "../pages/Dashboard/Inbox/Inbox.js";
import CustomRequest from "../pages/Home/CustomRequest/CustomRequest.js";
import ManageRequestPage from "../pages/Home/ManageRequest/ManageRequestPage.js";
import BuyerRequestPage from "../pages/Dashboard/SellerDashboard/BuyerRequestPage.js";
import ManageContactPage from "../pages/Dashboard/SellerDashboard/ManageContactPage.js";
import ResolutionConfirmPay from "../components/OrderList/SingleOrderBuyer/ConfirmPay/ResolutionConfirmPay.js";
import ListPage from "../pages/Home/List/List.js";
import EarningsPage from "../pages/Dashboard/SellerDashboard/Earnings.js";
import ReviewPage from "../pages/Home/ReviewPage/ReviewPage.js";
import ViewOfferPage from "../pages/Home/ManageRequest/ViewOfferPage.js";
import Account from "../pages/Home/Settings/AccountPage.js";
import Billing from "../pages/Home/Settings/BillingPage.js";
import SecurityPage from "../pages/Home/Settings/SecurityPage.js";
import BalancePage from "../pages/Home/Settings/BalancePage.js";
import HelpPage from "../pages/Home/HelpSupport/HelpPage.js";
import SupportPage from "../pages/Home/Support/SupportPage.js";
import SupportCategoryPage from "../pages/Home/Support/SupportCategoryPage.js";
import SupportFaqPage from "../pages/Home/Support/SupportFaqPage.js";
import SearchPage from "../pages/Home/Search/SearchPage.js";
import TagsPage from "../pages/Home/Tags/TagsPage.js";
import TermsServicePage from "../pages/Home/CmsPages/TermsServicePage.js";
import IntellectualProclaimPage from "../pages/Home/CmsPages/IntellectualProclaimPage.js";
import PrivacyPolicyPage from "../pages/Home/CmsPages/PrivacyPolicyPage.js";

const routes = {
  // routes which are visible to both authenticated and unauthenticated users

  // routes which are visible to both authenticated and unauthenticated users
  public: [
    {
      path: "/:user",
      component: Profile,
      exact: true,
    },
    {
      path: "/categories/:category/:slug",
      component: GigList,
    },
    {
      path: "/categories/:category",
      component: CategoryPage,
    },
    {
      path: "/search/:searchTerm",
      component: SearchPage,
      exact: true,
    },
    {
      path: "/gigs/:tag",
      component: TagsPage,
      exact: true,
    },
    {
      path: "/:username/:slug",
      component: SingleGig,
      exact: true,
    },
    {
      path: "/checkout/customize/:slug",
      component: OrderPage,
    },
    {
      path: "/forgotpassword/:email/:token",
      component: ForgotPasswordPage,
      exact: true,
    },
  ],
  // routes which are visible to unauthenticated users only
  home: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      component: Homepage,
      exact: true,
    },
    {
      path: "/about",
      component: About,
      exact: true,
    },
    {
      path: "/tokenpage",
      component: TokenPage,
    },
    {
      path: "/verify/:email/:token",
      component: VerifyAccount,
    },

    // {
    //   path: "/blog",
    //   component: Blog,
    //   routes: [
    //     {
    //       path: "/blog/new",
    //       component: New,
    //     },
    //     {
    //       path: "/blog/old",
    //       component: Old,
    //     },
    //   ],
    // },
  ],

  // routes which are visible to authenticated users only

  dashboard: [
    {
      path: "/",
      component: UserHome,
      exact: true,
    },
    {
      path: "/lists/mylist",
      component: ListPage,
      exact: true,
    },
    {
      path: "/users/manage_requests/new",
      component: CustomRequest,
      exact: true,
    },
    {
      path: "/users/manage_requests/:requestId",
      component: ViewOfferPage,
    },
    {
      path: "/inbox",
      component: Inbox,
    },
    {
      path: "/?force_buying_nav",
      component: UserHome,
      exact: true,
    },
    {
      path: "/checkout/payments/:orderId",
      component: ConfirmPay,
      exact: true,
    },
    {
      path: "/users/edit/account",
      component: Account,
      exact: true,
    },
    {
      path: "/users/edit/security",
      component: SecurityPage,
      exact: true,
    },
    {
      path: "/users/edit/billing",
      component: Billing,
      exact: true,
    },
    {
      path: "/users/edit/balance",
      component: BalancePage,
      exact: true,
    },
    {
      path: "/support_tickets/new",
      component: HelpPage,
      exact: true,
    },
    {
      path: "/support",
      component: SupportPage,
      exact: true,
    },
    {
      path: "/support/:category_slug",
      component: SupportCategoryPage,
      exact: true,
    },
    {
      path: "/support/:category_slug/:faq_slug",
      component: SupportFaqPage,
      exact: true,
    },
    {
      path: "/users/manage_requests",
      component: ManageRequestPage,
      exact: true,
    },

    {
      path: "/checkout/submitrequirements",
      component: SubmitRequirements,
      exact: true,
    },
    {
      path: "/privacy-policy",
      component: PrivacyPolicyPage,
      exact: true,
    },
    {
      path: "/terms&services",
      component: TermsServicePage,
      exact: true,
    },
    {
      path: "/intellectual-proclaim",
      component: IntellectualProclaimPage,
      exact: true,
    },
    {
      path: "/seller_onboarding",
      component: SellerForm,
      routes: [
        {
          path: "/seller_onboarding/personal_info",
          component: PersonalInfoPage,
        },
        {
          path: "/seller_onboarding/professional_info",
          component: ProfessionalInfoPage,
        },
        {
          path: "/seller_onboarding/linked_accounts",
          component: linkedAccount,
        },
        {
          path: "/seller_onboarding/account_security",
          component: AccountSecurityPage,
        },
      ],
    },
    {
      path: "/users/dashboard/review/:orderId",
      component: ReviewPage,
    },
    {
      path: "/users/dashboard",
      component: BuyerIndex,
      role: "buyer",
      routes: [
        {
          path: "/users/dashboard/",
          component: BuyerDashboard,
          exact: true,
        },
        {
          path: "/users/dashboard/orders",
          component: BuyerOrders,
          exact: true,
        },
        {
          path: "/users/dashboard/payment/:orderId",
          component: ResolutionConfirmPay,
        },
        {
          path: "/users/dashboard/singleorders/:orderId",
          component: SingleOrderBuyer,
          exact: true,
        },
        {
          path: "/users/dashboard/resolution/select/:orderId",
          component: BuyerResolutionSelect,
        },
        {
          path: "/users/dashboard/resolution/cancel/:orderId",
          component: BuyerResolutionCancel,
        },
        {
          path: "/users/dashboard/resolution/progress/:orderId",
          component: BuyerResolutionProgress,
        },
      ],
    },

    {
      path: "/users/seller_dashboard",
      component: SellerIndex,
      role: "seller",
      routes: [
        {
          path: "/users/seller_dashboard/",
          component: SellerDashboard,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/orders",
          component: Orders,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/buyer_requests",
          component: BuyerRequestPage,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/manage_contact",
          component: ManageContactPage,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/earnings",
          component: EarningsPage,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/singleorders/:orderId",
          component: SingleOrder,
          exact: true,
        },
        {
          path: "/users/seller_dashboard/resolution/select/:orderId",
          component: ResolutionSelect,
        },
        {
          path: "/users/seller_dashboard/resolution/extend/:orderId",
          component: ResolutionExtend,
        },
        {
          path: "/users/seller_dashboard/resolution/cancel/:orderId",
          component: ResolutionCancel,
        },
        {
          path: "/users/seller_dashboard/resolution/modify/:orderId",
          component: ResolutionModify,
        },
        {
          path: "/users/seller_dashboard/gigs",
          component: Gigs,
        },
        {
          path: "/users/seller_dashboard/manage_gigs",
          component: GigContainer,
          routes: [
            {
              path: "/users/seller_dashboard/manage_gigs/create_gigs/",
              component: GigsOverview,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/edit_gigs",
              component: GigsOverviewEdit,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_pricing",
              component: GigsPricing,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_requirement",
              component: GigsRequirement,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_description_faq",
              component: GigsFaq,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_gallery",
              component: GigsGallery,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_publish",
              component: GigsPublish,
            },
            {
              path: "/users/seller_dashboard/manage_gigs/:slug/gigs_complete",
              component: GigsPublishDone,
            },
          ],
        },
      ],
    },
  ],
};

// eslint-disable-next-line
export default {
  ...routes,
  home: [...routes.home, ...routes.public],
  dashboard: [...routes.dashboard, ...routes.public],
};
