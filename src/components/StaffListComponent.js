import {
  Card, CardImg, FormGroup, Col, Input, Button, InputGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import NewStaff from "./NewStaff";


const StaffList = ({ staffs, handleAddStaff, departments }) => {
  const [keywords, setKeywords] = useState("");
  const [key, setKey] = useState("");

  function handleInputChange(value) {
    setKey(value);
  }
  function handleSearch() {
    setKeywords(key);
    setKey("");
  }
  const RenderMenuStaff = ({ staff }) => {
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
  let filterstaffs = staffs.filter((staff) => {
    return staff.name.toUpperCase().includes(keywords.toUpperCase());
  });
  const menu = filterstaffs.map((staff) => {
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
              <NewStaff onClickSubmit={handleAddStaff} departments={departments} />
            </div>
            <div>
              <InputGroup type="submit">
                <Input
                  placeholder="Tìm nhân viên"
                  value={key}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <Button type="submit" color="primary" onClick={handleSearch}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </Button>
              </InputGroup>
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