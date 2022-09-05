import React, { Component, } from "react";
import StaffDetail from "./StaffdetailComponent";
import DepartmentList from "./DepartmentComponent";
import SalaryMenu from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Routes, useNavigate, useParams, Route } from "react-router-dom";
import { STAFFS, DEPARTMENTS } from "../Shared/staffs";
import StaffList from "../components/StaffListComponent";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: JSON.parse(localStorage.getItem('staffs')) || STAFFS,
      departments: DEPARTMENTS,
    };
    this.handleAddStaff = this.handleAddStaff.bind(this);

  }

  handleAddStaff(staff) {
    const item = {
      ...staff,
      id: this.state.staffs.length,
      image: '/assets/images/alberto.png',
    }
    this.setState({
      staffs: [...this.state.staffs, item]

    });
    localStorage.setItem('staffs', JSON.stringify([...this.state.staffs, item]))
  }

  render() {
    const StaffWithId = () => {
      const params = useParams();
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(params.staffId, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route
            index
            element={<StaffList staffs={this.state.staffs} departments={this.state.departments} handleAddStaff={this.handleAddStaff} />}
          />
          <Route
            path="staffs"
            element={<StaffList staffs={this.state.staffs} departments={this.state.departments} handleAddStaff={this.handleAddStaff} />}
          />
          <Route path="staffs/:staffId" element={<StaffWithId />} />
          <Route
            path="departments"
            element={
              <DepartmentList departments={this.state.departments} />
            }
          />
          <Route
            path="salary"
            element={<SalaryMenu staffs={this.state.staffs} />}
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}
export default Main;
