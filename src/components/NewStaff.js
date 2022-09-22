import React, { Component } from "react";
import {
    Label,
    Col,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Row
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len);
const maxNum = (num) => (val) => val <= num;
const minNum = (num) => (val) => val >= num;
const isNumber = (val) => !isNaN(Number(val));

class NewStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {

            openform: false,

        };

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    toggleModal = () => {
        this.setState({ openform: !this.state.openform });
    };

    handleSubmit(values) {
        this.props.postStaff(
            values.name,
            values.doB,
            values.startDate,
            values.departmentId,
            values.salaryScale,
            values.annualLeave,
            values.overTime)
        this.toggleModal();
    }

    render() {

        return (
            <div>
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-plus fa-lg"></span>
                    </Button>
                </div>
                <div>
                    <Modal isOpen={this.state.openform} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleForm}>Thêm Nhân Viên</ModalHeader>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <ModalBody>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}>
                                        Tên
                                    </Label>
                                    <Col md={8}>
                                        {" "}
                                        <Control.text model=".name"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(2), maxLength: maxLength(30)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                                minLength: 'Tên phải có hơn 2 kí tự',
                                                maxLength: 'Tên phải nhỏ hơn 30 kí tự'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" md={4}>
                                        Ngày sinh{" "}
                                    </Label>
                                    <Col md={8}>
                                        {" "}
                                        <Control
                                            model=".doB"
                                            type="date"
                                            value={this.state.tenState}
                                            id="doB"
                                            name="doB"
                                            className="form-control"
                                            validators={required}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".doB"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                            }}
                                        />
                                    </Col>{" "}
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" md={4}>
                                        Ngày vào công ty{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Control
                                            model=".startDate"
                                            type="date"
                                            value={this.state.tenState}
                                            id="startDate"
                                            name="startDate"
                                            className="form-control"
                                            validators={required}

                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                            }}
                                        />
                                    </Col>
                                </Row>


                                <Row className="form-group">
                                    <Label htmlFor="departmentId" md={4}>
                                        Phòng ban{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model=".departmentId"
                                            id="departmentId"
                                            name="departmentId"
                                            className="form-control"
                                        >
                                            <option>...</option>
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" md={4}>
                                        Hệ số lương{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".salaryScale"
                                            id="salaryScale"
                                            name="salaryScale"
                                            className="form-control"
                                            validators={{ required, isNumber, minNum: minNum(1), maxNum: maxNum(3) }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".salaryScale"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                                isNumber: 'Yêu cầu nhập số',
                                                minNum: 'Giá trị phải lớn hơn 1',
                                                maxNum: 'Giá trị phải nhở hơn 3',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" md={4}>
                                        Ngày nghỉ còn lại
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".annualLeave"
                                            id="annualLeave"
                                            name="annualLeave"
                                            className="form-control"
                                            validators={{ required, isNumber: isNumber }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".annualLeave"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                                isNumber: 'Yêu cầu nhập số'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" md={4}>
                                        Ngày làm thêm{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".overTime"
                                            id="overTime"
                                            name="overTime"
                                            className="form-control"
                                            validators={{ required, isNumber }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".overTime"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                                isNumber: 'Yêu cầu nhập số'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Row className="form-group">

                                    <Button color="primary" type="submit">
                                        Thêm{" "}
                                    </Button>{" "}
                                    <Button onClick={this.toggleModal}>Cancel</Button>
                                </Row>
                            </ModalFooter>
                        </LocalForm>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default NewStaff;