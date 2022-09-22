import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Shared/baseUrl'



//POST Staff

export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    const newStaff = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime
    }
    newStaff.image = '/assets/images/alberto.png'
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addStaffs(response)))
        .catch(error => {
            console.log('Post Staff', error.message);
            alert('Your staff could not be posted\nError: ' + error.message)
        })
}


//Edit Staff
export const editStaff = (id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    const editStaff = {
        id: id,
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime
    }
    editStaff.image = '/assets/images/alberto.png'

    return fetch(baseUrl + 'staffs/', {
        method: 'PATCH',
        body: JSON.stringify(editStaff),
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
    })
        .then(response => {
            if (response.ok)
                return response
            else {
                var error = new Error('Error' + response.status + ':' + response.statusText)
                error.response = response;
                throw error
            }
        },
            (error) => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => { dispatch(addStaffs(response)) })
        .catch((error) => {
            console.log("ERROR MESSAGE " + error.message);
            alert("Your staff could not be editted\nError: " + error.message);
        })
}

//Delete Staff

export const deleteStaff = (id) => (dispatch) => {

    return fetch(baseUrl + 'staffs/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'

    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response));
            window.location.replace("/staffs")
        })
        .catch(error => {
            console.log('DELETE Staff', error.message);
            alert('Your staff could not be deleted\nError: ' + error.message)
        })
}


//Call API staffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffs')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)))
}
export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});
export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})
export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})

//Call API Departments
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));
    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)))
}
export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});
export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})
export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})


//Call API Staff Salary
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));
    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(staffsSalaryFailed(error.message)))
}
export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING
});
export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
})
export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
})
