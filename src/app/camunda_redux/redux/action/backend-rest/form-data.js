import * as AT from '../../constants/ActionTypes';
import { BACK_API } from '../../../../middleware/backend';
import { BACK_API1 } from '../../../../middleware/backendPA'
import { BACKEND_API_SAU } from "../../../../middleware/backendSau";
import { BACK_API_AXIOS } from "../../../../middleware/backend_axios";
import { BACK_USER_MANAGEMENT_API } from "../../../../middleware/backend_userManagement";
import { BACK_CREATEPF_API } from "../../../../middleware/backend_createPF";
import { BACK_PERSONAL_INFO_API } from "../../../../middleware/backend_personalinfo";
import { BACK_CREATEPA_API } from 'app/middleware/backend_createPA'
import { BACK_SIGN_API } from 'app/middleware/backend_sign'
import { BACK_MICROPROJECT_API } from 'app/middleware/backend_microproject'
import { BACK_SEND_API } from 'app/middleware/backend_send'
import { BACK_UTIL_API } from 'app/middleware/backend_util'
import { BACK_HRM_API } from 'app/middleware/backend_hrm'
import { BACK_PC_API } from 'app/middleware/backend_partCase'
import { BACK_ANNOTATION_API } from 'app/middleware/backend_annotation'
import { BACK_FORWARD_API } from 'app/middleware/backend_forward'
import { BACK_HISTORY_API } from 'app/middleware/backend_history'
import { BACK_CAMUNDA_PA_API } from 'app/middleware/backend_camunda_pa'
import { BACK_MERGE_PC_API } from 'app/middleware/backend_merge_pc'
import { BACK_API_AXIOS_ENCLOSURE } from '../../../../middleware/backend_enclosure_axios';

let role = sessionStorage.getItem("role");
let username = sessionStorage.getItem("username");
/*const userData = JSON.parse(userDataParse);*/

export const setCreateForm = (values) => ({
    [BACK_API]: {
        types: [AT.INITIATE_FORM_CREATE_REQUEST, AT.INITIATE_FORM_CREATE_SUCCESS, AT.INITIATE_FORM_CREATE_FAILURE],
        endpoint: `/api/createFile`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')

            }
        }
    }

});
export const getPersonalInfo = (values) => ({
    [BACK_PERSONAL_INFO_API]: {
        types: [AT.GET_PERSONAL_SUCCESS, AT.GET_PERSONAL_REQUEST, AT.GET_PERSONAL_FAILURE],
        endpoint: `/api/getPersonalInfo`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')

            }
        }
    }

});
export const updatePersonalInfo = (values) => ({
    [BACK_PERSONAL_INFO_API]: {
        types: [AT.UPDATE_PERSONAL_SUCCESS, AT.UPDATE_PERSONAL_REQUEST, AT.UPDATE_PERSONAL_FAILURE],
        endpoint: `/api/updatePersonalInfo`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')

            }
        }
    }

});

export const uploadEnclosure = (id, file, config, grp) => ({
    [BACK_API_AXIOS_ENCLOSURE]: {
        types: [AT.ENCLOSURE_FILE_FAILURE, AT.ENCLOSURE_FILE_REQUEST, AT.ENCLOSURE_FILE_SUCCESS],
        endpoint: `/api/addEnclosure/${id}`,
        settings: {
            method: 'post',
            body: file,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'group': grp
            },
        },
        config
    }
});

export const uploadNoting = (id, file, role, username) => ({
    [BACK_API]: {
        types: [AT.NOTING_FILE_FAILURE, AT.NOTING_FILE_REQUEST, AT.NOTING_FILE_SUCCESS],
        endpoint: `/api/upload/noting/file/` + id,

        settings: {
            method: 'post',
            body: file,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }
});


export const sendFile = (id, data, role) => ({
    [BACK_API]: {
        types: [AT.SEND_FILE_FAILURE, AT.SEND_FILE_REQUEST, AT.SEND_FILE_SUCCESS],
        endpoint: `/api/sendFile/` + id + `/` + false,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role
            }
        }
    }
});

export const createPersonalFileForm = (values) => ({
    [BACK_CREATEPF_API]: {
        types: [AT.CREATE_PF_REQUEST, AT.CREATE_PF_SUCCESS, AT.CREATE_PF_FAILURE],
        endpoint: `/api/createFile`,
        settings: {
            method: 'post',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': values.userName
            }
        }
    }

});

export const getAnnotation = (id) => ({
    [BACK_ANNOTATION_API]: {
        types: [AT.GET_ANNOT_SUCCESS, AT.GET_ANNOT_REQUEST, AT.GET_ANNOT_FAILURE],
        endpoint: `/api/getAnnotation/` + id,
        settings: {
            method: 'get',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),

            }
        }
    }

});

export const createAnnotation = (values, id, flag, flagNumber) => ({
    [BACK_ANNOTATION_API]: {
        types: [AT.ANNOT_SUCCESS, AT.ANNOT_REQUEST, AT.ANNOT_FAILURE],
        endpoint: `/api/uploadAnnotation/` + id,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'flag': flag,
                'flagNumber': flagNumber,
            }
        }
    }

});

export const createPersonalApplicationForm = (values, role, grp) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.PA_REQUEST, AT.PA_SUCCESS, AT.PA_FAILURE],
        endpoint: `/api/createApplication`,
        settings: {
            method: 'post',
            body: JSON.stringify({ ...values, roleName: role }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'grp': grp,
                'userName': values.userName
            }
        }
    }

});

export const updateSubjectApplicationForm = (subject, id) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.UPDATE_SUBJECT_DRAFT_REQUEST, AT.UPDATE_SUBJECT_DRAFT_SUCCESS, AT.UPDATE_SUBJECT_DRAFT_FAILURE],
        endpoint: `/api/changeSubject`,
        settings: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'subject': subject,
                'id': id
            }
        }
    }
});

export const sendFiles = (id, data, role, username, displayUserName, pfileName) => ({
    [BACK_SEND_API]: {
        types: [AT.SEND_FILES_FAILURE, AT.SEND_FILES_REQUEST, AT.SEND_FILES_SUCCESS],
        endpoint: `/api/sendFiles/${id}/${false}`,

        settings: {
            method: 'post',
            body: JSON.stringify({
                group: data,
                comment: "comment",
                status: "sent",
                nonOfficeUser: false,
                userName: username,
                roleName: role,
                fileId: id,
                priority: "",
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username,
                'displayUsername': displayUserName,
                'pfileName': pfileName
            }
        }
    }
});

export const addToFavourite = (data, role, type) => ({
    [BACK_SEND_API]: {
        types: [AT.ADD_TO_FAVOURITE_FAILURE, AT.ADD_TO_FAVOURITE_REQUEST, AT.ADD_TO_FAVOURITE_SUCCESS],
        endpoint: `/api/add_to_favourite/${type}`,

        settings: {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'role': role,
                'data': data
            }
        }
    }
});

export const fetchFavouriteList = (role) => ({
    [BACK_SEND_API]: {
        types: [AT.FETCH_FAVOURITE_LIST_FAILURE, AT.FETCH_FAVOURITE_LIST_REQUEST, AT.FETCH_FAVOURITE_LIST_SUCCESS],
        endpoint: `/api/fetch_favourite`,

        settings: {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'role': role,
            }
        }
    }
});

export const deleteFavourite = (data, role, type) => ({
    [BACK_SEND_API]: {
        types: [AT.DELETE_FAVOURITE_FAILURE, AT.DELETE_ANNEXURE_REQUEST, AT.DELETE_ANNEXURE_SUCCESS],
        endpoint: `/api/delete_favourite/${type}`,

        settings: {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'role': role,
                'data': data
            }
        }
    }
});

export const saveFiles = (id, data, role, userName, isPartCase, fileUrl, isAnnexure) => ({
    [BACK_UTIL_API]: {
        types: [AT.SAVE_FILES_REQUEST, AT.SAVE_FILES_SUCCESS, AT.SAVE_FILES_FAILURE],
        endpoint: `/api/saveDocument/` + id,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': userName,
                'isPartCase': isPartCase,
                'fileUrl': fileUrl,
                'isAnnexure': isAnnexure
            }
        }
    }
});

export const uploadAnnexure = (personalAppId, file, role, username, onUploadProgress) => ({
    [BACK_API_AXIOS]: {
        types: [AT.ANNEXURE_FILE_REQUEST, AT.ANNEXURE_FILE_SUCCESS, AT.ANNEXURE_FILE_FAILURE],
        endpoint: `/api/upload/annexure/file/` + personalAppId,
        body: file,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            'roleName': role,
            'userName': username
        },
        onUploadProgress
    }
});

export const getbyfilename = (value) =>
({
    [BACKEND_API_SAU]: {
        types: [AT.HRM_SAU_REQUEST, AT.HRM_SAU_SUCCESS, AT.HRM_SAU_FAILURE],
        endpoint: `/saufileszip/getbyfilename`,

        settings: {
            method: 'post',
            body: value,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});
export const quickSign = (value, role, flagNum, annexureSign, annexureId, pfileName) =>
({
    [BACK_SIGN_API]: {
        types: [AT.QICK_SIGN_REQUEST, AT.QICK_SIGN_SUCCESS, AT.QICK_SIGN_FAILURE],
        endpoint: `/api/sign`,

        settings: {
            method: 'post',
            body: value,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'flagNumber': flagNum,
                'annexureSign': annexureSign,
                'annexureId': annexureId,
                'pfileName': pfileName
            }
        }
    }
});


export const getGroupList = (value) => ({
    [BACK_MICROPROJECT_API]: {
        types: [AT.GROUP_LIST_REQUEST, AT.GROUP_LIST_SUCCESS, AT.GROUP_LIST_FAILURE],
        endpoint: `/causaumapping/getsaudisplay`,

        settings: {
            method: 'post',
            body: value,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});

export const getHrmFileList = (value) => ({
    [BACK_HRM_API]: {
        types: [AT.HRM_LIST_REQUEST, AT.HRM_LIST_SUCCESS, AT.HRM_LIST_FAILURE],
        endpoint: `/api/getHrm`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'inboxId': value
            }
        }
    }
});

export const getPAWithAnnexureList = (value) => ({
    [BACK_HRM_API]: {
        types: [AT.FETCH_PAWITHANNEXURE_REQUEST, AT.FETCH_PAWITHANNEXURE_SUCCESS, AT.FETCH_PAWITHANNEXURE_FAILURE],
        endpoint: `/api/getAnnexurelist`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'paId': value
            }
        }
    }
});

export const getSection = (value) => ({
    [BACK_USER_MANAGEMENT_API]: {
        types: [AT.FETCH_SECTION_REQUEST, AT.FETCH_SECTION_SUCCESS, AT.FETCH_SECTION_FAILURE],
        endpoint: `/api/getSection`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'section': value
            }
        }
    }
});

export const getServiceNumber = (value) => ({
    [BACK_USER_MANAGEMENT_API]: {
        types: [AT.FETCH_SERVICENUMBER_REQUEST, AT.FETCH_SERVICENUMBER_SUCCESS, AT.FETCH_SERVICENUMBER_FAILURE],
        endpoint: `/api/getServiceNumber`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': value
            }
        }
    }
});

export const getInternalServiceNumber = (value, groupName) => ({
    [BACK_USER_MANAGEMENT_API]: {
        types: [AT.FETCH_INTERNALSERVICENUMBER_REQUEST, AT.FETCH_INTERNALSERVICENUMBER_SUCCESS, AT.FETCH_INTERNALSERVICENUMBER_FAILURE],
        endpoint: `/api/getInternalServiceNumber`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': value,
                'grp': groupName
            }
        }
    }
});

export const sendFilesSection = (id, data, value, pfileName) => ({
    [BACK_FORWARD_API]: {
        types: [AT.SENDFILESECTION_REQUEST, AT.SENDFILESECTION_SUCCESS, AT.SENDFILESECTION_FAILURE],
        endpoint: `/api/sendFilesSection/` + id,

        settings: {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': data.roleName,
                'group': data.groupName,
                'fromroleName': data.fromRole,
                'displayDeptName': data.displayDeptName,
                'displayRoleName': data.displayRoleName,
                'coverLetter': value,
                'pfileName': pfileName
            }
        }
    }
});

export const sendFilesServiceNumber = (id, data, value, pfileName) => ({
    [BACK_FORWARD_API]: {
        types: [AT.SENDFILESERVICENUMBER_REQUEST, AT.SENDFILESERVICENUMBER_SUCCESS, AT.SENDFILESERVICENUMBER_FAILURE],
        endpoint: `/api/sendFilesServiceNumber/` + id,

        settings: {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': data.roleName,
                'userName': data.userName,
                'group': data.groupName,
                'fromroleName': data.fromRole,
                'displayDeptName': data.displayDeptName,
                'displayRoleName': data.displayRoleName,
                'coverLetter': value,
                'pfileName': pfileName
            }
        }
    }
});

export const sendFilesInternalServiceNumber = (id, data, value, pfileName) => ({
    [BACK_FORWARD_API]: {
        types: [AT.SENDFILEINTERNALSERVICENUMBER_REQUEST, AT.SENDFILEINTERNALSERVICENUMBER_SUCCESS, AT.SENDFILEINTERNALSERVICENUMBER_FAILURE],
        endpoint: `/api/sendFilesInternalServiceNumber/` + id,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': data.roleName,
                'userName': data.userName,
                'group': data.groupName,
                'fromroleName': data.fromRole,
                'displayDeptName': data.displayDeptName,
                'displayRoleName': data.displayRoleName,
                'coverLetter': value,
                'pfileName': pfileName
            }
        }
    }
});

export const getPartCaseData = (data) => ({
    [BACK_PC_API]: {
        types: [AT.PART_CASE_DATA_REQUEST, AT.PART_CASE_DATA_SUCCESS, AT.PART_CASE_DATA_FAILURE],
        endpoint: `/api/getPartCaseData`,

        settings: {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getSplitViewInboxData = (id, username) => ({
    [BACK_PC_API]: {
        types: [AT.SPLITVIEW_INBOXDATA_REQUEST, AT.SPLITVIEW_INBOXDATA_SUCCESS, AT.SPLITVIEW_INBOXDATA_FAILURE],
        endpoint: `/api/getInboxDataSplitView/` + id,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                "username": username
            }
        }
    }
});

export const savePartCaseTag = (partcaseID, data) => ({
    [BACK_PC_API]: {
        types: [AT.PARTCASE_TAG_REQUEST, AT.PARTCASE_TAG_SUCCESS, AT.PARTCASE_TAG_FAILURE],
        endpoint: `/api/add-tags/` + partcaseID,

        settings: {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});

export const createPartCaseNotingFile = (partcaseID, groupName) => ({
    [BACK_PC_API]: {
        types: [AT.CREATE_PARTCASE_NOTING_REQUEST, AT.CREATE_PARTCASE_NOTING_SUCCESS, AT.CREATE_PARTCASE_NOTING_FAILURE],
        endpoint: `/api/createPartCaseNotingFile`,
        settings: {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'grp': groupName,
                'pcId': partcaseID
            }
        }
    }
});

export const createCoverLetter = (partcaseID, groupName,) => ({
    [BACK_PC_API]: {
        types: [AT.CREATE_COVER_LETTER_REQUEST, AT.CREATE_COVER_LETTER_SUCCESS, AT.CREATE_COVER_LETTER_FAILURE],
        endpoint: `/api/addCoverLetter/${partcaseID}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'rolename': groupName,
            }
        }
    }
});

export const PCFileClosuer = (inboxID, status, pfileName) => ({
    [BACK_MERGE_PC_API]: {
        types: [AT.UPDATE_PARTCASE_STATUS_REQUEST, AT.UPDATE_PARTCASE_STATUS_SUCCESS, AT.UPDATE_PARTCASE_STATUS_FAILURE],
        endpoint: `/api/fileClosure`,
        settings: {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'inboxId': inboxID,
                'Status': status,
                'pfileName': pfileName
            }
        }
    }
});

export const getHistory = (type, id) => ({
    [BACK_HISTORY_API]: {
        types: [AT.FETCH_HISTORY_REQUEST, AT.FETCH_HISTORY_SUCCESS, AT.FETCH_HISTORY_FAILURE],
        endpoint: `/api/gethistory/${type}/${id}`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const rollbackPADocument = (id) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.ROLLBACK_PA_REQUEST, AT.ROLLBACK_PA_SUCCESS, AT.ROLLBACK_PA_FAILURE],
        endpoint: `/api/getEditedFile/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});

export const rollbackSplitViewDocument = (id, flagNumber) => ({
    [BACK_PC_API]: {
        types: [AT.ROLLBACK_PA_REQUEST, AT.ROLLBACK_PA_SUCCESS, AT.ROLLBACK_PA_FAILURE],
        endpoint: `/api/getEditedFile/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'flagNumber': flagNumber
            }
        }
    }
});

export const rollbackSplitViewEnclosureDocument = (id, flagNumber) => ({
    [BACK_PC_API]: {
        types: [AT.ROLLBACK_PA_REQUEST, AT.ROLLBACK_PA_SUCCESS, AT.ROLLBACK_PA_FAILURE],
        endpoint: `/api/getEditedEnclosure/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'flagNumber': flagNumber
            }
        }
    }
});

export const returnPA = (id, group) => ({
    [BACK_SEND_API]: {
        types: [AT.RETURN_PA_REQUEST, AT.RETURN_PA_SUCCESS, AT.RETURN_PA_FAILURE],
        endpoint: `/api/return-pa/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'group': group
            }
        }
    }
});