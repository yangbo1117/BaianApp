import { combineReducers } from 'redux'
import Fetch from './middleware/fetch/index.reducer'
import Home from './app/home/index.reducer'

import EmployeeList from './app/organization/employee/list/index.reducer'
import NewEmployee from './app/organization/employee/new/index.reducer'
import EmployeeDetail from './app/organization/employee/detail/index.reducer'

import EmployeePositionList from './app/organization/employeePosition/list/index.reducer'
import NewEmployeePosition from './app/organization/employeePosition/new/index.reducer'
import EmployeePositionDetail from './app/organization/employeePosition/detail/index.reducer'

import DepartmentList from './app/organization/department/list/index.reducer'
import NewDepartment from './app/organization/department/new/index.reducer'
import DepartmentDetail from './app/organization/department/detail/index.reducer'

import PositionList from './app/organization/position/list/index.reducer'
import NewPosition from './app/organization/position/new/index.reducer'
import PositionDetail from './app/organization/position/detail/index.reducer'

import TitleList from './app/organization/title/list/index.reducer'
import NewTitle from './app/organization/title/new/index.reducer'
import TitleDetail from './app/organization/title/detail/index.reducer'

import JobList from './app/organization/job/list/index.reducer'
import NewJob from './app/organization/job/new/index.reducer'
import JobDetail from './app/organization/job/detail/index.reducer'

import CompanyList from './app/organization/company/list/index.reducer'
import NewCompany from './app/organization/company/new/index.reducer'
import CompanyDetail from './app/organization/company/detail/index.reducer'

export default combineReducers({
  Fetch,
  Home,
  EmployeeList,
  EmployeePositionList,
  NewEmployeePosition,
  EmployeePositionDetail,
  NewEmployee,
  EmployeeDetail,
  DepartmentList,
  NewDepartment,
  DepartmentDetail,
  PositionList,
  NewPosition,
  PositionDetail,
  TitleList,
  NewTitle,
  TitleDetail,
  CompanyList,
  NewCompany,
  CompanyDetail,
  JobList,
  NewJob,
  JobDetail
})
