import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useNavigate} from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks';
import { deleteRecord, resetItem, fetchEmployeeList } from '../store/modules/employee'
import { CustomButton } from '../components/atoms';
import { RecordListTable } from '../components/orgnisims';
import { makeStyles } from '@material-ui/core/styles';
import { Constants } from '../utils';
import { Dialog } from '../components/molecules';

const useStyles = makeStyles(() => ({
    editBtn: {
        margin: '5px',
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
       
    },
    addBtn: {
        float: 'right', 
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
        marginRight: '30px',
        backgroundColor: 'green'
    },
    deleteBtn: {
        margin: '5px',
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
        backgroundColor: 'red'
    }
}));

const EmployeeListPage = () => {
   const storeData = useAppSelector(state => state.employee);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [recordID, setRecordID] = useState("");

   const handleClickOpen = (id: any) => {
        setOpen(true);
        setRecordID(id);
        //dispatch(deleteRecord(params.data.id)
    };
    
    const handleClose = () => {
        setOpen(false);
        setRecordID("");
    };

    const handleConfirm = () => {
        setOpen(false);
        dispatch(deleteRecord(recordID));
    };

   useEffect(() => {
       if (storeData.loading) {
        dispatch(fetchEmployeeList());
       };
       dispatch(resetItem());
   }, [storeData.loading]); 

   const [columnDefs] = useState([
       { headerName: Constants.LABEL_ID_NO, field: 'id' },
       { headerName: Constants.LABEL_FIRST_NAME, field: 'first_name' },
       { headerName: Constants.LABEL_LAST_NAME, field: 'last_name' },
       { headerName: Constants.LABEL_EMAIL, field: 'email' },
       { headerName: Constants.LABEL_NUMBER, field: 'number' },
       { headerName: Constants.LABEL_GENDER, field: 'gender' },
       { headerName: Constants.LABEL_ACTION, cellRendererFramework: function(params: any) {
        return <CustomButton
                    name={Constants.LABEL_EDIT}
                    type='button'
                    style={classes.editBtn}
                    onClick={() => navigate(Constants.EDIT_PATH + params.data.id, {state: params.data})}
                />
      },},
      { headerName: Constants.LABEL_ACTION, cellRendererFramework: function(params:any) {
        return <CustomButton
                name= {Constants.LABEL_DELETE}
                type='button'
                style={classes.deleteBtn}
                onClick={() => handleClickOpen(params.data.id)}
            />
      },},
   ])

   return (
    <React.Fragment>
        <Container maxWidth="lg">  
            <RecordListTable
                title={Constants.LIST_PAGE_TITLE}
                listData={storeData.data} 
                onGoToAddPage={() => navigate(Constants.ADD_PATH)} 
                btnStyle={classes.addBtn}
                columnDefs={columnDefs}
                isLoading = {storeData.loading}
            />
            <Dialog open={open} 
                    title= {Constants.LABEL_ALERT_TILE} 
                    question= {Constants.LABEL_ALERT_QUESTION} 
                    yesBtnLabel = {Constants.LABEL_ALERT_YES}
                    noBtnLabel = {Constants.LABEL_ALERT_NO}
                    handleClose={handleClose} 
                    handleConfirm={handleConfirm}  />
        </Container>
    </React.Fragment>
   );
};

export default EmployeeListPage;