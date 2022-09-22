import {
  Card, CardImg, Input, Button, InputGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import NewStaff from "./NewStaff";

import { Loading } from "./LoadingComponents";
import { FadeTransform } from 'react-animation-components';




const RenderMenuStaff = ({ staff }) => {
  return (
    <div>
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
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
      </FadeTransform>
    </div>
  );
}

const StaffList = ({ staffs, postStaff, departments }) => {
  const [keywords, setKeywords] = useState("");
  const [key, setKey] = useState("");

  function handleInputChange(value) {
    setKey(value);
  }
  function handleSearch() {
    setKeywords(key);
    setKey("");
  }

  let filterstaffs = staffs.staffs.filter((staff) => {
    return staff.name.toUpperCase().includes(keywords.toUpperCase());
  });
  const menu = filterstaffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-sm-4 col-md-2">
        <RenderMenuStaff staff={staff} />
      </div>
    );
  });
  if (staffs.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if (staffs.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{staffs.errMess}</h4>
        </div>
      </div>
    )
  }
  else
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 m-1">
            <div className="row justify-content-between">
              <div>
                <h3>Nhân viên</h3>
              </div>
              <div>
                <NewStaff departments={departments} postStaff={postStaff} />
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