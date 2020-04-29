import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../components/not-found/NotFound';
import Map from '../components/map';
import NoNearByBukkaLocation from '../components/not-found/NoNearByBukkaLocation';

const Home = lazy(() => import('../views/home'));
// const Bukka = lazy(() => import('../views/bukka'));
const Register = lazy(() => import('../views/authentication/RegisterPage'));
const Login = lazy(() => import('../views/authentication/LoginPage'));
// const FeedPage = lazy(() => import('../views/feed'));
// const Checkout = lazy(() => import('../views/checkout/index'));
// const Profile = lazy(() => import('../views/profile'));
// const TransactionHistory = lazy(() => import('../views/history'));
// const ResetPassword = lazy(() => import('../views/forgotPassword/ResetPassword'));
// const PerformResetPass = lazy(() => import('../views/forgotPassword/PerformResetPass'));
const SupportBuyer = lazy(() => import('../views/support/components/SupportBuyer'));
const Articles = lazy(() => import('../views/support/articles'));
const CategoryLists = lazy(() => import('../views/support/Lists'));
const Merchant = lazy(() => import('../views/merchant'));
const ComplainCategory = lazy(() => import('../views/feedback/Category'));
const SubCategory = lazy(() => import('../views/feedback/SubCategory'));
const ComplainScene = lazy(() => import('../views/feedback/ComplainScene'));
const Privacy = lazy(() => import('../views/statement/Privacy'));
const Terms = lazy(() => import('../views/statement/Terms'));
// const Promotion = lazy(() => import('../views/promotion'));

// const Mart = ({ ...props }) => <FeedPage {...props} mart />;
// const Foods = ({ ...props }) => <FeedPage {...props} food />;
// const Fresh = ({ ...props }) => <FeedPage {...props} fresh />;
// const Search = ({ ...props }) => <FeedPage {...props} search />;
// const Category = ({ ...props }) => <FeedPage {...props} category />;
// const Favorites = ({ ...props }) => <FeedPage {...props} favorites />;

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/bukka/:slug" component={Bukka} /> */}
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/feed" food component={Foods} />
      <Route exact path="/mart" component={Mart} />
      <Route exact path="/fresh" component={Fresh} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/place-groups/d/:id" component={Promotion} /> */}
      {/* <Route exact path="/categories/:id" component={Category} /> */}
      {/* <Route exact path="/merchant/:slug/checkout" component={Checkout} /> */}
      {/* <Route exact path="/profile" component={Profile} /> */}
      {/* <Route exact path="/history" component={TransactionHistory} /> */}
      {/* <Route exact path="/reset-password" component={ResetPassword} /> */}
      {/* <Route exact path="/reset" component={PerformResetPass} /> */}
      <Route exact path="/support/buyer" component={SupportBuyer} />
      <Route exact path="/buyer/articles/:id" component={Articles} />
      <Route exact path="/buyer/lists/:id" component={CategoryLists} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/merchant" component={Merchant} />
      <Route exact path="/buyer/contact-us/help" component={ComplainCategory} />
      <Route exact path="/legal/privacy" component={Privacy} />
      <Route exact path="/legal/terms" component={Terms} />
      <Route exact path="/coming-soon" component={NoNearByBukkaLocation} />
      <Route
        exact
        path="/support/buyer/contact-us/:id"
        component={SubCategory}
      />
      <Route exact path="/buyer/contact-us/:id" component={ComplainScene} />
      <Route
        exact
        path="/store/apple"
        component={() => {
          window.location.href = 'https://www.apple.com/';
          return null;
        }}
      />
      <Route
        exact
        path="/store/android"
        component={() => {
          window.location.href = 'https://play.google.com/store?hl=en';

          return null;
        }}
      />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
