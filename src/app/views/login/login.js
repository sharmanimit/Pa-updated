import React, {Component} from 'react';
import {authenticationService} from "../authenticationService/authenticationService";
import {Redirect} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import './login.css';
import {Field, Form, Formik} from 'formik';

export const token = "";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.token = "";
        this.state = {
            filePdf : 'http://localhost:8080/api/test/downloadBFile/5f181e34735f695824483a29',
            errroMessage: '',
            load : false,
            show : false,
            toDashboard: true,
            username: '',
            password: ''
        }
    };

    render() {
        if (this.state.toDashboard === true) {
            return (
                <div id="file-inbox" color={'#f4f4f4'}>
                    <header id="topnav">
                        <div className="navbar-custom">
                            <div className="container-fluid">
                                <ul className="list-unstyled topnav-menu float-right mb-0">


                                    <li className="dropdown notification-list">

                                        <div className="dropdown-menu dropdown-menu-right dropdown-lg">
                                            <div className="dropdown-item noti-title">
                                                <h5 className="m-0">
                              <span className="float-right">
                              <a href="" className="text-dark">
                              <small>Clear All</small>
                              </a>
                              </span>Notification
                                                </h5>
                                            </div>
                                            <div className="slimscroll noti-scroll">
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-success"><i
                                                        className="mdi mdi-comment-account-outline"></i></div>
                                                    <p className="notify-details">Caleb Flakelar commented on
                                                        Admin<small className="text-muted">1 min ago</small></p>
                                                </a>
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-info"><i
                                                        className="mdi mdi-account-plus"></i></div>
                                                    <p className="notify-details">New user registered.<small
                                                        className="text-muted">5 hours ago</small></p>
                                                </a>
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-danger"><i
                                                        className="mdi mdi-heart"></i></div>
                                                    <p className="notify-details">Carlos Crouch liked <b>Admin</b><small
                                                        className="text-muted">3 days ago</small></p>
                                                </a>
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-warning"><i
                                                        className="mdi mdi-comment-account-outline"></i></div>
                                                    <p className="notify-details">Caleb Flakelar commented on
                                                        Admin<small className="text-muted">4 days ago</small></p>
                                                </a>
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-purple"><i
                                                        className="mdi mdi-account-plus"></i></div>
                                                    <p className="notify-details">New user registered.<small
                                                        className="text-muted">7 days ago</small></p>
                                                </a>
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-primary"><i
                                                        className="mdi mdi-heart"></i></div>
                                                    <p className="notify-details">Carlos Crouch liked <b>Admin</b><small
                                                        className="text-muted">13 days ago</small></p>
                                                </a>
                                            </div>
                                            <a href="javascript:void(0);"
                                               className="dropdown-item text-center text-primary notify-item notify-all">
                                                View all
                                                <i className="fi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="dropdown notification-list">
                                        <a href="javascript:void(0);"
                                           className="nav-link right-bar-toggle waves-effect">
                                            <i className="fa fa-bars"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div className="logo-box">
                                    <a href="index.html" className="logo text-center">
                     <span className="logo-lg">
                        <img src="assets/images/logo-paperless.png" alt="" height="48"/>
                     </span>
                                        <span className="logo-sm">
                        <img src="assets/images/logo-sm.png" alt="" height="24"/>
                     </span>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </header>
                    <div className="wrapper login">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="container-login100 container-login200">
                                        { this.state.show ?
                                            <Alert variant="danger" onClose={() => this.setState({show:false})} className={"alertMsg"} dismissible>

                                                <p>
                                                    Invalid Credentials, Please Enter valid username or password !
                                                </p>
                                            </Alert>  : null}
                                        {this.state.load ? <Loading/> : null}

                                        }
                                        <div className="wrap-login100 wrap-login200">
                                            <div className="login-wrapper">

                                                {/*<form className="login100-form validate-form">*/}
                                                {/*    <div className="login100-form-title p-b-70">*/}
                                                {/*        LOG IN TO ENTER*/}
                                                {/*    </div>*/}

                                                {/*    <div className="wrap-input100 validate-input m-t-85 m-b-35"*/}
                                                {/*         data-validate="Enter username">*/}
                                                {/*        <input className="input100" type="text" name="username"*/}
                                                {/*               onChange={(event) => this.setState({username: event.target.value})}/>*/}
                                                {/*        <span className="focus-input100"*/}
                                                {/*              data-placeholder="Username"></span>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="wrap-input100 validate-input m-b-50"*/}
                                                {/*         data-validate="Enter password">*/}
                                                {/*        <input className="input100" type="password" name="password"*/}
                                                {/*               onChange={(event) => this.setState({password: event.target.value})}/>*/}
                                                {/*        <span className="focus-input100"*/}
                                                {/*              data-placeholder="Password"></span>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="container-login100-form-btn">*/}
                                                {/*        <Button className="login100-form-btn" onClick={(event) => this.handleClick(event)}>*/}
                                                {/*            Login*/}
                                                {/*        </Button>*/}
                                                {/*    </div>*/}

                                                {/*</form>*/}
                                                <Formik
                                                    initialValues={{ username: '', password: '' }}
                                                    onSubmit={(values, { setSubmitting }) => {
                                                        setTimeout(() => {
                                                            // alert(JSON.stringify(values, null, 2));
                                                            setSubmitting(false);
                                                            // let val = JSON.stringify(values, null, 2);
                                                            let new_val = {"client_secret": "20952217-3d53-4c8d-bc7c-491ce3d0ad0e","client_id":"costa_spring","grant_type":"password"};
                                                            let val = JSON.stringify(values, null, 2);
                                                            let z = Object.assign(values, new_val);
                                                            let newVal = JSON.stringify(z);
                                                            this.handleClick(newVal);
                                                        }, 400);

                                                    }}
                                                >
                                                    {({
                                                          values,
                                                          errors,
                                                          touched,
                                                          handleChange,
                                                          handleBlur,
                                                          handleSubmit,
                                                          isSubmitting,
                                                          /* and other goodies */
                                                      }) => (
                                                        <Form onSubmit={handleSubmit} class="login100-form">
                                                            <div className="login100-form-title p-b-70">
                                                                LOG IN TO ENTER
                                                            </div>

                                                            <div class="wrap-input100 m-t-85 m-b-35">
                                                            <Field
                                                                type="text"
                                                                name="username"
                                                                class="input100"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.username}
                                                            />{touched.username }
                                                            <span className="focus-input100"
                                                                  data-placeholder="Username"></span>
                                                            </div>
                                                            <div class="wrap-input100 m-b-50">
                                                            <Field
                                                                type="password"
                                                                name="password"
                                                                class="input100"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                            />
                                                                { touched.password}
                                                            <span className="focus-input100"
                                                                  data-placeholder="Password"></span>
                                                            </div>
                                                            <div className="container-login100-form-btn">
                                                            <button type="submit"  class="login100-form-btn">
                                                                Submit
                                                            </button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                            <div className="login100-more login200-more">
                                                <h2>INDIAN NAVY</h2>
                                                <h3>Paperless Office</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
        else {
            return(
                <Redirect from={"/"} to='/office/dashboard'/>);

        }
    }
    handleClick(values){
        sessionStorage.getItem('checkFile',"");
        // this.setState({load:true});
        console.log(values);

        authenticationService.login(values)
            .then(obj =>
            {
                console.log(obj);
                // if(obj === 200) {
                //      this.setState({toDashboard: false});
                //     this.setState({token: obj});
                //     this.setState({load:true});
                //     window.location.reload();
                // }
                // else
                // {
                //     this.setState({show:true});
                //     this.setState({load:false});
                // }
            }).catch(error => {
            this.setState({show:true});
            console.log(error);
            this.setState({errorMessage: "User Not Found !"});
        });
    }
}
export default Login;
