import React, { Component, useState } from "react";
import {
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Col,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
} from "reactstrap";


class NewStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            doB: "",
            salaryScale: "1",
            startDate: "",
            department: "Dept01",
            annualLeave: "0",
            overTime: "0",
            openform: false,
            touched: {
                name: false,
                dob: false,
                startDate: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
            },
        };

        this.toggleModal = this.toggleModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBlur = this.handleBlur.bind(this)

    }


    toggleModal = () => {
        this.setState({ openform: !this.state.openform });
    };

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(value)
        this.setState({
            [name]: value,
        })
    }
    handleSubmit(event) {
        const department = this.props.departments && this.props.departments.filter(x => x.id === this.state.department)[0];
        let item = {
            name: this.state.name,
            doB: this.state.doB,
            startDate: this.state.startDate,
            department: department,
            salaryScale: this.state.salaryScale,
            overTime: this.state.overTime,
            annualLeave: this.state.annualLeave,
        }
        if (item.name !== '' && item.doB !== '' && item.startDate !== '' && item.salaryScale !== '' && item.overTime !== '' && item.annualLeave !== '') {
            console.log(item)
            this.props.onClickSubmit(item);
            event.preventDefault();
            this.toggleModal();
        }

    }



    validate(
        name,
        doB,
        startDate,
        salaryScale,

    ) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            salaryScale: '',
        };

        if (this.state.touched.name && name === '') errors.name = " Yêu cầu nhập";
        else if (this.state.touched.name && name.length < 2)
            errors.name = " Tên phải có hơn 2 kí tự";
        else if (this.state.touched.name && name.length > 30)
            errors.name = "  Tên phải nhỏ hơn 30 kí tự";

        if (this.state.touched.doB && doB === "") errors.doB = "Yêu cầu nhập"

        if (this.state.touched.startDate && startDate === "") errors.startDate = "Yêu cầu nhập"

        if (this.state.touched.salaryScale && salaryScale > 3) {
            errors.salaryScale = "salaryScale <= 3";
        } else if (this.state.touched.salaryScale && salaryScale < 1)
            errors.salaryScale = "salaryScale > 1";
        return (errors);
    }

    render() {
        const errors = this.validate(
            this.state.name,
            this.state.doB,
            this.state.startDate,
            this.state.salaryScale,

        );
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
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="name" md={4}>
                                        Tên
                                    </Label>
                                    <Col md={8}>
                                        {" "}
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={this.handleInputChange}
                                            invalid={errors.name !== ""}
                                            value={this.state.name}
                                            onBlur={this.handleBlur("name")}
                                        />
                                        <FormFeedback>{errors.name}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="doB" md={4}>
                                        Ngày sinh{" "}
                                    </Label>
                                    <Col md={8}>
                                        {" "}
                                        <Input
                                            type="date"
                                            id="doB"
                                            name="doB"
                                            onChange={this.handleInputChange}
                                            invalid={errors.doB !== ""}
                                            value={this.state.doB}
                                            onBlur={this.handleBlur("doB")}
                                        />
                                        <FormFeedback>{errors.doB}</FormFeedback>
                                    </Col>{" "}
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="startDate" md={4}>
                                        Ngày vào công ty{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            onChange={this.handleInputChange}
                                            invalid={errors.startDate !== ""}
                                            value={this.state.startDate}
                                            onBlur={this.handleBlur("startDate")}
                                        />
                                        <FormFeedback>{errors.startDate}</FormFeedback>
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label htmlFor="department" md={4}>
                                        Phòng ban{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Input
                                            type="select"
                                            id="department"
                                            name="department"
                                            onChange={this.handleInputChange}
                                            invalid={errors.department !== ""}
                                            value={this.state.department.id}
                                            onBlur={this.handleBlur("department")}
                                        >
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="salaryScale" md={4}>
                                        Hệ số lương{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Input
                                            type="number"
                                            id="salaryScale"
                                            name="salaryScale"
                                            onChange={this.handleInputChange}
                                            invalid={errors.salaryScale !== ""}
                                            value={this.state.salaryScale}
                                            onBlur={this.handleBlur("salaryScale")}
                                        />
                                        <FormFeedback>{errors.salaryScale}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="annualLeave" md={4}>
                                        Ngày nghỉ còn lại
                                    </Label>
                                    <Col md={8}>
                                        <Input
                                            type="number"
                                            id="annualLeave"
                                            name="annualLeave"
                                            onChange={this.handleInputChange}
                                            value={this.state.annualLeave}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="overTime" md={4}>
                                        Ngày làm thêm{" "}
                                    </Label>
                                    <Col md={8}>
                                        <Input
                                            type="number"
                                            id="overTime"
                                            name="overTime"
                                            onChange={this.handleInputChange}
                                            value={this.state.overTime}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" onClick={this.handleSubmit}>
                                Thêm{" "}
                            </Button>{" "}
                            <Button onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default NewStaff;