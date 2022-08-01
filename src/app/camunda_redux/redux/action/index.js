import * as ProcessDefinitionActions from './camunda-rest/process-definition';
import * as TaskActions from './camunda-rest/task';
import * as InitiateActions from './backend-rest/initiate-data';
import * as FormDataAction from './backend-rest/form-data';
import { MYINFO_CHANGE, THEME_CHANGE } from '../constants/ActionTypes';

export const loadTasks = () => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTasks())
};

export const getPersonalInfo = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.getPersonalInfo(values));
};

export const updatePersonalInfo = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.updatePersonalInfo(values));
};

export const loadTaskFormKey = (taskId) => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTaskFormKey(taskId))
};

export const completeTask = (taskId, values) => (dispatch, getState) => {
    return dispatch(TaskActions.postCompleTask(taskId, values))
};

export const loadProcessDefinitions = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitions(processDefinitionId))
};

export const loadProcessDefinitionsWithXML = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitions(processDefinitionId)).then((data) => {
        data.response.result.forEach((id) => {
            dispatch(ProcessDefinitionActions.fetchProcessDefinitionXML(id))
        });

    })
};

export const loadProcessDefinitionXML = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitionXML(processDefinitionId))
};

export const loadFormKey = (processDefinitionKey) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchFormKey(processDefinitionKey))
};

export const startProcessInstance = (processDefinitionKey, values) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.postProcessInstance(processDefinitionKey, values))
};

export const loadTaskVariables = (taskId, variableNames) => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTaskVariables(taskId, variableNames))
};

export const loadClassificationData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getClassificationData())
};

export const loadTypesData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getTypeData())
};
export const loadFileTypesData = (role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getFileTypeData(role))
};

export const loadGroupsData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getGroupsData())
};

export const loadRolesData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getRolesData())
};

export const loadDraftData = (role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getDraftData(role))
};

export const loadOutboxData = (role, username, pageSize, pageNumber, Date) => (dispatch, getState) => {
    return dispatch(InitiateActions.getOutboxData(role, username, pageSize, pageNumber, Date))
};

export const getDataForExport = (role, username, ranges) => (dispatch, getState) => {
    return dispatch(InitiateActions.getDataForExport(role, username, ranges))
};

export const loadOutboxRow = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getOutboxRow(id))
};

export const loadInboxData = (role, username, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getInboxData(role, username, pageSize, pageNumber))
};

export const loadEnclosureData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getEnclosureData(id))
};

export const loadNotingData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getNotingData(id))
};

export const downloadFile = (url) => (dispatch, getState) => {
    return dispatch(InitiateActions.getFileUrl(url))
};

export const createFormData = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.setCreateForm(values))
};

export const uploadEnclosure = (id, file, config, grp) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadEnclosure(id, file, config, grp))
};

export const uploadNoting = (id, file, role, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadNoting(id, file, role, username))
};

export const sendFile = (id, data, role) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFile(id, data, role))
};

export const loadInstanceVariables = (id) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.postProcessInstanceVariables(id))
};

export const loadSfdt = (url, username, id, role, dept) => (dispatch, getState) => {
    return dispatch(InitiateActions.getSfdt(url, username, id, role, dept))
};

export const URLHide = (url) => (dispatch, getState) => {
    return dispatch(InitiateActions.URLHide(url))
};

export const personalFileFormData = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.createPersonalFileForm(values))
};
export const personalApplicationFormData = (values, role, grp) => (dispatch, getState) => {
    return dispatch(FormDataAction.createPersonalApplicationForm(values, role, grp))
};

export const updateSubjectApplicationForm = (subject, id) => (dispatch, getState) => {
    return dispatch(FormDataAction.updateSubjectApplicationForm(subject, id))
};

export const loadPFData = (username, role, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPF(username, role, pageSize, pageNumber))
};

export const loadPFileData = (username, role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPFileData(username, role))
};
export const loadPATableData = (username, role, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPATableData(username, role, pageSize, pageNumber))
};

export const getPADashboardData = (username, role, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPADashboardData(username, role, pageSize, pageNumber))
};

export const quickSign = (value, role, flagNum, annexureSign, annexureId, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.quickSign(value, role, flagNum, annexureSign, annexureId, pfileName));
};

export const sendFiles = (id, data, role, username, displayUserName, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFiles(id, data, role, username, displayUserName, pfileName))
};

export const addToFavourite = (data, role, type) => (dispatch, getState) => {
    return dispatch(FormDataAction.addToFavourite(data, role, type))
};

export const fetchFavouriteList = (role) => (dispatch, getState) => {
    return dispatch(FormDataAction.fetchFavouriteList(role))
};

export const deleteFavourite = (data, role, type) => (dispatch, getState) => {
    return dispatch(FormDataAction.deleteFavourite(data, role, type))
};

export const sendFilesSection = (id, data, value, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFilesSection(id, data, value, pfileName))
};

export const sendFilesServiceNumber = (id, data, value, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFilesServiceNumber(id, data, value, pfileName))
};

export const sendFilesInternalServiceNumber = (id, data, value, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFilesInternalServiceNumber(id, data, value, pfileName))
};

export const saveDocument = (id, formData, role, userName, isPartCase, fileUrl, isAnnexure) => (dispatch, getState) => {
    return dispatch(FormDataAction.saveFiles(id, formData, role, userName, isPartCase, fileUrl, isAnnexure))
};

export const saveAnnotation = (values, id, flag, flagNumber) => (dispatch, getState) => {
    return dispatch(FormDataAction.createAnnotation(values, id, flag, flagNumber))
};

export const getAnnotation = (id) => (dispatch, getState) => {
    return dispatch(FormDataAction.getAnnotation(id))
};

export const uploadAnnexure = (personalAppId, file, role, username, onUploadProgress) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadAnnexure(personalAppId, file, role, username, onUploadProgress))
};

export const getGroupList = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getGroupList(value))
};

export const getHrmListData = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getHrmFileList(value))
};

export const getPAWithAnnexureList = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getPAWithAnnexureList(value))
};

export const loadAnnexureTableData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getAnnexureTableData(id))
};

export const loadUserRoleData = (department) => (dispatch, getState) => {
    return dispatch(InitiateActions.getUserRolesData(department))
};

export const getMISTableList = (value) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableData(value))
};

export const getMISDetailTableList = (value) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableData(value))
};

export const deleteAnnexureData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.deleteAnnexureData(id))
};

export const createPANotingData = (fileTrackID, roleName, userName, groupName, personName, nofFileID) => (dispatch, getState) => {
    return dispatch(InitiateActions.createPANotingData(fileTrackID, roleName, userName, groupName, personName, nofFileID))
};

export const getPANotingData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPANotingData(id))
};

export const getPAEnclosureData = (ids, id, role, groupName) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPAEnclosureData(ids, id, role, groupName))
};
export const getbyfilename = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.getbyfilename(values))
};
export const getSection = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getSection(value))
};
export const getServiceNumber = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getServiceNumber(value))
};
export const getInternalServiceNumber = (value, groupName) => (dispatch, getState) => {
    return dispatch(FormDataAction.getInternalServiceNumber(value, groupName))
};
export const loadPADraftTableData = (username, role, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPADraftTableData(username, role, pageSize, pageNumber))
};
export const loadPartCaseData = (data) => (dispatch, getState) => {
    return dispatch(FormDataAction.getPartCaseData(data))
};

export const loadInboxDataSplitView = (id, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.getSplitViewInboxData(id, username))
};
export const getPersonalApplicationFileData = (pFileName, pageSize, pageNumber) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPersonalApplicationFileData(pFileName, pageSize, pageNumber))
};
export const savePartCaseTag = (partcaseID, data) => (dispatch, getState) => {
    return dispatch(FormDataAction.savePartCaseTag(partcaseID, data))
};
export const fetchSplitViewTags = (partcaseID, dept) => (dispatch, getState) => {
    return dispatch(InitiateActions.fetchSplitViewTags(partcaseID, dept))
};
export const createPartCaseNotingFile = (partcaseID, groupName) => (dispatch, getState) => {
    return dispatch(FormDataAction.createPartCaseNotingFile(partcaseID, groupName))
};
export const createCoverLetter = (partcaseID, groupName,) => (dispatch, getState) => {
    return dispatch(FormDataAction.createCoverLetter(partcaseID, groupName,))
};

export const PCFileClosuer = (inboxID, status, pfileName) => (dispatch, getState) => {
    return dispatch(FormDataAction.PCFileClosuer(inboxID, status, pfileName))
};
export const getHistory = (type, id) => (dispatch, getState) => {
    return dispatch(FormDataAction.getHistory(type, id))
};
export const changeTheme = (value) => dispatch => {
    return dispatch({ type: THEME_CHANGE, payload: value })
}

export const myInfo = (value) => dispatch => {
    return dispatch({ type: MYINFO_CHANGE, payload: value })
}

export const rollbackPADocument = (id) => (dispatch, getState) => {
    return dispatch(FormDataAction.rollbackPADocument(id))
};
export const rollbackSplitViewDocument = (id, flagNumber) => (dispatch, getState) => {
    console.log(id, flagNumber)
    return dispatch(FormDataAction.rollbackSplitViewDocument(id, flagNumber))
};
export const rollbackSplitViewEnclosureDocument = (id, flagNumber) => (dispatch, getState) => {
    console.log(id, flagNumber)
    return dispatch(FormDataAction.rollbackSplitViewEnclosureDocument(id, flagNumber))
};


export const rollbackAnnexureDocument = (id, value) => (dispatch, getState) => {
    return dispatch(InitiateActions.rollbackAnnexureDocument(id, value))
};

export const getNotification = (role, username) => (dispatch, getState) => {
    return dispatch(InitiateActions.getNotification(role, username))
};

export const notificationStatus = (role, username) => (dispatch, getState) => {
    return dispatch(InitiateActions.notificationStatus(role, username))
};

export const deleteNotification = (role, id) => (dispatch, getState) => {
    return dispatch(InitiateActions.deleteNotification(role, id))
};

export const deleteAllNotification = (role, username) => (dispatch, getState) => {
    return dispatch(InitiateActions.deleteAllNotification(role, username))
};

export const returnPA = (id, group) => (dispatch, getState) => {
    return dispatch(FormDataAction.returnPA(id, group))
};