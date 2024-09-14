import {createBrowserRouter} from "react-router-dom";
import {
    CampaignDetailsPage,
    CampaignsPage,
    CreateCampaignPage,
    DashboardPage,
    DetailError404Page,
    Error404Page,
    HomePage,
    HowItWorksPage,
    LoginPage,
    SignupPage,
} from "../pages";
import {Navigate} from "react-router-dom";
import LoansPage from "../pages/Loans";
import CreateLoanPage from "../pages/CreateLoan";
import LoanDetailsPage from "../pages/LoanDetailsPage";
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const username = localStorage.getItem('username');
    return username ? children : <Navigate to="/login" />;
};

import {DashboardLayout, PublicLayout} from "../layout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout compressedNav/>,
        errorElement: <Error404Page/>,
        children: [
            {
                path: '',
                index: true,
                element: <HomePage/>
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage/>,
        errorElement: <Error404Page/>,
    },
    {
        path: "signup",
        element: <SignupPage/>,
        errorElement: <Error404Page/>,
    },
    {
        path: "how-it-works",
        element: <PublicLayout/>,
        errorElement: <Error404Page/>,
        children: [
            {
                path: '',
                index: true,
                element: <HowItWorksPage/>
            }
        ]
    },
    {
        path: "campaigns",
        element: <PublicLayout/>,
        children: [
            {
                path: "",
                index: true,
                element: <CampaignsPage/>,
                errorElement: <Error404Page/>,
            },
            {
                path: ":id",
                element: (
                    <RequireAuth>
                    <CampaignDetailsPage/>
                </RequireAuth>
                ),
               errorElement: <DetailError404Page/>
            }
        ]
    },
    {
        path: "loans",
        element: <PublicLayout/>,
        children: [
            {
                path: "",
                index: true,
                element: <LoansPage/>,
                errorElement: <Error404Page/>,
            },
            {
                path: ":id",
                element: (
                    <RequireAuth>
                    <LoanDetailsPage/>
                </RequireAuth>
                ),
                errorElement: <DetailError404Page/>
            }
        ]
    },
    {
        path: "dashboard",
        element: <DashboardLayout/>,
        errorElement: <Error404Page/>,
        children: [
            {
                path: '',
                index: true,
                element: (
                    <RequireAuth>
                    <DashboardPage/>
                </RequireAuth>
                )
            }
        ]
    },
    {
        path: "create-campaign",
        element: <DashboardLayout/>,
        errorElement: <Error404Page/>,
        children: [
            {
                path: '',
                index: true,
                element: (
                    <RequireAuth>
                    <CreateCampaignPage />
                </RequireAuth>
                )
            }
        ]
    },{
        path: "create-loan",
        element: <DashboardLayout/>,
        errorElement: <Error404Page/>,
        children: [
            {
                path: '',
                index: true,
                element: (
                    <RequireAuth>
                    <CreateLoanPage />
                </RequireAuth>
                )

            }
        ]
    },
    
]);


export default router;
