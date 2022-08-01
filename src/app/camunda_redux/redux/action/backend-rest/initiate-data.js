import * as AT from '../../constants/ActionTypes'
import { BACK_API } from '../../../../middleware/backend';
import { BACK_API1 } from '../../../../middleware/backendPA';
import { BACKEND_API_MISS } from "../../../../middleware/backendMIS";
import localStorageService from "../../../../services/localStorageService";
import { BACK_USER_MANAGEMENT_API } from "../../../../middleware/backend_userManagement";
import { BACK_CREATEPF_API } from 'app/middleware/backend_createPF'
import { BACK_CREATEPA_API } from 'app/middleware/backend_createPA'
import { BACK_UTIL_API } from 'app/middleware/backend_util'
import { BACK_ANNEXURE_API } from 'app/middleware/backend_annexure'
import { BACK_RETRIEVAL_API } from 'app/middleware/backend_retrieval'
import { NOTIFICATION_SERVICE } from 'app/middleware/notification_service'
import { BACK_PC_API } from 'app/middleware/backend_partCase'
import { URL_HIDE } from 'app/middleware/URL_hide'

export const getClassificationData = () => ({
    [BACK_API]: {
        types: [AT.CLASSIFICATION_REQUEST, AT.CLASSIFICATION_SUCCESS, AT.CLASSIFICATION_FAILURE],
        endpoint: `/api/getFileClassification`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getTypeData = () => ({
    [BACK_API]: {
        types: [AT.TYPE_REQUEST, AT.TYPE_SUCCESS, AT.TYPE_FAILURE],
        endpoint: `/api/getFileType`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getRolesData = () => ({
    [BACK_API]: {
        types: [AT.ROLES_REQUEST, AT.ROLES_SUCCESS, AT.ROLES_FAILURE],
        endpoint: `/api/getRoles`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getUserRolesData = (department) => ({
    [BACK_USER_MANAGEMENT_API]: {
        types: [AT.USER_ROLES_REQUEST, AT.USER_ROLES_SUCCESS, AT.USER_ROLES_FAILURE],
        endpoint: `/api/getUserRoles`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': department
            }
        }
    }

});

// export const getUserRolesData= (department) => ({
//     [BACKEND_API_MISS]: {
//         types: [ AT.USER_ROLES_REQUEST, AT.USER_ROLES_SUCCESS, AT.USER_ROLES_FAILURE ],
//         endpoint: `/apis/getUserRoles`,
//         settings: {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization':'Bearer '+sessionStorage .getItem('jwt_token'),
//                 'groupName': department
//             }
//         }
//     }

// });

export const getGroupsData = () => ({
    [BACK_API]: {
        types: [AT.GROUPS_REQUEST, AT.GROUPS_SUCCESS, AT.GROUPS_FAILURE],
        endpoint: `/api/getGroups`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getDraftData = (role) => ({
    [BACK_API]: {
        types: [AT.DRAFT_DATA_FAILURE, AT.DRAFT_DATA_SUCCESS, AT.DRAFT_DATA_REQUEST],
        endpoint: `/api/getDraftData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role
            }
        }
    }

});

export const getOutboxData = (role, username, pageSize, pageNumber, Date) => ({
    [BACK_RETRIEVAL_API]: {
        types: [AT.OUTBOX_DATA_REQUEST, AT.OUTBOX_DATA_SUCCESS, AT.OUTBOX_DATA_FAILURE],
        endpoint: `/api/getOutboxData`,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username,
                'pageSize': pageSize,
                'pageNumber': pageNumber,
            },
            body: JSON.stringify(Date)
        }
    }

});

export const getDataForExport = (role, username, ranges) => ({
    [BACK_RETRIEVAL_API]: {
        types: [AT.OUTBOX_DATA_EXPORT_REQUEST, AT.OUTBOX_DATA_EXPORT_SUCCESS, AT.OUTBOX_DATA_EXPORT_FAILURE],
        endpoint: `/api/exportOutboxData`,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username,
            },
            body: JSON.stringify(ranges)
        }
    }

});

export const getOutboxRow = (id) => ({
    [BACK_RETRIEVAL_API]: {
        types: [AT.OUTBOX_ROW_REQUEST, AT.OUTBOX_ROW_SUCCESS, AT.OUTBOX_ROW_FAILURE],
        endpoint: `/api/getOutbox/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});

export const getInboxData = (role, username, pageSize, pageNumber) => ({
    [BACK_RETRIEVAL_API]: {
        types: [AT.INBOX_DATA_REQUEST, AT.INBOX_DATA_SUCCESS, AT.INBOX_DATA_FAILURE],
        endpoint: `/api/getInboxData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username,
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});

export const getEnclosureData = (id) => ({
    [BACK_API]: {
        types: [AT.ENCLOSURE_DATA_FAILURE, AT.ENCLOSURE_DATA_REQUEST, AT.ENCLOSURE_DATA_SUCCESS],
        endpoint: `/api/enclosure/data/` + id,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});


export const getNotingData = (id) => ({
    [BACK_API]: {
        types: [AT.NOTING_DATA_FAILURE, AT.NOTING_DATA_REQUEST, AT.NOTING_DATA_SUCCESS],
        endpoint: `/api/noting/data/` + id,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getFileUrl = (url) => ({
    [BACK_API]: {
        types: [AT.FILE_FAILURE, AT.FILE_REQUEST, AT.FILE_SUCCESS],
        endpoint: `/api/fileUrl`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'url': url
            }
        }
    }

});

export const getSfdt = (url, username, id, role, grp) => ({
    [BACK_UTIL_API]: {
        types: [AT.SFDT_FAILURE, AT.SFDT_REQUEST, AT.SFDT_SUCCESS],
        endpoint: `/api/sfdt`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'url': url,
                'userName': username,
                'fileId': id,
                'roleName': role,
                'groupName': grp
            }
        }
    }

});


export const URLHide = (url) => ({
    [URL_HIDE]: {
        types: [AT.TEST_URL_REQUEST, AT.TEST_URL_SUCCESS, AT.TEST_URL_FAILURE],
        endpoint: `/api/url?urls=${url}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                // 'url': url,
                // 'userName': username,
                // 'roleName': role,
            }
        }
    }

});

export const getFileTypeData = () => ({
    [BACK_API]: {
        types: [AT.PATYPE_REQUEST, AT.PATYPE_SUCCESS, AT.PATYPE_FAILURE],
        endpoint: `/api/getPersonalFileType`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getPF = (username, role, pageSize, pageNumber) => ({
    [BACK_CREATEPF_API]: {
        types: [AT.PF_REQUEST, AT.PF_SUCCESS, AT.PF_FAILURE],
        endpoint: `/api/getPersonalFile`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role,
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});

export const getPFileData = (username, role) => ({
    [BACK_CREATEPF_API]: {
        types: [AT.PFILE_REQUEST, AT.PFILE_SUCCESS, AT.PFILE_FAILURE],
        endpoint: `/api/getPFile`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role
            }
        }
    }

});

export const getPATableData = (username, role, pageSize, pageNumber) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.PA_TABLE_REQUEST, AT.PA_TABLE_SUCCESS, AT.PA_TABLE_FAILURE],
        endpoint: `/api/getApplicationData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role,
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});

export const getPADashboardData = (username, role, pageSize, pageNumber) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.PA_DASHBOARD_REQUEST, AT.PA_DASHBOARD_SUCCESS, AT.PA_DASHBOARD_FAILURE],
        endpoint: `/api/getDashboardData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role,
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});

export const getAnnexureTableData = (id) => ({
    [BACK_ANNEXURE_API]: {
        types: [AT.ANNEXURE_LIST_REQUEST, AT.ANNEXURE_LIST_SUCCESS, AT.ANNEXURE_LIST_FAILURE],
        endpoint: `/api/getAnnexureData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

// export const getMISTableData = (value) => ({
//     [BACKEND_API_MISS]: {
//         types: [ AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE ],
//         endpoint: `/api/gethierarchyParent1List`,
//         settings: {
//             method: 'POST',
//             body: value,
//             headers: { }
//         }
//     }
//
// });

export const getMISTableData = (value) => ({
    [BACKEND_API_MISS]: {
        types: [AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE],
        endpoint: `/api/getSauData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value
            }
        }
    }
});
export const getMISDetailTableData = (value) => ({
    [BACKEND_API_MISS]: {
        types: [AT.MIS_DETAIL_LIST_REQUEST, AT.MIS_DETAIL_LIST_SUCCESS, AT.MIS_DETAIL_LIST_FAILURE],
        endpoint: `/api/gettotalfiles`,
        settings: {
            method: 'POST',
            body: value,
            headers: {}
        }
    }

});

export const deleteAnnexureData = (id) => ({
    [BACK_ANNEXURE_API]: {
        types: [AT.DELETE_ANNEXURE_REQUEST, AT.DELETE_ANNEXURE_SUCCESS, AT.DELETE_ANNEXURE_FAILURE],
        endpoint: `/api/deleteAnnexureData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
            }
        }
    }
});

export const rollbackAnnexureDocument = (id, value) => ({
    [BACK_ANNEXURE_API]: {
        types: [AT.ROLLBACK_PA_REQUEST, AT.ROLLBACK_PA_SUCCESS, AT.ROLLBACK_PA_FAILURE],
        endpoint: `/api/annexure/${id}`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'edit': value
            }
        }
    }
});


export const createPANotingData = (fileTrackID, roleName, userName, groupName, personName, nofFileID) => ({
    [BACK_PC_API]: {
        types: [AT.CREATE_PANOTING_REQUEST, AT.CREATE_PANOTING_SUCCESS, AT.CREATE_PANOTING_FAILURE],
        endpoint: `/api/createPartCaseFile?fileNumber=${personName}`,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': roleName,
                'username': userName,
                'grp': groupName,
                'fileTrackId': fileTrackID,
                'nofFileID': nofFileID
            }
        }
    }
});

export const getPANotingData = (id) => ({
    [BACK_API]: {
        types: [AT.FETCH_PANOTING_REQUEST, AT.FETCH_PANOTING_SUCCESS, AT.FETCH_PANOTING_FAILURE],
        endpoint: `/api/getPANotingData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getPAEnclosureData = (ids, id, role, groupName) => ({
    [BACK_API]: {
        types: [AT.FETCH_PAENCLOSURE_REQUEST, AT.FETCH_PAENCLOSURE_SUCCESS, AT.FETCH_PAENCLOSURE_FAILURE],
        endpoint: `/api/getPAEnclosureData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'inboxId': ids,
                'grp': groupName
            }
        }
    }
});

export const getPADraftTableData = (username, role, pageSize, pageNumber) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.PADRAFT_REQUEST, AT.PADRAFT_SUCCESS, AT.PADRAFT_FAILURE],
        endpoint: `/api/getApplicationData`,
        settings: {
            method: 'GET',
            
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role,
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});
export const getPersonalApplicationFileData = (pFileName, pageSize, pageNumber) => ({
    [BACK_CREATEPA_API]: {
        types: [AT.PA_FILE_DATA_REQUEST, AT.PA_FILE_DATA_SUCCESS, AT.PA_FILE_DATA_FAILURE],
        endpoint: `/api/getPersonalApplicationFileData/` + pFileName,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        }
    }

});

export const fetchSplitViewTags = (partcaseID, dept) => ({
    [BACK_PC_API]: {
        types: [AT.FETCH_PARTCASE_TAG_REQUEST, AT.FETCH_PARTCASE_TAG_SUCCESS, AT.FETCH_PARTCASE_TAG_FAILURE],
        endpoint: `/api/fetch-tags/` + partcaseID,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'grp': dept,
            }
        }
    }

});

export const getNotification = (role, username) => ({
    [NOTIFICATION_SERVICE]: {
        types: [AT.GET_NOTIFICATION_REQUEST, AT.GET_NOTIFICATION_SUCCESS, AT.GET_NOTIFICATION_FAILURE],
        endpoint: `/api/notification`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'rolename': role,
                "username": username
            }
        }
    }
});

export const notificationStatus = (role, username) => ({
    [NOTIFICATION_SERVICE]: {
        types: [AT.STATUS_NOTIFICATION_REQUEST, AT.STATUS_NOTIFICATION_SUCCESS, AT.STATUS_NOTIFICATION_FAILURE],
        endpoint: `/api/notification/change-status`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'rolename': role,
                "username": username
            }
        }
    }
});

export const deleteNotification = (role, id) => ({
    [NOTIFICATION_SERVICE]: {
        types: [AT.DELETE_NOTIFICATION_REQUEST, AT.DELETE_NOTIFICATION_SUCCESS, AT.DELETE_NOTIFICATION_FAILURE],
        endpoint: `/api/delete_notification/` + id,
        settings: {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                // 'role': role,
            }
        }
    }

});

export const deleteAllNotification = (role, username) => ({
    [NOTIFICATION_SERVICE]: {
        types: [AT.DELETE_ALL_NOTIFICATION_REQUEST, AT.DELETE_ALL_NOTIFICATION_SUCCESS, AT.DELETE_ALL_NOTIFICATION_FAILURE],
        endpoint: `/api/delete_all_notification/`,
        settings: {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'rolename': role,
                'username': username,
            }
        }
    }

});