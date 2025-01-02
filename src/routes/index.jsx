import ClientType from "@/pages/ClientType";
import Compliance from "@/pages/Compliance";
import ComplianceChecklist from "@/pages/ComplianceChecklist";
// import Contacts from "@/pages/Contacts";
import Country from "@/pages/Country";
import CreateChecklist from "@/pages/createDocument";
// import CreateContact from "@/pages/CreateContact";
import CreateLead from "@/pages/CreateLead";
import CreateOpportunity from "@/pages/CreateOpportunity";
import CreateRole from "@/pages/CreateRole";
import CreateTask from "@/pages/CreateTask";
import CreateTeam from "@/pages/CreateTeam";
import CreateUser from "@/pages/CreateUser";
import Currency from "@/pages/Currency";
import Documents from "@/pages/Documents";
import EntityType from "@/pages/EntityType";
import FundType from "@/pages/FundType";
import HomePage from "@/pages/HomePage";
import InitiateOnboarding from "@/pages/InitiateOnboarding";
import Leads from "@/pages/Leads";
import Login from "@/pages/Login";
import Navigator from "@/pages/Navigator";
import OnboardingDashboard from "@/pages/OnboardingDashboard";
import OnboardingList from "@/pages/OnboardingList";
import Opportunities from "@/pages/Opportunities";
import Profile from "@/pages/Profile";
import Role from "@/pages/Role";
import SalesDashboard from "@/pages/SalesDashboard";
import Signup from "@/pages/Signup";
import Tasks from "@/pages/Tasks";
import Teams from "@/pages/Teams";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import CustomerSuceess from "@/pages/customerSuceess";
import CustomerOnboardSuceess from "@/pages/customerOnboardSuceess";
import ComplianceDashboard from "@/pages/ComplianceDashboard";
// import ViewContact from "@/pages/EditLeadManagement";
import SalesCustomerOnboarding from "@/pages/SalesCustomerOnboarding";
import CreateDocument from "@/pages/createDocument";
import ViewChecklist from "@/pages/viewChecklist";
import CreateEntityType from "@/pages/CreateEntityType";
import CreateClientType from "@/pages/CreateClientType";
import CreateFundType from "@/pages/CreateFundType";
import CreateCurrency from "@/pages/CreateCurrency";
import EditTeams from "@/pages/EditTeams";
import EditEntityType from "@/pages/EditEntityType";
import EditClientType from "@/pages/EditClientType";
import EditFundType from "@/pages/EditFundType";
import EditCountry from "@/pages/EditCountry";
import EditCurrency from "@/pages/EditCurrency";
import EditRoles from "@/pages/EditRoles";
import LeadManagement from "@/pages/LeadManagement";
import CreateLeadManagement from "@/pages/CreateLeadManagement";
import EditLeadManagement from "@/pages/EditLeadManagement";

const routes = [
  {
    exact: true,
    path: "/login",
    component: <Login />,
  },
  {
    exact: true,
    path: "/signup",
    component: <Signup />,
  },
  {
    exact: true,
    path: "/",
    component: <HomePage />,
  },
  {
    exact: true,
    path: "/profile",
    component: <Profile />,
  },
  {
    exact: true,
    path: "/tasks",
    component: <Tasks />,
  },
  {
    exact: true,
    path: "/leads",
    component: <Leads />,
  },
  {
    exact: true,
    path: "/createTask",
    component: <CreateTask />,
  },
  {
    exact: true,
    path: "/createLead",
    component: <CreateLead />,
  },
  {
    exact: true,
    path: "/users",
    component: <Users />,
  },
  {
    exact: true,
    path: "/createUser",
    component: <CreateUser />,
  },
  // {
  //   exact: true,
  //   path: "/contacts",
  //   component: <Contacts />,
  // },
  {
    exact: true,
    path: "/leadManagement",
    component: <LeadManagement />,
  },
  {
    exact: true,
    path: "/createLeadManagement",
    component: <CreateLeadManagement />,
  },
  {
    exact: true,
    path: "/opportunities",
    component: <Opportunities />,
  },
  {
    exact: true,
    path: "/createOpportunity",
    component: <CreateOpportunity />,
  },
  {
    exact: true,
    path: "/compliance",
    component: <Compliance />,
  },
  {
    exact: true,
    path: "/complianceChecklist/:id",
    component: <ComplianceChecklist />,
  },
  {
    exact: true,
    path: "/createChecklict",
    component: <CreateChecklist />,
  },
  {
    exact: true,
    path: "/viewChecklist",
    component: <ViewChecklist />,
  },
  {
    exact: true,
    path: "/createDocument",
    component: <CreateDocument />,
  },
  {
    exact: true,
    path: "/roles",
    component: <Role />,
  },
  {
    exact: true,
    path: "/createRole",
    component: <CreateRole />,
  },
  {
    exact: true,
    path: "/teams",
    component: <Teams />,
  },
  {
    exact: true,
    path: "/createTeam",
    component: <CreateTeam />,
  },

  {
    exact: true,
    path: "/navigator",
    component: <Navigator />,
  },

  {
    exact: true,
    path: "/country",
    component: <Country />,
  },
  {
    exact: true,
    path: "/clientType",
    component: <ClientType />,
  },
  {
    exact: true,
    path: "/currency",
    component: <Currency />,
  },
  {
    exact: true,
    path: "/documentsList",
    component: <Documents />,
  },
  {
    exact: true,
    path: "/entityType",
    component: <EntityType />,
  },
  {
    exact: true,
    path: "/fundType",
    component: <FundType />,
  },
  {
    exact: true,
    path: "/onboardinglist",
    component: <OnboardingList />,
  },
  {
    exact: true,
    path: "/initiateonboarding",
    component: <InitiateOnboarding />,
  },

  {
    exact: true,
    path: "/onboardingdashboard",
    component: <OnboardingDashboard />,
  },
  {
    exact: true,
    path: "/salesdashboard",
    component: <SalesDashboard />,
  },
  {
    exact: true,
    path: "/reports",
    component: <Reports />,
  },
  {
    exact: true,
    path: "/customerSuccess",
    component: <CustomerSuceess />,
  },
  {
    exact: true,
    path: "/customerOnboardSuccess",
    component: <CustomerOnboardSuceess />,
  },
  {
    exact: true,
    path: "/complianceDashboard",
    component: <ComplianceDashboard />,
  },
  {
    exact: true,
    path: "/editLeadManagement",
    component: <EditLeadManagement />,
  },
  {
    exact: true,
    path: "/salesCustomerOnboarding",
    component: <SalesCustomerOnboarding />,
  },
  {
    exact: true,
    path: "/createEntityType",
    component: <CreateEntityType />,
  },
  {
    exact: true,
    path: "/createClientType",
    component: <CreateClientType />,
  },
  {
    exact: true,
    path: "/createFundType",
    component: <CreateFundType />,
  },
  {
    exact: true,
    path: "/createCurrency",
    component: <CreateCurrency />,
  },
  {
    exact: true,
    path: "/editTeams",
    component: <EditTeams />,
  },
  {
    exact: true,
    path: "/editEntityType",
    component: <EditEntityType />,
  },
  {
    exact: true,
    path: "/editClientType",
    component: <EditClientType />,
  },
  {
    exact: true,
    path: "/editFundType",
    component: <EditFundType />,
  },
  {
    exact: true,
    path: "/editCountry",
    component: <EditCountry />,
  },
  {
    exact: true,
    path: "/editCurrency",
    component: <EditCurrency />,
  },
  {
    exact: true,
    path: "/editRole",
    component: <EditRoles />,
  },
];

export default routes;
