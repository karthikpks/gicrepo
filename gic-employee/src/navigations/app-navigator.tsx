import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { EmployeeAddPage, EmployeeListPage } from '../pages';

const AppNavigator= () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
            <Navigate to={{ pathname: "employee/list" }} />
        }/>
        <Route path="employee/list" element={<EmployeeListPage />} />
        <Route path="employee/add" element={<EmployeeAddPage />} />
        <Route path="employee/edit/:id" element={<EmployeeAddPage />} />
      </Routes>
    </div>
  );
};

export default AppNavigator;