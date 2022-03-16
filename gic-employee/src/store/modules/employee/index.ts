import { createSlice, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { client } from '../../../api';
import { Constants } from '../../../utils';

export const fetchEmployeeList = createAsyncThunk('employees', async () => {
  const response = await client.get(Constants.API_PATH);
  return response;
})

export interface EmployeeState {
  first_name: string;
  last_name: string;
  email:string;
  number:string;
  gender:string;
  id?:string;
}

const initialState: any = {
  loading: true,
  data: [],
  item: {}
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<EmployeeState>) => {
      let lastID = state.data[state.data.length - 1].id ? state.data[state.data.length - 1].id: 0;
      action.payload.id = +lastID + 1 + "";
      return {
        ...state,
        loading: false, 
        data : [...state.data, action.payload]
      };
    },
    update: (state, action: PayloadAction<EmployeeState>) => {
      return {
        ...state,
        data : state.data.map((record: EmployeeState, index: number) => action.payload.id === record.id ? action.payload : record),
      }
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        data : state.data.filter((record: EmployeeState, index: number) => action.payload !== record.id),
      }
    },
    get: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        item : state.data.find((record: EmployeeState, index: number) => action.payload === record.id),
      }
    },
    resetItem: (state) => {
      return {
        ...state,
        item : {},
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeeList.pending, (state, action) => {
        return {
          ...state,
          loading: true
        };
      })
      .addCase(fetchEmployeeList.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.data,
          loading: false
        };
      })
  }
})

export const { add, update, deleteRecord, get, resetItem } = employeeSlice.actions

export const selectEmployee = (state: RootState) => state.employee;

export default employeeSlice.reducer