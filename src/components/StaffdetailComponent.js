import React from "react";
import { Card, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function RenderStaff({ staff }) {
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
            <li>Phòng ban:{staff.department.name}</li>
            <li>Số ngày nghỉ còn lại: {staff.annualLeave}</li>
            <li>Số ngày đã làm thêm: {staff.overTime}</li>
          </ul>
        </div>
      </div>
    );
  } else return <div></div>;
}
const StaffDetail = (props) => {
  if (props.staff != null) {
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
        <RenderStaff staff={props.staff} />
      </div>
    );
  }
};

export default StaffDetail;
