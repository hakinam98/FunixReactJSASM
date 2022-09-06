import {
  Card
} from "reactstrap";

function RenderDeparment({ department }) {
  return (
    <Card>
      <h4>{department.name}</h4>
      <p className="text-center">
        Số lượng nhân viên: {department.numberOfStaff}
      </p>
    </Card>
  );
}

const DepartmentList = (props) => {
  const menu = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-sm-5 col-md-3 m-1">
        <RenderDeparment department={department} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};
export default DepartmentList;
