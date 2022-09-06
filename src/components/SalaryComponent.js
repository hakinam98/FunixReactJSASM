import { Card } from "reactstrap";

function RenderMenuSalary({ staff }) {
  return (
    <Card className="text-center">
      <h4>{staff.name}</h4>
      <p>Mã nhân viên: {staff.id}</p>
      <p>Hệ số lương: {staff.salaryScale}</p>
      <p>Số ngày làm thêm: {staff.overTime}</p>
      <p className="mark">
        Lương:{" "}
        {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed(0)}
      </p>
    </Card>
  );
}
const SalaryMenu = (props) => {
  const menu = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-sm-5 col-md-3 m-1">
        <RenderMenuSalary staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default SalaryMenu;
