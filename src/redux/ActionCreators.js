import * as ActionTypes from './ActionTypes';
import { apiServicePost, apiServiceGet, apiServicePut, apiServiceDelete, apiServicePatch } from '../shared/ApiService';

const USERLOGINURL = '/login';
const FETCHEMPLOYEESURL = '/fetchEmployees';
const ADDEMPLOYEE = '/addEmployee';
const DELETEEMPLOYEE = '/deleteEmployee';
const FETCHEMPLOYEEBYID = '/fetchEmployeeByID';
const UPDATEEMPLOYEE = '/updateEmployee';
const FETCHREVIEW = '/fetchReview';
const UPDATEREVIEW = '/updateReview';
const ADDREVIEW = '/addReview';
const FETCHEMPREVIEWS ='/fetchEmpReviews';
const FETCHFEEDBACK = '/fetchFeedback';
const UPDATEFEEDBACK = '/updateFeedback';
const ADDFEEDBACK = '/addFeedback';

export const onRoleChange = (role) => ({
    type: ActionTypes.ROLE_CHANGE,
    payload: role
})

export const onIDChange = (id) => ({
    type: ActionTypes.LOGIN_ID_CHANGE,
    payload: id
})

export const onPasswordChange = (password) => ({
    type: ActionTypes.PASSWORD_CHANGE,
    payload: password
})

export const authenticateUser = (authenticationData) => ({
    type: ActionTypes.AUTHENTICATE_USER,
    payload: authenticationData
})

export const userLogin = (role, id, password) => (dispatch) => {

    const credentials = {
        role: role,
        id: id,
        password: password
    }
    return apiServicePost(USERLOGINURL, credentials)
    .then(authenticationData => dispatch(authenticateUser(authenticationData)));
}

export const userLogout = ()=> ({
    type: ActionTypes.LOGOUT_USER
})

export const setEmployeesData = (employeesData) => ({
    type: ActionTypes.FETCH_EMPLOYEES,
    payload: employeesData
})

export const fetchEmployees = () => (dispatch) => {
    return apiServiceGet(FETCHEMPLOYEESURL)
    .then(employeesData => dispatch(setEmployeesData(employeesData)));
}

export const addEmployee = (employeeData) => (dispatch) => {
    return apiServicePut(ADDEMPLOYEE, employeeData)
    .then(data => dispatch(fetchEmployees()));
}

export const deleteEmployee = (deleteID) => (dispatch) => {
    return apiServiceDelete(DELETEEMPLOYEE, deleteID)
    .then(data => dispatch(fetchEmployees()));
}

export const setEmployeeByID = (data) => ({
    type: ActionTypes.SET_EMPLOYEE_BY_ID,
    payload: data
})

export const fetchEmployeeByID = (id) => (dispatch) => {
    let reqBody = {
        id: id
    };
    return apiServicePost(FETCHEMPLOYEEBYID, reqBody)
    .then(data => dispatch(setEmployeeByID(data)));
}

export const updateEmployee = (updatedData) => (dispatch) => {
    return apiServicePatch(UPDATEEMPLOYEE, updatedData)
    .then(data => dispatch(fetchEmployees()));
}

export const updateEmpRole = (role) => ({
    type: ActionTypes.UPDATE_EMPLOYEE_ROLE,
    payload: role
})

export const updateEmpDescription = (description) => ({
    type: ActionTypes.UPDATE_EMPLOYEE_DESCRIPTION,
    payload: description
})

export const setReview = (review) => ({
    type: ActionTypes.SET_REVIEW,
    payload: review
})

export const setInitialReview = (review) => ({
    type: ActionTypes.SET_INITIAL_REVIEW,
    payload: review
})

export const fetchReview = (reviewGivenBy, reviewGivenTo) => (dispatch) => {
    let reqBody = {
        givenBy: reviewGivenBy,
        givenTo: reviewGivenTo
    }

    return apiServicePost(FETCHREVIEW, reqBody)
    .then(data => dispatch(setInitialReview(data.review)));
}

export const updateReview = (reqBody) => (dispatch) => {
    return apiServicePatch(UPDATEREVIEW, reqBody)
    .then(data => dispatch(setReview(reqBody.review)));
}

export const addReview = (reqBody) => (dispatch) => {
    return apiServicePut(ADDREVIEW, reqBody)
    .then(data => dispatch(setReview(reqBody.review)))
}

export const setEmpReviews = (reviewsData) => ({
    type: ActionTypes.SET_REVIEWS_DATA,
    payload: reviewsData
}) 

export const fetchEmpReviews = (eID) => (dispatch) => {
    let reqBody = {
        eID: eID
    }
    return apiServicePost(FETCHEMPREVIEWS, reqBody)
    .then(data=> dispatch(setEmpReviews(data)))
}

export const setFeedback = (feedback) => ({
    type: ActionTypes.SET_FEEDBACK,
    payload: feedback
})

export const setInitialFeedback = (feedback) => ({
    type: ActionTypes.SET_INITIAL_FEEDBACK,
    payload: feedback
})

export const fetchFeedback = (feedbackGivenBy, feedbackGivenTo) => (dispatch) => {
    let reqBody = {
        givenBy: feedbackGivenBy,
        givenTo: feedbackGivenTo
    }

    return apiServicePost(FETCHFEEDBACK, reqBody)
    .then(data => dispatch(setInitialFeedback(data.feedback)));
}

export const updateFeedback = (reqBody) => (dispatch) => {
    return apiServicePatch(UPDATEFEEDBACK, reqBody)
    .then(data => dispatch(setFeedback(reqBody.feedback)));
}

export const addFeedback = (reqBody) => (dispatch) => {
    return apiServicePut(ADDFEEDBACK, reqBody)
    .then(data => dispatch(setFeedback(reqBody.feedback)))
}