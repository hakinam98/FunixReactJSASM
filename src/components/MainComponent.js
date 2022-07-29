import React, { Component } from "react";
import StaffList from "../components/StaffListComponent";
import StaffDetail from "./StaffdetailComponent";
import DepartmentList from "./DepartmentComponent";
import SalaryMenu from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Redirect, Route } from "react-router-dom";
import { STAFFS, DEPARTMENTS } from "../Shared/staffs";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }
  onStaffSelect(staffId) {
    this.setState({ selectedStaff: staffId });
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            component={() => <StaffList staffs={this.state.staffs} />}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            path="/departments"
            component={() => (
              <DepartmentList departments={this.state.departments} />
            )}
          />
          <Route
            path="/salary"
            component={() => <SalaryMenu staffs={this.state.staffs} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;
