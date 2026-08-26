import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { ROUTES, BASE_NAME } from '../constants/constants';
import { mainPageRoutes } from '../pages/mainPage/routes';

export const router = createBrowserRouter(
    [
        {
            path: ROUTES.HOME,
            element: <Layout />,
            children: [
                ...mainPageRoutes,
            ],
        },
    ],
    {
        basename: BASE_NAME,
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionError: true,
        },
    }
);
