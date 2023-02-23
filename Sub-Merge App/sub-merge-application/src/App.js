import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserDataContext } from "./context/userDataContext";
import { SnackbarProvider } from "notistack";
import axios from "axios";

// Components
import RequireAuth from "./components/RequireAuth/RequireAuth";
import SidebarContentContainer from "./components/SidebarContentContainer/SidebarContentContainer";
import NavBarUniversal from "./components/NavBarUniversal/NavBarUniversal";

// Pages
import Home from "./pages/Index/Home/Home";
import LogorSignContainer from "./pages/User/LogorSignContainer/LogorSignContainer";
import AccountSettings from "./pages/User/AccountSettings/AccountSettings";
import AccountDeletion from "./pages/User/AccountDeletion/AccountDeletion";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import PaymentManagement from "./pages/User/Payment/PaymentManagement/PaymentManagement";
import SubscriptionDashboard from "./pages/Subscription/SubscriptionDashboard/SubscriptionDashboard";
import StaticEntertainment from "./pages/Entertainment/EntertainmentStaticPage/StaticEntertainment";
import Dashboard from "./pages/Index/Dashboard/Dashboard";

// Subscription
import SubscriptionList from "./pages/Subscription/SubscriptionList/SubscriptionList";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage/SubscriptionPage";
import SubscriptionReport from "./pages/Subscription/SubscriptionReport/SubscriptionReport";
import EntertainmentPage from "./pages/Entertainment/EntertainmentPage/EntertainmentPage";
import TabMoviesList from "./pages/Entertainment/EntertainmentPage/TabMoviesList";

// Entertainment
import EntertainmentDetails from "./pages/Entertainment/EntertainmentDetails/EntertainmentDetails";
import CommunicationStaticPage from "./pages/Communication/CommunicationStatic/CommunicationStaticPage";
import CommunicationPage from "./pages/Communication/CommunicationPage/CommunicationPage";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loggedIn] = useState(localStorage.getItem("token") !== null);
  const value = { userData, setUserData };

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/user/profile/" +
            localStorage.getItem("id"),
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (userData === null) setUserData(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData, loggedIn]);

  return (
    <div>
      <UserDataContext.Provider value={value}>
        <SnackbarProvider maxSnack={5}>
          <NavBarUniversal />
          <Routes>
            <Route path="/" element={<Home />} />
            {loggedIn ? null : (
              <>
                <Route exact path="login" element={<LogorSignContainer />} />
              </>
            )}
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <AccountSettings />
                </RequireAuth>
              }
            >
              <Route
                exact
                path="userprofile"
                element={
                  <SidebarContentContainer
                    header="User Profile"
                    component={<UserProfile />}
                  />
                }
              />
              <Route
                exact
                path="deleteaccount"
                element={
                  <SidebarContentContainer
                    header="Delete Account"
                    component={<AccountDeletion />}
                  />
                }
              />
              <Route
                exact
                path="payment"
                element={
                  <SidebarContentContainer
                    header="Payment Management"
                    component={<PaymentManagement />}
                  />
                }
              />

              <Route path="*" element={<div>Not Found</div>} />
            </Route>{" "}
            {/* Above include all the routes in the profile page */}
            <Route
              path="/subscription"
              element={
                <RequireAuth>
                  <SubscriptionDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/subscription/all"
              element={
                <RequireAuth>
                  <SubscriptionList />
                </RequireAuth>
              }
            />
            <Route
              path="/subscription/report"
              element={
                <RequireAuth>
                  <SubscriptionReport />
                </RequireAuth>
              }
            />
            <Route
              path="/entertainment"
              element={
                <RequireAuth>
                  <EntertainmentPage />
                </RequireAuth>
              }
            />
            <Route
              path="/myList"
              element={
                <RequireAuth>
                  <TabMoviesList />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/entertainment/details/:id"
              element={
                <RequireAuth>
                  <EntertainmentDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/communication"
              element={
                <RequireAuth>
                  <CommunicationPage />
                </RequireAuth>
              }
            />
            {/* Below go the unsecure routes that are static pages */}
            <Route
              path="/entertainment/page"
              element={<StaticEntertainment />}
            />
            <Route path="/subscription/page" element={<SubscriptionPage />} />
            <Route
              path="/communication/page"
              element={<CommunicationStaticPage />}
            />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </SnackbarProvider>
      </UserDataContext.Provider>
    </div>
  );
}
