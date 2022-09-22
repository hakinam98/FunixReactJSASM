import React, { Component, } from "react";
import StaffDetail from "./StaffdetailComponent";
import DepartmentList from "./DepartmentComponent";
import StafflistWithDept from "./DepartDetailCompnents";
import SalaryMenu from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, withRouter, Route } from "react-router-dom";
import StaffList from "../components/StaffListComponent";
import { connect } from 'react-redux';
import { fetchStaffs, fetchDepartments, fetchStaffsSalary, postStaff, deleteStaff, editStaff } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = dispatch => ({
  postStaff: (name,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime) => dispatch(postStaff(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
  fetchStaffs: () => { dispatch(fetchStaffs()) },
  fetchDepartments: () => { dispatch(fetchDepartments()) },
  fetchStaffsSalary: () => { dispatch(fetchStaffsSalary()) },
  deleteStaff: (id) => { dispatch(deleteStaff(id)) },
  editStaff: (id,
    name,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime) => dispatch(editStaff(id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime))
})

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.errMess}
          departments={this.props.departments.departments}
          deleteStaff={this.props.deleteStaff}
          editStaff={this.props.editStaff}
        />
      );
    };
    const StaffWithDept = ({ match }) => {
      return (
        <StafflistWithDept
          staffs={this.props.staffs.staffs.filter(staff => staff.departmentId === match.params.departmentId)}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.errMess}
          department={this.props.departments.departments.filter(department => department.id === match.params.departmentId)[0]}
        />
      )
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route
                exact path="/staffs"
                component={() => <StaffList staffs={this.props.staffs} departments={this.props.departments} postStaff={this.props.postStaff} />}
              />
              <Route exact path="/staffs/:staffId" component={StaffWithId} />

              <Route
                exact path="/departments"
                component={() =>
                  <DepartmentList departments={this.props.departments} />
                }
              />
              <Route path="/departments/:departmentId" component={StaffWithDept} />
              <Route
                exact path="/staffsSalary"
                component={() => <SalaryMenu staffsSalary={this.props.staffsSalary} />}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
