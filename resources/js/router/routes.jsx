import React, { lazy } from 'react';
import Paths from '@/router/paths';
// 00 Auth
const LoginPage = lazy(() => import('../features/auth/login_page'));
const LogoutPage = lazy(() => import('../features/auth/logout_page'));

// 01. Dashboard
const DashboardPage     = lazy(() => import('../features/dashboard/index'));
// 02. Attendances
const AttendanceCompiler = lazy(() => import('../features/attendance/compile'));
const AttendanceList = lazy(() => import('../features/attendance/list'));
// 03. Badges
const AddBadge = lazy(() => import('../features/badges/add'));
const BadgeList = lazy(() => import('../features/badges/list'));
// 04. CreditRecharge
const AddCreditRecharge = lazy(() => import('../features/credit/add'));
const CreditRechargeList = lazy(() => import('../features/credit/list'));
// 05. Employees
const AddEmployee = lazy(() => import('../features/employees/add'));
const EmployeeList = lazy(() => import('../features/employees/list'));
// 06. Equipements
const AddEquipment = lazy(() => import('../features/equipment/add'));
const EquipmentList = lazy(() => import('../features/equipment/list'));
// 07. Exit Passes/Slip
const AddExitPass = lazy(() => import('../features/exitpass/add'));
const ExitPassList = lazy(() => import('../features/exitpass/list'));
// 08. Intervention
const AddIntervention = lazy(() => import('../features/intervention/add'));
const InterventionList = lazy(() => import('../features/intervention/list'));
// 09. IT Assets
const AddAsset = lazy(() => import('../features/itassets/add'));
const AssetList = lazy(() => import('../features/itassets/list'));
// 10. NVR Tools
const NVRDownTimePage = lazy(() => import("../features/nvrtools/downtime"));
// 11. OAuth
const AddApp = lazy(() => import('../features/oauth/apps/add'));
const AppList = lazy(() => import('../features/oauth/apps/list'));
const OAuthLogger = lazy(() => import('../features/oauth/logs/list'));
// 12. OnCalls
const AddOnCall = lazy(() => import('../features/oncall/add'));
const OnCallList = lazy(() => import('../features/oncall/list'));
// 13. PhoneBook
const PhoneBookDetails = lazy(() => import('../features/phonebook/add'));
const PhoneBookList = lazy(() => import('../features/phonebook/list'));
// 14. Replacement
const ReplacementForm = lazy(() => import('../features/replacement/add'));
const ReplacementList = lazy(() => import('../features/replacement/list'));
// 14. Settings
const SettingsHome = lazy(() => import('../features/settings/index'));
// 15. Sim cards
const AddSimCard = lazy(() => import('../features/simcards/add'));
const SimCardList = lazy(() => import('../features/simcards/list'));
// 16. Tickets
const TicketList = lazy(() => import('../features/tickets/list'));
// 17. Users
const AddUser = lazy(() => import('../features/users/add'));
const UserList = lazy(() => import('../features/users/list'));

const appRoutes = [
    // 01. Dashboard/Home Page
    { path: Paths.home, element: <DashboardPage /> },
    { path: Paths.dashboard, element: <DashboardPage /> },    
    // 02. Attendance
    { path: Paths.attendances, element: <AttendanceList /> },
    { path: Paths.compileAttendance, element: <AttendanceCompiler /> },
    // 03. Badges
    { path: Paths.addBadge, element: <AddBadge /> },
    { path: Paths.badges, element: <BadgeList /> },
    // 04. CreditRecharge
    { path: Paths.credits, element: <AddCreditRecharge /> },
    { path: Paths.addCredit, element: <CreditRechargeList /> },
    // 05. Employees
    { path: Paths.addEmployee, element: <AddEmployee /> },
    { path: Paths.employees, element: <EmployeeList /> },
    // 06. Equipement
    { path: Paths.equipments, element: <EquipmentList /> },
    { path: Paths.addEquipment, element: <AddEquipment /> },
    // 07. ExitPass
    { path: Paths.exitPasses, element: <ExitPassList /> },
    { path: Paths.addExitPass, element: <AddExitPass /> },
    // 08. Intervention
    { path: Paths.interventions, element: <InterventionList /> },
    { path: Paths.addIntervention, element: <AddIntervention /> },
    // 09. Assets
    { path: Paths.assets, element: <AssetList /> },
    { path: Paths.addAsset, element: <AddAsset /> },
    // 10. NVR Tools
    { path: Paths.downtimes, element: <NVRDownTimePage/> },
    // 11. OAuth
    { path: Paths.oauthAddApp, element: <AddApp /> },
    { path: Paths.oauthApps, element: <AppList /> },
    { path: Paths.oauthLogs, element: <OAuthLogger /> },
    // 12. OnCalls
    { path: Paths.addOnCall, element: <AddOnCall /> },
    { path: Paths.onCalls, element: <OnCallList /> },
    // 13. Phonebook
    { path: Paths.phoneBooks, element: <PhoneBookList /> },
    { path: Paths.addPhoneBook, element: <PhoneBookDetails /> },
    // 14. Replacement
    { path: Paths.addReplacement, element: <ReplacementForm /> },
    { path: Paths.replacements, element: <ReplacementList /> },
    // 15. Settings
    { path: Paths.settings, element: <SettingsHome /> },
    // 16. SimCards
    { path: Paths.addSimcard, element: <AddSimCard /> },
    { path: Paths.simcards, element: <SimCardList /> },
    // 17. Tickets
    { path: Paths.tickets, element: <TicketList /> },
    // 18. Users
    { path: Paths.users, element: <UserList /> },
    { path: Paths.addUser, element: <AddUser /> },
];

const authRoutes = [
    { path: Paths.login, element: <LoginPage/> },
    { path: Paths.logout, element: <LogoutPage/> },
];

export { appRoutes, authRoutes };
