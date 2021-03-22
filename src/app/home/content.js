import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import EmployeeList from '../organization/employee/list/index'
import NewEmployee from '../organization/employee/new/index'
import EmployeeDetail from '../organization/employee/detail/index'

import EmployeePositionList from '../organization/employeePosition/list/index'
import NewEmployeePosition from '../organization/employeePosition/new/index'
import EmployeePositionDetail from '../organization/employeePosition/detail/index'

import DepartmentList from '../organization/department/list/index'
import NewDepartment from '../organization/department/new/index'
import DepartmentDetail from '../organization/department/detail/index'

import PositionList from '../organization/position/list/index'
import NewPosition from '../organization/position/new/index'
import PositionDetail from '../organization/position/detail/index'
import TitleList from '../organization/title/list/index'
import NewTitle from '../organization/title/new/index'
import TitleDetail from '../organization/title/detail/index'

import JobList from '../organization/job/list/index'
import NewJob from '../organization/job/new/index'
import JobDetail from '../organization/job/detail/index'

import CompanyList from '../organization/company/list/index'
import NewCompany from '../organization/company/new/index'
import CompanyDetail from '../organization/company/detail/index'

import Permission from '../permission'
import Welcome from '../welcome'

const { Content } = Layout

let Contents = ({ style }) => {
  return (
    <Content style={style}>
      <Switch>
        <Route path="/employee/employee/list" component={EmployeeList} />
        <Route path="/employee/employee/new" component={NewEmployee} />
        <Route path="/employee/employee/detail" component={EmployeeDetail} />

        <Route path="/employee/employeePosition/list" component={EmployeePositionList} />
        <Route path="/employee/employeePosition/new" component={NewEmployeePosition} />
        <Route path="/employee/employeePosition/detail" component={EmployeePositionDetail} />
        <Route path="/department/department/list" component={DepartmentList} />
        <Route path="/department/department/new" component={NewDepartment} />
        <Route path="/department/department/detail" component={DepartmentDetail} />

        <Route path="/department/position/list" component={PositionList} />
        <Route path="/department/position/new" component={NewPosition} />
        <Route path="/department/position/detail" component={PositionDetail} />

        <Route path="/configuration/title/list" component={TitleList} />
        <Route path="/configuration/title/new" component={NewTitle} />
        <Route path="/configuration/title/detail" component={TitleDetail} />

        <Route path="/configuration/job/list" component={JobList} />
        <Route path="/configuration/job/new" component={NewJob} />
        <Route path="/configuration/job/detail" component={JobDetail} />

        <Route path="/configuration/company/list" component={CompanyList} />
        <Route path="/configuration/company/new" component={NewCompany} />
        <Route path="/configuration/company/detail" component={CompanyDetail} />


        <Route path="/permission" component={Permission} />
        <Route path="/welcome" component={Welcome} />
        <Redirect to="/welcome" />
      </Switch>
    </Content>
  )
}

export default Contents
