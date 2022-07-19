import { Navbar, NavbarBrand } from "reactstrap";
import { STAFFS } from "./Shared/staffs";
import "./App.css";
import { Component } from "react";
import StaffList from "./components/StaffListComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { staffs: STAFFS };
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <NavbarBrand herf="/" className="text-white">
            Ứng dụng quản lý nhân sự v1.0
          </NavbarBrand>
        </Navbar>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
