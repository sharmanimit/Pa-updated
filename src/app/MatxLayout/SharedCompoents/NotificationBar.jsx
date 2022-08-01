// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Icon,
// //   Badge,
// //   MuiThemeProvider,
// //   Card,
// //   Button,
// //   IconButton,
// //   Drawer,
// //   Fab, Tooltip
// // } from "@material-ui/core";
// // import { Link } from "react-router-dom";
// // import { withStyles } from "@material-ui/styles";
// // import { getTimeDifference } from "utils.js";
// // import { PropTypes } from "prop-types";
// // import { connect, useDispatch, useSelector } from "react-redux";
// // import {
// //   // getNotification,
// //   // deleteAllNotification,
// //   // deleteNotification
// // } from "../../redux/actions/NotificationActions";

// // import { getNotification, notificationStatus, deleteNotification, deleteAllNotification } from '../../camunda_redux/redux/action';
// // import { setSnackbar } from '../../camunda_redux/redux/ducks/snackbar';
// // import { useTranslation } from "react-i18next";
// // import ClearIcon from '@material-ui/icons/Clear';
// // import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// // import { notificationFun } from "../../camunda_redux/redux/ducks/notification";
// // import moment from "moment";

// // function NotificationBar(props) {
// //   const {
// //     container,
// //     theme,
// //     settings,
// //     // notification: notifcationList = [],
// //     // getNotification,
// //     // deleteAllNotification,
// //     // deleteNotification
// //   } = props;
// //   const { t } = useTranslation()
// //   const dispatch = useDispatch();
// //   const [panelOpen, setPanelOpen] = useState(false);
// //   const [notifcationList, setnotifcationList] = useState([
// //     // {
// //     //   id: 1,
// //     //   path: 'eoffice/inbox/file',
// //     //   title: 'This is Title',
// //     //   subtitle: 'This is Subtitle',
// //     //   timestamp: '',
// //     //   heading: '',
// //     //   icon: {
// //     //     color: "#000",
// //     //     name: 'remove'
// //     //   }
// //     // },
// //   ])
// //   const { notificationLength } = useSelector(state => state.notificationFun);
// //   const role = sessionStorage.getItem("role");
// //   const username = sessionStorage.getItem("username");

// //   const notificationRedirectPath = 'eoffice/inbox/file'

// //   function handleDrawerToggle() {
// //     if (!panelOpen) {
// //       getNotification();
// //     }
// //     setPanelOpen(!panelOpen);
// //     props.notificationStatus(role, username)
// //   }
// //   const parentThemePalette = theme.palette;
// //   // console.log(theme);

// //   // if (!role) {
// //   //   useEffect(() => {
// //   //     role = sessionStorage.getItem("role");
// //   //   })
// //   // }

// //   useEffect(() => {
// //     loadNotification()
// //   }, [role])

// //   useEffect(() => {
// //     // clearInterval(myInterval);
// //     // const myInterval = setInterval(() => loadNotification(), 30000)
// //   }, [notifcationList])

// //   console.log("notificationLength :", notificationLength)

// //   useEffect(() => {
// //     if (notificationLength < notifcationList.length) {
// //       if (Notification.permission === 'granted') {
// //         // alert("we have permission");
// //         const notification = new Notification("CostaCloud", {
// //           body: "New Message"
// //         })
// //       } else if (Notification.permission !== "denied") {
// //         Notification.requestPermission().then(permission => {
// //           console.log("notify :", permission)
// //         })
// //       }
// //     }
// //   }, [notifcationList.length])

// //   const loadNotification = () => {
// //     dispatch(notificationFun(notifcationList.length))
// //     props.getNotification(role, username).then((resp) => {
// //       try {
// //         // setnotificationLen(resp.response.length)
// //         setnotifcationList(resp.response)
// //       } catch (e) {
// //         callMessageOut(e.message)
// //       }
// //     }).catch(error => {
// //       console.log(error)
// //     });
// //   }

// //   const callMessageOut = (message) => {
// //     dispatch(setSnackbar(true, "error", message));
// //   }

// //   const deleteSingalNotification = (id) => {
// //     console.log("id delete:", id)
// //     props.deleteNotification(role, id);
// //     loadNotification();
// //   }

// //   const deleteAllNotifications = () => {
// //     props.deleteAllNotification(role, username)
// //     loadNotification();
// //   }

// //   return (
// //     <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
// //       <span
// //         onClick={handleDrawerToggle}
// //         style={{
// //           color: 'white'
// //         }}
// //       >
// //         <Badge color="secondary" badgeContent={notifcationList && notifcationList.length}>
// //           <Tooltip title={t("notifications")} aria-label="Notification">
// //             <NotificationsNoneIcon style={{ color: "#fff", fontSize: "1.7rem" }} />
// //           </Tooltip>
// //         </Badge>
// //       </span>
// //       <Drawer
// //         width={"100px"}
// //         container={container}
// //         variant="temporary"
// //         anchor={"right"}
// //         open={panelOpen}
// //         onClose={handleDrawerToggle}
// //         ModalProps={{
// //           keepMounted: true
// //         }}
// //       >
// //         <div className="notification">
// //           <div className="notification__topbar flex flex-middle p-16 mb-24">
// //             <Icon color="primary">notifications</Icon>
// //             <h5 className="ml-8 my-0 font-weight-500" style={{ color: "inherit !important", }} >{t("notifications")}</h5>
// //           </div>

// //           {notifcationList && notifcationList.map((notification, index) => (

// //             <div
// //               key={notification.id}
// //               className="notification__card position-relative"
// //             >
// //               <IconButton
// //                 size="small"
// //                 className="delete-button bg-light-gray mr-24"
// //                 onClick={() => deleteSingalNotification(notification.id)}
// //               >
// //                 <Icon className="text-gray notification-close-icon" fontSize="small">
// //                   {/* {t("clear")} */}
// //                   <ClearIcon />
// //                 </Icon>
// //               </IconButton>
// //               <Link to={`/${notificationRedirectPath}`} onClick={handleDrawerToggle}>
// //                 <Card className="mx-16 mb-24" elevation={3}>
// //                   <div className={`card__topbar flex flex-middle flex-space-between p-8 ${notification.status === 'read' ? 'bg-light-gray' : 'bg-card-unread'}`}>
// //                     <div className="flex">
// //                       <div className="card__topbar__button">
// //                         <Icon
// //                           className="card__topbar__icon"
// //                           fontSize="small"
// //                         // color={notification.icon.color}
// //                         >
// //                           {/* {notification.icon.name} */}
// //                         </Icon>
// //                       </div>
// //                       {/* <span className="ml-4 font-weight-500 text-gray">
// //                         {notification.heading}
// //                       </span> */}
// //                     </div>
// //                     <small className="card__topbar__time text-gray">
// //                       {/* {getTimeDifference(notification.createdOn.replaceAll("-", "/"))} */}
// //                       {/* {notificationDate[index] < customDate ? customDate - notificationDate[index] + ' day' : customHour - notificationHour[index] > 1 ? notificationHour[index] + ' hour' : customMin - notificationMin[index] + ' minutes'} */}
// //                       {/* {moment().endOf('day').fromNow()} */}
// //                       {moment(notification.createdOn, "YYYYMMDD, h:mm:ss").fromNow()}
// //                       {/* {t(" ago")} */}
// //                     </small>
// //                   </div>
// //                   <div className="px-16 pt-8 pb-16">
// //                     <p className="m-0">{notification.subject}</p>
// //                     <small className="text-gray">
// //                       {notification.referenceNumber}
// //                     </small>
// //                   </div>
// //                 </Card>
// //               </Link>
// //             </div>
// //           ))}

// //           <div className="text-center">
// //             <Button onClick={deleteAllNotifications}>{t("clear_notifications")}</Button>
// //           </div>
// //         </div>
// //       </Drawer>
// //     </MuiThemeProvider >
// //   );
// // }

// // // NotificationBar.propTypes = {
// // //   settings: PropTypes.object.isRequired,
// // //   notification: PropTypes.array.isRequired
// // // };

// // const mapStateToProps = state => ({
// //   getNotification: PropTypes.func.isRequired,
// //   deleteNotification: PropTypes.func.isRequired,
// //   deleteAllNotification: PropTypes.func.isRequired,
// //   notification: state.notification,
// //   settings: state.layout.settings
// // });

// // export default withStyles({}, { withTheme: true })(
// //   connect(
// //     mapStateToProps,
// //     { getNotification, notificationStatus, deleteNotification, deleteAllNotification }
// //   )(NotificationBar)
// // );

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Icon,
// //   Badge,
// //   MuiThemeProvider,
// //   Card,
// //   Button,
// //   IconButton,
// //   Drawer,
// //   Fab,
// //   Tooltip,
// // } from "@material-ui/core";
// // import { Link } from "react-router-dom";
// // import { withStyles } from "@material-ui/styles";
// // import { getTimeDifference } from "utils.js";
// // import { PropTypes } from "prop-types";
// // import { connect, useDispatch, useSelector } from "react-redux";
// // import // getNotification,
// // // deleteAllNotification,
// // // deleteNotification
// // "../../redux/actions/NotificationActions";

// // import {
// //   getNotification,
// //   notificationStatus,
// //   deleteNotification,
// //   deleteAllNotification,
// // } from "../../camunda_redux/redux/action";
// // import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
// // import { useTranslation } from "react-i18next";
// // import ClearIcon from "@material-ui/icons/Clear";
// // import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
// // import { notificationFun } from "../../camunda_redux/redux/ducks/notification";
// // import moment from "moment";
// // import { over } from "stompjs";
// // import SockJS from "sockjs-client";

// // function NotificationBar(props) {
// //   const {
// //     container,
// //     theme,
// //     settings,
// //     // notification: notifcationList = [],
// //     // getNotification,
// //     // deleteAllNotification,
// //     // deleteNotification
// //   } = props;
// //   let stompClient = null;
// //   const { t } = useTranslation();
// //   const dispatch = useDispatch();
// //   const [panelOpen, setPanelOpen] = useState(false);
// //   const [connected, setConnected] = useState(false);
// //   const [unReadNotifcationList, setUnReadNotifcationList] = useState([]);
// //   const [notifcationList, setnotifcationList] = useState([
// //     // {
// //     //   id: 1,
// //     //   path: 'eoffice/inbox/file',
// //     //   title: 'This is Title',
// //     //   subtitle: 'This is Subtitle',
// //     //   timestamp: '',
// //     //   heading: '',
// //     //   icon: {
// //     //     color: "#000",
// //     //     name: 'remove'
// //     //   }
// //     // },
// //   ]);
// //   const { notificationLength } = useSelector((state) => state.notificationFun);
// //   const role = sessionStorage.getItem("role");
// //   const username = sessionStorage.getItem("username");

// //   const notificationRedirectPath = "eoffice/inbox/file";

// //   function handleDrawerToggle() {
// //     if (!panelOpen) {
// //       getNotification();
// //     }
// //     setPanelOpen(!panelOpen);
// //     props.notificationStatus(role, username);
// //   }
// //   const parentThemePalette = theme.palette;
// //   // console.log(theme);

// //   // if (!role) {
// //   //   useEffect(() => {
// //   //     role = sessionStorage.getItem("role");
// //   //   })
// //   // }

// //   useEffect(() => {
// //     getNotificationData();
// //     loadNotification();
// //   }, [role]);

// //   useEffect(() => {
// //     // clearInterval(myInterval);
// //     // const myInterval = setInterval(() => loadNotification(), 30000)
// //   }, [notifcationList]);

// //   const showNotification = () => {
// //     const notification = new Notification("CostaCloud", {
// //       body: "New Message",
// //     });
// //   };

// //   useEffect(() => {
// //     // if (notificationLength < notifcationList.length) {
// //     if (Notification.permission === "granted") {
// //       // alert("we have permission");
// //       showNotification();
// //     } else if (Notification.permission !== "denied") {
// //       Notification.requestPermission().then((permission) => {
// //         console.log("notify :", permission);
// //       });
// //     }
// //     // }
// //   }, []);

// //   const getNotificationData = () => {
// //     let Sock = new SockJS("http://11.0.0.118:9998/socket");
// //     stompClient = over(Sock);
// //     stompClient.connect({}, onConnected, onError);
// //   };

// //   const onConnected = () => {
// //     setConnected(true);
// //     stompClient.subscribe(`/user/${role}/notifications`, onGetNotifications);
// //   };

// //   const onGetNotifications = (payload) => {
// //     let payloadData = JSON.parse(payload.body);
// //     setnotifcationList(payloadData);
// //     let data =
// //       payloadData && payloadData.filter((item) => item.status === "unread");
// //     console.log(Notification.permission);
// //     setUnReadNotifcationList(data);
// //     if (Notification.permission === "granted") {
// //       // alert("we have permission");
// //       const notification = new Notification("CostaCloud", {
// //         body: "New Message",
// //       });
// //     } else if (Notification.permission !== "denied") {
// //       Notification.requestPermission().then((permission) => {
// //         console.log("notify :", permission);
// //       });
// //     }
// //     console.log(payloadData);
// //   };

// //   const onError = (err) => {
// //     alert("error");
// //     console.log(err);
// //   };

// //   const loadNotification = () => {
// //     dispatch(notificationFun(notifcationList.length));
// //     props
// //       .getNotification(role, username)
// //       .then((resp) => {
// //         try {
// //           // setnotificationLen(resp.response.length)
// //           setnotifcationList(resp.response);
// //           let data =
// //             resp.response &&
// //             resp.response.filter((item) => item.status === "unread");
// //           setUnReadNotifcationList(data);
// //         } catch (e) {
// //           callMessageOut(e.message);
// //         }
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

// //   const callMessageOut = (message) => {
// //     dispatch(setSnackbar(true, "error", message));
// //   };

// //   const deleteSingalNotification = (id) => {
// //     console.log("id delete:", id);
// //     props.deleteNotification(role, id);
// //     loadNotification();
// //   };

// //   const deleteAllNotifications = () => {
// //     props.deleteAllNotification(role, username);
// //     loadNotification();
// //   };

// //   return (
// //     <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
// //       <span
// //         onClick={handleDrawerToggle}
// //         style={{
// //           color: "white",
// //         }}
// //       >
// //         <Badge
// //           color="secondary"
// //           badgeContent={unReadNotifcationList && unReadNotifcationList.length}
// //         >
// //           <Tooltip title={t("notifications")} aria-label="Notification">
// //             <NotificationsNoneIcon
// //               style={{ color: "#fff", fontSize: "1.7rem" }}
// //             />
// //           </Tooltip>
// //         </Badge>
// //       </span>
// //       <Drawer
// //         width={"100px"}
// //         container={container}
// //         variant="temporary"
// //         anchor={"right"}
// //         open={panelOpen}
// //         onClose={handleDrawerToggle}
// //         ModalProps={{
// //           keepMounted: true,
// //         }}
// //       >
// //         <div className="notification">
// //           <div className="notification__topbar flex flex-middle p-16 mb-24">
// //             <Icon color="primary">notifications</Icon>
// //             <h5
// //               className="ml-8 my-0 font-weight-500"
// //               style={{ color: "inherit !important" }}
// //             >
// //               {t("notifications")}
// //             </h5>
// //           </div>

// //           {notifcationList &&
// //             notifcationList.map((notification, index) => (
// //               <div
// //                 key={notification.id}
// //                 className="notification__card position-relative"
// //               >
// //                 <IconButton
// //                   size="small"
// //                   className="delete-button bg-light-gray mr-24"
// //                   onClick={() => deleteSingalNotification(notification.id)}
// //                 >
// //                   <Icon
// //                     className="text-gray notification-close-icon"
// //                     fontSize="small"
// //                   >
// //                     {/ {t("clear")} /}
// //                     <ClearIcon />
// //                   </Icon>
// //                 </IconButton>
// //                 <Link
// //                   to={`/${notificationRedirectPath}`}
// //                   onClick={handleDrawerToggle}
// //                 >
// //                   <Card className="mx-16 mb-24" elevation={3}>
// //                     <div
// //                       className={`card__topbar flex flex-middle flex-space-between p-8 ${
// //                         notification.status === "read"
// //                           ? "bg-light-gray"
// //                           : "bg-card-unread"
// //                       }`}
// //                     >
// //                       <div className="flex">
// //                         <div className="card__topbar__button">
// //                           <Icon
// //                             className="card__topbar__icon"
// //                             fontSize="small"
// //                             // color={notification.icon.color}
// //                           >
// //                             {/* {notification.icon.name} */}
// //                           </Icon>
// //                         </div>
// //                         {/* <span className="ml-4 font-weight-500 text-gray">
// //                         {notification.heading}
// //                       </span> */}
// //                       </div>
// //                       {/* <small className="card__topbar__time text-gray">
// //                          {getTimeDifference(notification.createdOn.replaceAll("-", "/"))}
// //                          {notificationDate[index] < customDate ? customDate - notificationDate[index] + ' day' : customHour - notificationHour[index] > 1 ? notificationHour[index] + ' hour' : customMin - notificationMin[index] + ' minutes'}
// //                          {moment().endOf('day').fromNow()}
// //                         {moment(
// //                           notification.createdOn,
// //                           "YYYYMMDD, h:mm:ss"
// //                         ).fromNow()}
// //                         {t(" ago")}
// //                       </small> */}
// //                     </div>
// //                     <div className="px-16 pt-8 pb-16">
// //                       <p className="m-0">{notification.subject}</p>
// //                       <small className="text-gray">
// //                         {notification.referenceNumber}
// //                       </small>
// //                     </div>
// //                   </Card>
// //                 </Link>
// //               </div>
// //             ))}

// //           <div className="text-center">
// //             <Button onClick={deleteAllNotifications}>
// //               {t("clear_notifications")}
// //             </Button>
// //           </div>
// //         </div>
// //       </Drawer>
// //     </MuiThemeProvider>
// //   );
// // }

// // // NotificationBar.propTypes = {
// // //   settings: PropTypes.object.isRequired,
// // //   notification: PropTypes.array.isRequired
// // // };

// // const mapStateToProps = (state) => ({
// //   getNotification: PropTypes.func.isRequired,
// //   deleteNotification: PropTypes.func.isRequired,
// //   deleteAllNotification: PropTypes.func.isRequired,
// //   notification: state.notification,
// //   settings: state.layout.settings,
// // });

// // export default withStyles(
// //   {},
// //   { withTheme: true }
// // )(
// //   connect(mapStateToProps, {
// //     getNotification,
// //     notificationStatus,
// //     deleteNotification,
// //     deleteAllNotification,
// //   })(NotificationBar)
// // );

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Icon,
//   Badge,
//   MuiThemeProvider,
//   Card,
//   Button,
//   IconButton,
//   Drawer,
//   Fab,
//   Tooltip,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { withStyles } from "@material-ui/styles";
// import { getTimeDifference } from "utils.js";
// import { PropTypes } from "prop-types";
// import { connect, useDispatch, useSelector } from "react-redux";
// import // getNotification,
// // deleteAllNotification,
// // deleteNotification
// "../../redux/actions/NotificationActions";

// import {
//   getNotification,
//   notificationStatus,
//   deleteNotification,
//   deleteAllNotification,
// } from "../../camunda_redux/redux/action";
// import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
// import { useTranslation } from "react-i18next";
// import ClearIcon from "@material-ui/icons/Clear";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
// import { notificationFun } from "../../camunda_redux/redux/ducks/notification";
// import moment from "moment";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";

// function NotificationBar(props) {
//   const {
//     container,
//     theme,
//     settings,
//     // notification: notifcationList = [],
//     // getNotification,
//     // deleteAllNotification,
//     // deleteNotification
//   } = props;
//   let stompClient = null;
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [unReadNotifcationList, setUnReadNotifcationList] = useState([]);
//   const [notifcationList, setnotifcationList] = useState([
//     // {
//     //   id: 1,
//     //   path: 'eoffice/inbox/file',
//     //   title: 'This is Title',
//     //   subtitle: 'This is Subtitle',
//     //   timestamp: '',
//     //   heading: '',
//     //   icon: {
//     //     color: "#000",
//     //     name: 'remove'
//     //   }
//     // },
//   ]);
//   const { notificationLength } = useSelector((state) => state.notificationFun);
//   const role = sessionStorage.getItem("role");
//   const username = sessionStorage.getItem("username");

//   const notificationRedirectPath = "eoffice/inbox/file";

//   function handleDrawerToggle() {
//     if (!panelOpen) {
//       getNotification();
//     }
//     setPanelOpen(!panelOpen);
//     props.notificationStatus(role, username);
//   }
//   const parentThemePalette = theme.palette;
//   // console.log(theme);

//   // if (!role) {
//   //   useEffect(() => {
//   //     role = sessionStorage.getItem("role");
//   //   })
//   // }

//   useEffect(() => {
//     getNotificationData();
//     loadNotification();
//   }, [role]);

//   useEffect(() => {
//     // clearInterval(myInterval);
//     // const myInterval = setInterval(() => loadNotification(), 30000)
//   }, [notifcationList]);

//   const showNotification = () => {
//     const notification = new Notification("CostaCloud", {
//       body: "New Message",
//     });
//     notification.onclick = (value)=>{
//       console.log(value)
//     }
//   };

//   useEffect(() => {
//     // if (notificationLength < notifcationList.length) {
//     // if (Notification.permission === "granted") {
//     //   alert("working");
//     //   // alert("we have permission");
//     //   showNotification();
//     // } else if (Notification.permission !== "denied") {
//     //   Notification.requestPermission().then((permission) => {
//     //     console.log("notify :", permission);
//     //   });
//     // }
//     // }
//   }, []);

//   const getNotificationData = () => {
//     let Sock = new SockJS("http://11.0.0.118:9998/socket");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     setConnected(true);
//     stompClient.subscribe(`/user/${role}/notifications`, onGetNotifications);
//   };

//   const onGetNotifications = (payload) => {
//     let payloadData = JSON.parse(payload.body);
//     setnotifcationList(payloadData);
//     let data =
//       payloadData && payloadData.filter((item) => item.status === "unread");
//     console.log(Notification.permission);
//     setUnReadNotifcationList(data);
//     if (Notification.permission === "granted") {
//       // alert("we have permission");
//       const notification = new Notification("CostaCloud", payloadData[0]);
//     } else if (Notification.permission !== "denied") {
//       Notification.requestPermission().then((permission) => {
//         console.log("notify :", permission);
//       });
//     }
//     console.log(payloadData);
//   };

//   const onError = (err) => {
//     alert("error");
//     console.log(err);
//   };

//   const loadNotification = () => {
//     dispatch(notificationFun(notifcationList.length));
//     props
//       .getNotification(role, username)
//       .then((resp) => {
//         try {
//           // setnotificationLen(resp.response.length)
//           setnotifcationList(resp.response);
//           let data =
//             resp.response &&
//             resp.response.filter((item) => item.status === "unread");
//           setUnReadNotifcationList(data);
//         } catch (e) {
//           callMessageOut(e.message);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const callMessageOut = (message) => {
//     dispatch(setSnackbar(true, "error", message));
//   };

//   const deleteSingalNotification = (id) => {
//     console.log("id delete:", id);
//     props.deleteNotification(role, id);
//     loadNotification();
//   };

//   const deleteAllNotifications = () => {
//     props.deleteAllNotification(role, username);
//     loadNotification();
//   };

//   return (
//     <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
//       <span
//         onClick={handleDrawerToggle}
//         style={{
//           color: "white",
//         }}
//       >
//         <Badge
//           color="secondary"
//           badgeContent={unReadNotifcationList && unReadNotifcationList.length}
//         >
//           <Tooltip title={t("notifications")} aria-label="Notification">
//             <NotificationsNoneIcon
//               style={{ color: "#fff", fontSize: "1.7rem" }}
//             />
//           </Tooltip>
//         </Badge>
//       </span>
//       <Drawer
//         width={"100px"}
//         container={container}
//         variant="temporary"
//         anchor={"right"}
//         open={panelOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//       >
//         <div className="notification">
//           <div className="notification__topbar flex flex-middle p-16 mb-24">
//             <Icon color="primary">notifications</Icon>
//             <h5
//               className="ml-8 my-0 font-weight-500"
//               style={{ color: "inherit !important" }}
//             >
//               {t("notifications")}
//             </h5>
//           </div>

//           {notifcationList &&
//             notifcationList.map((notification, index) => (
//               <div
//                 key={notification.id}
//                 className="notification__card position-relative"
//               >
//                 <IconButton
//                   size="small"
//                   className="delete-button bg-light-gray mr-24"
//                   onClick={() => deleteSingalNotification(notification.id)}
//                 >
//                   <Icon
//                     className="text-gray notification-close-icon"
//                     fontSize="small"
//                   >
//                     {/* {t("clear")} */}
//                     <ClearIcon />
//                   </Icon>
//                 </IconButton>
//                 <Link
//                   to={`/${notificationRedirectPath}`}
//                   onClick={handleDrawerToggle}
//                 >
//                   <Card className="mx-16 mb-24" elevation={3}>
//                     <div
//                       className={`card__topbar flex flex-middle flex-space-between p-8 ${
//                         notification.status === "read"
//                           ? "bg-light-gray"
//                           : "bg-card-unread"
//                       }`}
//                     >
//                       <div className="flex">
//                         <div className="card__topbar__button">
//                           <Icon
//                             className="card__topbar__icon"
//                             fontSize="small"
//                             // color={notification.icon.color}
//                           >
//                             {/* {notification.icon.name} */}
//                           </Icon>
//                         </div>
//                         {/* <span className="ml-4 font-weight-500 text-gray">
//                         {notification.heading}
//                       </span> */}
//                       </div>
//                       <small className="card__topbar__time text-gray">
//                         {/* {getTimeDifference(notification.createdOn.replaceAll("-", "/"))} */}
//                         {/* {notificationDate[index] < customDate ? customDate - notificationDate[index] + ' day' : customHour - notificationHour[index] > 1 ? notificationHour[index] + ' hour' : customMin - notificationMin[index] + ' minutes'} */}
//                         {/* {moment().endOf('day').fromNow()} */}
//                         {moment(
//                           notification.createdOn,
//                           "YYYYMMDD, h:mm:ss"
//                         ).fromNow()}
//                         {/* {t(" ago")} */}
//                       </small>
//                     </div>
//                     <div className="px-16 pt-8 pb-16">
//                       <p className="m-0">{notification.subject}</p>
//                       <small className="text-gray">
//                         {notification.referenceNumber}
//                       </small>
//                     </div>
//                   </Card>
//                 </Link>
//               </div>
//             ))}

//           <div className="text-center">
//             <Button onClick={deleteAllNotifications}>
//               {t("clear_notifications")}
//             </Button>
//           </div>
//         </div>
//       </Drawer>
//     </MuiThemeProvider>
//   );
// }

// // NotificationBar.propTypes = {
// //   settings: PropTypes.object.isRequired,
// //   notification: PropTypes.array.isRequired
// // };

// const mapStateToProps = (state) => ({
//   getNotification: PropTypes.func.isRequired,
//   deleteNotification: PropTypes.func.isRequired,
//   deleteAllNotification: PropTypes.func.isRequired,
//   notification: state.notification,
//   settings: state.layout.settings,
// });

// export default withStyles(
//   {},
//   { withTheme: true }
// )(
//   connect(mapStateToProps, {
//     getNotification,
//     notificationStatus,
//     deleteNotification,
//     deleteAllNotification,
//   })(NotificationBar)
// );

import React, { useState, useRef, useEffect } from "react";
import {
  Icon,
  Badge,
  MuiThemeProvider,
  Card,
  Button,
  IconButton,
  Drawer,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { getTimeDifference } from "utils.js";
import { PropTypes } from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import // getNotification,
// deleteAllNotification,
// deleteNotification
"../../redux/actions/NotificationActions";

import {
  getNotification,
  notificationStatus,
  deleteNotification,
  deleteAllNotification,
} from "../../camunda_redux/redux/action";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";
import ClearIcon from "@material-ui/icons/Clear";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { notificationFun } from "../../camunda_redux/redux/ducks/notification";
import moment from "moment";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

function NotificationBar(props) {
  const {
    container,
    theme,
    settings,
    // notification: notifcationList = [],
    // getNotification,
    // deleteAllNotification,
    // deleteNotification
  } = props;
  let stompClient = null;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [panelOpen, setPanelOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [unReadNotifcationList, setUnReadNotifcationList] = useState([]);
  const [notifcationList, setnotifcationList] = useState([
    // {
    //   id: 1,
    //   path: 'eoffice/inbox/file',
    //   title: 'This is Title',
    //   subtitle: 'This is Subtitle',
    //   timestamp: '',
    //   heading: '',
    //   icon: {
    //     color: "#000",
    //     name: 'remove'
    //   }
    // },
  ]);
  const { notificationLength } = useSelector((state) => state.notificationFun);
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");
  const history = useHistory();

  const notificationRedirectPath = "eoffice/inbox/file";

  function handleDrawerToggle() {
    if (!panelOpen) {
      getNotification();
    }
    setPanelOpen(!panelOpen);
    props.notificationStatus(role, username);
  }
  const parentThemePalette = theme.palette;
  // console.log(theme);

  // if (!role) {
  //   useEffect(() => {
  //     role = sessionStorage.getItem("role");
  //   })
  // }

  useEffect(() => {
    getNotificationData();
    loadNotification();
  }, [role]);

  useEffect(() => {
    // clearInterval(myInterval);
    // const myInterval = setInterval(() => loadNotification(), 30000)
  }, [notifcationList]);

  const showNotification = () => {
    const notification = new Notification("CostaCloud", {
      body: "New Message",
    });
    notification.onclick = (value) => {
      console.log(value);
    };
  };

  useEffect(() => {
    // if (notificationLength < notifcationList.length) {
    // if (Notification.permission === "granted") {
    //   alert("working");
    //   // alert("we have permission");
    //   showNotification();
    // } else if (Notification.permission !== "denied") {
    //   Notification.requestPermission().then((permission) => {
    //     console.log("notify :", permission);
    //   });
    // }
    // }
  }, []);

  const getNotificationData = () => {
    let Sock = new SockJS(process.env.REACT_NOTIFICATION);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setConnected(true);
    stompClient.subscribe(`/user/${role}/notifications`, onGetNotifications);
  };

  const onGetNotifications = (payload) => {
    let payloadData = JSON.parse(payload.body);
    setnotifcationList(payloadData);
    let data =
      payloadData && payloadData.filter((item) => item.status === "unread");
    console.log(Notification.permission);
    setUnReadNotifcationList(data);
    if (Notification.permission === "granted") {
      // alert("we have permission");
      const notification = new Notification("CostaCloud", {
        body: "new message",
        data: payloadData[0],
      });
      notification.onclick = (e) => {
        handleRedirect(e.target.data);
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        console.log("notify :", permission);
      });
    }
    console.log(payloadData);
  };

  const onError = (err) => {
    console.log(err);
  };

  const loadNotification = () => {
    dispatch(notificationFun(notifcationList.length));
    // props
    //   .getNotification(role, username)
    //   .then((resp) => {
    //     try {
    //       // setnotificationLen(resp.response.length)
    //       setnotifcationList(resp.response);
    //       let data =
    //         resp.response &&
    //         resp.response.filter((item) => item.status === "unread");
    //       setUnReadNotifcationList(data);
    //     } catch (e) {
    //       callMessageOut(e.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleRedirect = (row) => {
    console.log(row);
    sessionStorage.setItem("InboxID", row.inboxId);
    sessionStorage.setItem("pa_id", row.personalApplicationInventoryId);
    Cookies.set("inboxFile", row.subject);
    Cookies.set("priority", row.priority);
    Cookies.set("referenceNumber", row.referenceNumber);
    row.type === "PA"
      ? history.push({
          pathname: "/eoffice/hrmConcernedView/file",
          state: row.subject,
        })
      : history.push({
          pathname: "/eoffice/splitView/file",
          state: row,
        });
  };

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const deleteSingalNotification = (id) => {
    console.log("id delete:", id);
    props.deleteNotification(role, id);
    loadNotification();
  };

  const deleteAllNotifications = () => {
    props.deleteAllNotification(role, username);
    loadNotification();
  };

  return (
    <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
      <span
        onClick={handleDrawerToggle}
        style={{
          color: "white",
        }}
      >
        <IconButton>
          <Badge
            color="secondary"
            badgeContent={unReadNotifcationList && unReadNotifcationList.length}
          >
            <Tooltip title={t("notifications")} aria-label="Notification">
              <NotificationsNoneIcon
                style={{ color: "#fff", fontSize: "1.2rem", zIndex: "10" }}
              />
            </Tooltip>
          </Badge>
        </IconButton>
      </span>
      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="notification">
          <div className="notification__topbar flex flex-middle p-16 mb-24">
            <Icon color="primary">notifications</Icon>
            <h5
              className="ml-8 my-0 font-weight-500"
              style={{ color: "inherit !important" }}
            >
              {t("notifications")}
            </h5>
          </div>

          {notifcationList.length &&
            notifcationList.map((notification, index) => (
              <div
                key={notification.id}
                className="notification__card position-relative"
              >
                <IconButton
                  size="small"
                  className="delete-button bg-light-gray mr-24"
                  onClick={() => deleteSingalNotification(notification.id)}
                >
                  <Icon
                    className="text-gray notification-close-icon"
                    fontSize="small"
                  >
                    {/* {t("clear")} */}
                    <ClearIcon />
                  </Icon>
                </IconButton>
                {/* <Link
                to={`/${notificationRedirectPath}`}
                onClick={handleDrawerToggle}
              > */}

                <Card
                  className="mx-16 mb-24"
                  elevation={3}
                  onClick={() => handleRedirect(notification)}
                >
                  <div
                    className={`card__topbar flex flex-middle flex-space-between p-8 ${
                      notification.status === "read"
                        ? "bg-light-gray"
                        : "bg-card-unread"
                    }`}
                  >
                    <div className="flex">
                      <div className="card__topbar__button">
                        <Icon
                          className="card__topbar__icon"
                          fontSize="small"
                          // color={notification.icon.color}
                        >
                          {/* {notification.icon.name} */}
                        </Icon>
                      </div>
                      {/* <span className="ml-4 font-weight-500 text-gray">
                        {notification.heading}
                      </span> */}
                      </div>
                      <small className="card__topbar__time text-gray">
                        {/* {getTimeDifference(notification.createdOn.replaceAll("-", "/"))} */}
                        {/* {notificationDate[index] < customDate ? customDate - notificationDate[index] + ' day' : customHour - notificationHour[index] > 1 ? notificationHour[index] + ' hour' : customMin - notificationMin[index] + ' minutes'} */}
                        {/* {moment().endOf('day').fromNow()} */}
                        {moment(
                          notification.createdOn,
                          "YYYYMMDD, h:mm:ss"
                        ).fromNow()}
                        {/* {t(" ago")} */}
                      </small>
                    </div>
                    <div>
                    <small className="card__topbar__time text-gray">
                      {/* {getTimeDifference(notification.createdOn.replaceAll("-", "/"))} */}
                      {/* {notificationDate[index] < customDate ? customDate - notificationDate[index] + ' day' : customHour - notificationHour[index] > 1 ? notificationHour[index] + ' hour' : customMin - notificationMin[index] + ' minutes'} */}
                      {/* {moment().endOf('day').fromNow()} */}
                      {moment(
                        notification.createdOn,
                        "YYYYMMDD, h:mm:ss"
                      ).fromNow()}
                      {/* {t(" ago")} */}
                    </small>
                  </div>
                  <div className="px-16 pt-8 pb-16">
                    <p className="m-0">{notification.subject}</p>
                    <small className="text-gray">
                      {notification.referenceNumber}
                    </small>
                  </div>
                </Card>
                {/* </Link> */}
              </div>
            ))}

          <div className="text-center">
            <Button onClick={deleteAllNotifications}>
              {t("clear_notifications")}
            </Button>
          </div>
        </div>
      </Drawer>
    </MuiThemeProvider>
  );
}

// NotificationBar.propTypes = {
//   settings: PropTypes.object.isRequired,
//   notification: PropTypes.array.isRequired
// };

const mapStateToProps = (state) => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings,
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getNotification,
    notificationStatus,
    deleteNotification,
    deleteAllNotification,
  })(NotificationBar)
);
