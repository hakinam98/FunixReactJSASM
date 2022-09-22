import { Card } from "reactstrap";
import { FadeTransform } from 'react-animation-components';

function RenderMenuSalary({ staff }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card className="text-center">
        <h4>{staff.name}</h4>
        <p>Hệ số lương: {staff.salaryScale}</p>
        <p>Số ngày làm thêm: {staff.overTime}</p>
        <p className="mark">
          Lương:{" "}
          {staff.salary}
        </p>
      </Card>
    </FadeTransform>
  );
}
const SalaryMenu = (props) => {
  const menu = props.staffsSalary.staffsSalary.map((staff) => {
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
