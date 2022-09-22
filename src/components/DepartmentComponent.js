import {
  Card,
} from "reactstrap";
import { Link } from "react-router-dom";

import { Loading } from './LoadingComponents'

function RenderDeparment({ department }) {
  return (
    <Card>
      <Link to={`/departments/${department.id}`}>
        <h4>{department.name}</h4>
      </Link>
      <p className="text-center">
        Số lượng nhân viên: {department.numberOfStaff}
      </p>
    </Card>
  );
}

const DepartmentList = (props) => {
  const menu = props.departments.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-sm-5 col-md-3 m-1">
        <RenderDeparment department={department} />
      </div>
    );
  });
  if (props.departments.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if (props.departments.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.departments.errMess}</h4>
        </div>
      </div>
    )
  }
  else
    return (
      <div className="container">
        <div className="row">{menu}</div>
      </div>
    );
};
export default DepartmentList;
