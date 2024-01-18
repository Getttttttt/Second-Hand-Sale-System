import Home from "../pages/Home";
import {Navigate} from 'react-router-dom'
import CustomerCenter from "../pages/CustomerPages/CustomerCenter"
import RegisterForCustomer from "../pages/CustomerPages/SignAndRegisterForCustomer/RegisterForCustomer";
import SignInForCustomer from "../pages/CustomerPages/SignAndRegisterForCustomer/SignInForCustomer";
import BookBacket from "../pages/CustomerPages/BookBacket/BookBacket";
import CustomerChatToMerchantList from "../pages/CustomerPages/ChatPages/CustomerChatToMerchantList";
import ChatToSingleMerchant from "../pages/CustomerPages/ChatPages/ChatToSingleMerchant";
import PurchasedBookStatusPage from "../pages/CustomerPages/PurchasedBookList/PurchasedBookStatusPage";
import SinglePurchasedBookStatusPage from "../pages/CustomerPages/PurchasedBookList/SinglePurchasedBookStatusPage";
import SearchOutcomeDisplay from "../pages/BookPages/SearchOutcomeDisplay"
import SingleBookDispley from "../pages/BookPages/SingleBookDispley"
import MerchantCenter from "../pages/MerchantPages/MerchantCerter";
import RegisterForMerchant from "../pages/MerchantPages/SignAndRegisterForMerchant/RegisterForMerchant";
import SignInForMerchant from "../pages/MerchantPages/SignAndRegisterForMerchant/SignInForMerchant";
import MerchantChatToCustomer from "../pages/MerchantPages/ChatPages/MerchantChatToCustomer";
import ChatToSingleCustomer from "../pages/MerchantPages/ChatPages/ChatToSingleCustomer";
import SaledBookStatusPage from "../pages/MerchantPages/SaledBookList/SaledBookStatusPage";
import SingleSaledBookStatusPage from "../pages/MerchantPages/SaledBookList/SingleSaledBookStatusPage";
import SaleBookFormPage from "../pages/MerchantPages/AddSaleBook/SaleBookFormPage";
import SinglePurchasedBookEvaluation from "../pages/CustomerPages/PurchasedBookList/SinglePurchasedBookEvaluation"
import { CustomerListStore } from "../pages/CustomerPages/PurchasedBookList/CustomerListStore";


export default [
    {
        path:'test',
        element:<CustomerListStore />
    },
    {
        path: '/',
        element: <Navigate to='/home' />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/customer',
        element: <CustomerCenter />
    },
    {
        path: '/customer/validate/register',
        element: <RegisterForCustomer />
    },
    {
        path: '/customer/validate/signin',
        element: <SignInForCustomer />
    },
    {
        path: '/customer/bookbacket',
        element: <BookBacket />
    },
    {
        path: '/customer/chat/:customerId',
        element: <CustomerChatToMerchantList />
    },
    {
        path: '/customer/chat/merchant/:mc',
        element: <ChatToSingleMerchant />
    },
    {
        path: '/customer/purchased',
        element: <PurchasedBookStatusPage />
    },
    {
        path: '/customer/purchased/:orderID',
        element: <SinglePurchasedBookStatusPage />
    },
    {
        path: '/customer/purchased/evaluation/:orderID',
        element: <SinglePurchasedBookEvaluation />
    },
    {
        path: '/books',
        element: <SearchOutcomeDisplay />
    },
    {
        path: '/books/singlebook',
        element: <SingleBookDispley />
    },
    {
        path: '/merchant',
        element: <MerchantCenter />
    },
    {
        path: '/merchant/validate/register',
        element: <RegisterForMerchant />
    },
    {
        path: '/merchant/validate/signin',
        element: <SignInForMerchant />
    },
    {
        path: '/merchant/chat/:merchantId',
        element: <MerchantChatToCustomer />
    },
    {
        path: '/merchant/chat/customer/:cm',
        element: <ChatToSingleCustomer />
    },
    {
        path: '/merchant/saled',
        element: <SaledBookStatusPage />
    },
    {
        path: '/merchant/saled/book',
        element: <SingleSaledBookStatusPage />
    },
    {
        path: '/merchant/addsalebook',
        element: <SaleBookFormPage />
    },
    {
        path: '*',
        element: <Navigate to='/home' />
    },
]