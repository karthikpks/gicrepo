import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { EmployeeFormContainer } from '../components/orgnisims';
import { useParams } from "react-router-dom";
import { useAppDispatch } from '../hooks';
import { EmployeeState, add, update,  } from '../store/modules/employee'
import { useNavigate, useLocation } from "react-router-dom";
import { onCheckFieldValidation, onFindIsError, Constants } from '../utils';

const EmployeeAddPage = () => {
    let { id } = useParams();
    const title = id ? Constants.EDIT_PAGE_TITLE : Constants.ADD_PAGE_TITLE;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const record = state as EmployeeState || { first_name : '',  last_name: '', email: '', number: '', gender: ''};
    const [firstName, setFirstName] = useState(record.first_name);
    const [lastName, setLastName] = useState(record.last_name);
    const [email, setEmail] = useState(record.email);
    const [number, setNumber] = useState(record.number);
    const [gender, setGender] = useState(record.gender);
    const [validateResult, setValidateResult] = useState({
      first_name: false,
      last_name: false,
      email:false,
      number:false,
      gender:false
    });

    const onTextFiledChange = (field: string, value: string ) => {
      switch (field) {
        case "firstName" : setFirstName(value); break;
        case "lastName" : setLastName(value); break;
        case "email" : setEmail(value); break;
        case "phoneNumber" : setNumber(value); break;
        case "gender" : setGender(value); break;
      }
    };

    const onCheckValidation = (data: EmployeeState) : boolean => {
        let checkedResulet: any = {};  
        checkedResulet.first_name = onCheckFieldValidation('name', data.first_name);
        checkedResulet.last_name = onCheckFieldValidation('name', data.last_name);
        checkedResulet.email = onCheckFieldValidation('email', data.email);
        checkedResulet.number = onCheckFieldValidation('number', data.number);
        checkedResulet.gender = onCheckFieldValidation('gender', data.gender);
        setValidateResult(checkedResulet);
        return onFindIsError(checkedResulet);
    };

    const onSubmitForm = (id: string) => {
      let data = {
        first_name: firstName,
        last_name: lastName,
        email:email,
        number:number,
        gender:gender,
        id:id
      };
      if (!onCheckValidation(data)) {
        dispatch(id ? update(data) : add(data));
        navigate(Constants.LIST_PATH);
      };
    };

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <h2> {title} </h2>
            <EmployeeFormContainer record={record} validateResult={validateResult} onChange={onTextFiledChange} onSubmit={onSubmitForm}/>
          </Container>
        </React.Fragment>
      );
};

export default EmployeeAddPage;