import React, {Component, useEffect, useState} from 'react'
import {setSnackbar} from "../../../../camunda_redux/redux/ducks/snackbar";
import {connect, useDispatch} from "react-redux";
import {personalApplicationFormData} from "../../../../camunda_redux/redux/action";
import {changingTableStatePA, changeTableStateDraft} from "../../../../camunda_redux/redux/action/apiTriggers";
import {setRefresh} from "../../../../redux/actions/RefreshActions";
import {setRefresh1} from "../../../../redux/actions/Refresh1Actions";

function personalApplicationData(props)
{
    const dispatch = useDispatch();
    let { dataForm } = props;
    const role = sessionStorage.getItem("role");
    const grp = sessionStorage.getItem("department");
    const [response,setResponse] = useState('');

    useEffect(async()=>
    {
        console.log(dataForm)
        props.personalApplicationFormData(dataForm,role,grp).then(async (resp) => {

            if (resp.status === 'OK') {
                await props.setRefresh1(true);
                dispatch(
                    setSnackbar(
                        true,
                        "success",
                        "Personal Application Created successfully!"
                    )

            );

                let trigger = false;
                setTimeout(() => {
                    trigger = true;
                    props.changeTableStateDraft(trigger,'CHANGE_PA_DRAFT');
                },0);
            }
        });

    },[]);

    return (
        <div>OK</div>
    )
}
function mapStateToProps(state) {

    return { props: state.props };
}

export default connect(mapStateToProps,{setRefresh1,personalApplicationFormData,changingTableStatePA, changeTableStateDraft})(personalApplicationData);
