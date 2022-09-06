import React, { Component, } from "react";
import StaffDetail from "./StaffdetailComponent";
import DepartmentList from "./DepartmentComponent";
import SalaryMenu from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Routes, useNavigate, useParams, Route } from "react-router-dom";
import StaffList from "../components/StaffListComponent";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleAddStaff = this.handleAddStaff.bind(this);

  }

  handleAddStaff(staff) {
    const item = {
      ...staff,
      id: this.props.staffs.length,
      image: '/assets/images/alberto.png',
    }
    this.setState({
      staffs: [...this.props.staffs, item]

    });
    localStorage.setItem('staffs', JSON.stringify([...this.props.staffs, item]))
  }

  render() {
    const StaffWithId = () => {
      const params = useParams();
      return (
        <StaffDetail
          staff={
            this.props.staffs.filter(
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
            element={<StaffList staffs={this.props.staffs} departments={this.props.departments} handleAddStaff={this.handleAddStaff} />}
          />
          <Route
            path="staffs"
            element={<StaffList staffs={this.props.staffs} departments={this.props.departments} handleAddStaff={this.handleAddStaff} />}
          />
          <Route path="staffs/:staffId" element={<StaffWithId />} />
          <Route
            path="departments"
            element={
              <DepartmentList departments={this.props.departments} />
            }
          />
          <Route
            path="salary"
            element={<SalaryMenu staffs={this.props.staffs} />}
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />;
  };
  return Wrapper;
}

export default withRouter(connect(mapStateToProps)(Main));
