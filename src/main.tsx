import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { CreateAccountPage, LoginPage, RegisterPage, RegistrationCodePage, RestorePasswordPage } from './modules/auth/pages/index.ts';
import { MyLayout } from './modules/core/components/index.ts';
import { HeroUIProvider } from '@heroui/react';
import { initReactI18next } from 'react-i18next';
import { TranslationConfig } from './modules/core/utils/TranslationConfig.ts';
import {ToastProvider} from "@heroui/toast";
import { MembershipPage } from './modules/membership/pages/index.ts';
import { NotificationsPage } from './modules/notifications/pages/index.ts';

import i18n from 'i18next';
import './index.css'


/* The code snippet you provided is setting up internationalization (i18n) for the application using
the i18next library in a React environment. */
i18n.use(initReactI18next).init(TranslationConfig);

/* The `const notAuthenticatedRoutes` is creating a routing configuration for routes that are
accessible to users who are not authenticated or logged in. In this specific case, it is defining a
single route with the path `'*'`, which acts as a wildcard matching any path that has not been
matched by other routes. When a user accesses a path that is not matched by any other route, the
`Login` component will be rendered, prompting the user to log in or authenticate before accessing
the protected routes. */

// const notAuthenticatedRoutes = createBrowserRouter([
//   {
//     path: '',
//     element: (
//       <div>
//         <Outlet />
//       </div>
//     ),
//     children: [
//       {
//         path: '/',
//         element: <LoginPage />
//       },
//       {
//         path: 'register',
//         element: <RegisterPage />
//       },
//       {
//         path: 'registration-code',
//         element: <RegistrationCodePage />
//       },
//       {
//         path: 'restore-password',
//         element: <RestorePasswordPage />
//       },
//       {
//         path: 'create-account',
//         element: <CreateAccountPage />
//       },
//       {
//         path: '*',
//         element: <Navigate to="/" replace />
//       },
//     ]
//   }
// ]);

/* The `authenticatedRoutes` constant is creating a routing configuration for authenticated users in a
React application using the `createBrowserRouter` function. It defines different paths and their
corresponding components that should be rendered when the user navigates to those paths within the
authenticated section of the application. */

// const authenticatedRoutes = createBrowserRouter([
//   {
//     path: '/membership',
//     element: (
//       <MyLayout />
//     ),
//     children: [
//       {
//         path: '/membership',
//         element: <MembershipPage />
//       },
//       // {
//       //   path: '/:action',
//       //   element: <EmployeesFormPage />
//       // },
//       // {
//       //   path: 'remunerations',
//       //   element: <RemunerationsPage />
//       // },
//       // {
//       //   path: 'income-log',
//       //   element: <IncomeLogPage />
//       // },
//       // {
//       //   path: 'income-log/:action',
//       //   element: <IncomeLogFormPage />
//       // },
//       // {
//       //   path: 'invoices',
//       //   element: <InvoicesPage />
//       // },
//       // {
//       //   path: 'invoices/:action',
//       //   element: <InvoicesFormPage />
//       // },
//       // {
//       //   path: 'task-management',
//       //   element: <TaskManagementPage />
//       // },
//       // {
//       //   path: 'reports',
//       //   element: <ReportsPage />
//       // },
//       // {
//       //   path: 'salaries',
//       //   element: <SalariesPage />
//       // },
//       // {
//       //   path: 'salaries/:action',
//       //   element: <SalariesFormPage />
//       // },
//       // {
//       //   path: 'clients',
//       //   element: <ClientsPage />
//       // },
//       // {
//       //   path: 'clients/:action',
//       //   element: <ClientsFormPage />
//       // },
//     ]
//   }
// ]);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'registration-code', element: <RegistrationCodePage /> },
      { path: 'restore-password', element: <RestorePasswordPage /> },
      { path: 'create-account', element: <CreateAccountPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ]
  },
  {
    path: '/membership',
    element: <MyLayout />,
    children: [
      {
        path: '',
        element: <MembershipPage />
      },
    ]
  },
  {
    path: '/notifications',
    element: <MyLayout />,
    children: [
      {
        path: '/notifications',
        element: <NotificationsPage />
      }
    ]
  }
]);

const Navigation = () => {

  // const { status } = useContext(AuthContext);

  // switch (status) {
  //   case 'checking':
  //     return <Loading message={t('verifying_account')} />;

  //   case 'not-authenticated':
  //     return <RouterProvider router={notAuthenticatedRoutes} />

  //   case 'authenticated':
  //     return <RouterProvider router={authenticatedRoutes} />
  // }
  return <RouterProvider router={appRouter} />
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center"/>
      <Navigation />
    </HeroUIProvider>
  </StrictMode>,
)
