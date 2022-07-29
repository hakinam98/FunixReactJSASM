import { Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import SearchStaff from "./SearchComponent";

function RenderMenuStaff({ staff, onClick }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg
          width="100%"
          object
          src={staff.image}
          alt={staff.name}
        ></CardImg>
      </Link>
      <div className="text-center">
        <h5>{staff.name}</h5>
      </div>
    </Card>
  );
}

const StaffList = (props) => {
  const menu = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-sm-4 col-md-2">
        <RenderMenuStaff staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 m-1">
          <div className="row justify-content-between">
            <div>
              <h3>Nhân viên</h3>
            </div>
            <div>
              <SearchStaff />
            </div>
          </div>

          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default StaffList;
