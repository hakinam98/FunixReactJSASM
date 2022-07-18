import { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className=" col-12 col-md-3 col-sm-4 m-1">
          <Card className="">
            <h4>Họ và tên: {staff.name}</h4>
            <ul className="list-unstyle">
              <li>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</li>
              <li>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </li>
              <li>Phòng ban:{staff.department.name}</li>
              <li>Số ngày nghỉ còn lại: {staff.annualLeave}</li>
              <li>Số ngày đã làm thêm: {staff.overTime}</li>
            </ul>
          </Card>
        </div>
      );
    } else return <p>Bấm vào tên nhân viên để xem thông tin.</p>;
  }

  render() {
    const menu = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-3 col-sm-4 m-1">
          <Card onClick={() => this.onStaffSelect(staff)}>{staff.name}</Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}
export default StaffList;
