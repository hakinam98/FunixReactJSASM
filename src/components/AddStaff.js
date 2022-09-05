import { Input, Label, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Col, FormFeedback } from "reactstrap";
import React, { Component, useState } from "react";


class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            NewStaff: {
                id: '',
                name: '',
                doB: '',
                startDate: '',
                salaryScale: '',
                department: 'Sale',
                annualLeave: '',
                overTime: '',
                salary: '',
                image: '/assets/images/alberto.png',
            },
            touched: {
                name: false,
                doB: false,
                startDate: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        this.toggleModal();

    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name, doB, startDate, salaryScale) {
        const errors = {
            name: "",
            doB: "",
            startDate: "",
            salaryScale: "",
        }

        if (this.state.touched.name && name === '') errors.name = 'Yêu cầu nhập';
        else if (this.state.touched.name && name.length < 2) errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30) errors.name = 'Yêu cầu ít hơn 30 ký tự';

        if (this.state.touched.doB && doB === '') errors.doB = 'Yêu cầu nhập';
        if (this.state.touched.startDate && startDate === '') errors.startDate = 'Yêu cầu nhập';

        if (this.state.touched.salaryScale && (salaryScale < 1 || salaryScale > 3)) errors.salaryScale = 'Hệ số lương từ 1.0 -> 3.0';



        return errors;
    }
    render() {
        const errors = this.validate(this.state.NewStaff.name, this.state.NewStaff.doB, this.state.NewStaff.startDate, this.state.NewStaff.salaryScale, this.state.NewStaff.annualLeave, this.state.NewStaff.overTime);
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-plus fa-lg"></span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input
                                        type="date"
                                        id="doB"
                                        name="doB"
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}

                                        value={this.state.doB}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.doB}</FormFeedback>

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        value={this.state.startDate}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.startDate}</FormFeedback>

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input
                                        type="select"
                                        name="department"
                                        value={this.state.department}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input
                                        type="number"
                                        id="salaryScale"
                                        name="salaryScale"
                                        value={this.state.salaryScale}
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        onBlur={this.handleBlur('salaryScale')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.salaryScale}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input
                                        type="number"
                                        id="annualLeave"
                                        name="annualLeave"
                                        value={this.state.annualLeave}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input
                                        type="number"
                                        id="overTime"
                                        name="overTime"
                                        value={this.state.overTime}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default AddStaff;