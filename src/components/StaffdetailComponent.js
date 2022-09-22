import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";
import EditStaff from "./EditStaff"


class DeteteStaff extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    console.log(this.props.staff.id)
    this.props.deleteStaff(this.props.staff.id)
  }

  render() {
    return (
      <div>
        <Button type="button" className="btn btn-danger " onClick={this.handleSubmit}>Delete</Button>
      </div>
    )
  }
}

function RenderStaff({ staff, departments, deleteStaff, editStaff }) {

  const department = departments.filter(department => department.id === staff.departmentId)[0]
  console.log(department);
  if (staff != null) {
    return (
      <div className="row">
        <div className="col-12 col-sm-4 col md-3">
          <img width="100%" object src={staff.image} alt={staff.name} />
        </div>
        <div className="col-12 col-sm-8 col md-9">
          <h4>Họ và tên: {staff.name}</h4>
          <ul className="list-unstyled">
            <li>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</li>
            <li>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </li>
            <li>Phòng ban:{department.name}</li>
            <li>Số ngày nghỉ còn lại: {staff.annualLeave}</li>
            <li>Số ngày đã làm thêm: {staff.overTime}</li>
          </ul>
          <div className="d-inline-flex">
            <EditStaff staff={staff} editStaff={editStaff} departments={departments} />
            <DeteteStaff staff={staff} deleteStaff={deleteStaff} />
          </div>
        </div >
      </div >
    );
  } else return <div></div>;
}
const StaffDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <RenderStaff staff={props.staff} departments={props.departments} />
      </div>
    );
  }
};

export default StaffDetail;
