import LoginPage from '../pages/login/loginShop';
import RegisterPage from '../pages/register/register';
import ForgotPasswordPage from '../pages/login/forgotPassword';
import ResetPasswordPage from '../pages/login/resetPassword';
import VerifyPage from '../pages/login/verify';
import HomePage from '../pages/home/home';
import MenPage from '../pages/product/men';
import WomenPage from '../pages/product/women';
import SalePage from '../pages/product/sale';
import NewArrivalPage from '../pages/product/newArrival';
import BestSellerPage from '../pages/product/bestSeller';
import SearchPage from '../pages/product/search';
import OtherPage from '../pages/other/other';
import ProductDetailsPage from '../pages/productDetails/productDetails';
import CartPage from '../pages/cart/cart';
import ProfilePage from '../pages/account/profile';
import PhonePage from '../pages/account/phone';
import EmailPage from '../pages/account/email';
import AddressPage from '../pages/account/address';
import ChangePasswordPage from '../pages/account/changePassword';
import OrderHistoryPage from '../pages/account/orderHistory';
import NotifyPage from '../pages/account/notify';
import {
  DefaultLayout,
  BackgroundLayout,
  HomeLayout,
  AccountLayout,
} from '~/Layout';

//Public routes
const publicRoutes = [
  { path: '/login', component: LoginPage, layout: BackgroundLayout },
  { path: '/register', component: RegisterPage, layout: BackgroundLayout },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    layout: BackgroundLayout,
  },
  {
    path: '/reset-password',
    component: ResetPasswordPage,
    layout: BackgroundLayout,
  },
  {
    path: '/verify',
    component: VerifyPage,
    layout: BackgroundLayout,
  },
  { path: '/', component: HomePage, layout: HomeLayout },
  { path: '/men/:id/:sort/:desc', component: MenPage, layout: DefaultLayout },
  {
    path: '/women/:id/:sort/:desc',
    component: WomenPage,
    layout: DefaultLayout,
  },
  {
    path: '/other/:id/:sort/:desc',
    component: OtherPage,
    layout: DefaultLayout,
  },
  { path: '/sale', component: SalePage, layout: DefaultLayout },
  { path: '/new-arrival', component: NewArrivalPage, layout: DefaultLayout },
  { path: '/best-seller', component: BestSellerPage, layout: DefaultLayout },
  { path: '/search', component: SearchPage, layout: DefaultLayout },
  {
    path: '/product-details/:id',
    component: ProductDetailsPage,
    layout: DefaultLayout,
  },
];

//Private routes
const privateRoutes = [
  { path: '/cart', component: CartPage, layout: DefaultLayout },
  { path: '/profile', component: ProfilePage, layout: AccountLayout },
  { path: '/phone', component: PhonePage, layout: AccountLayout },
  { path: '/email', component: EmailPage, layout: AccountLayout },
  {
    path: '/change-password',
    component: ChangePasswordPage,
    layout: AccountLayout,
  },
  {
    path: '/address',
    component: AddressPage,
    layout: AccountLayout,
  },
  {
    path: '/history-order',
    component: OrderHistoryPage,
    layout: AccountLayout,
  },
  {
    path: '/notify',
    component: NotifyPage,
    layout: AccountLayout,
  },
];

export { publicRoutes, privateRoutes };
