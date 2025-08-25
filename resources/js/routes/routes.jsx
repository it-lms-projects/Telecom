import React from 'react';
import PathConstants from './path_constants';

const HomePage     = React.lazy(() => import('../features/dashboard/home'));
const AddTaskPage  = React.lazy(() => import('../features/tasks/add_task'));
const TaskListPage = React.lazy(() => import('../features/tasks/task_list'));

const routes = [
    // 0. Home Page
    { path: PathConstants.HOME, element: <HomePage /> },
    // 1. Task
    { path: PathConstants.ADD_TASK, element: <AddTaskPage /> },
    { path: PathConstants.TASK_LIST, element: <TaskListPage /> },
];

export default routes;
