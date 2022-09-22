import React from "react";
import { Card, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";
import { baseUrl } from "../Shared/baseUrl";


function RenderStaffWithDept({ staff }) {
    return (
        <Card>
            <CardImg
                width="100%"
                object
                src={baseUrl + staff.image}
                alt={staff.name}
            ></CardImg>
            <div className="text-center">
                <h5>{staff.name}</h5>
            </div>
        </Card>
    );
}
const StafflistWithDept = ({ staffs, department }) => {
    const menustaff = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-sm-4 col-md-2">
                <RenderStaffWithDept staff={staff} />
            </div>
        )
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
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/departments">Phòng ban</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{department.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
                <div className="row">{menustaff}</div>
            </div>
        )
}

export default StafflistWithDept;