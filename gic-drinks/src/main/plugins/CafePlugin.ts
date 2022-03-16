'use strict';
import * as hapi from '@hapi/hapi';
import { CafesRequestInterface } from '../models';
import { EmployeeRequestInterface } from '../models/CafesInterfaces';
import { AppProperties } from '../resources';
import { db } from '../services';
import { Fetch, Helper } from '../utils';

export const CafePlugin = {
    name: 'CafePlugin',
    version: '1.0.0',
    register: async function (server : hapi.Server, options: any) {
        server.route({
            method: 'GET',
            path: '/cafes',
            handler: async function (request : hapi.Request, h) {
                return new Promise((resolve, reject) => {
                    return db.query('select name, description, logo, uuid as id, (select count(*) from cafe_employees where cafe_employees.cafeid = cafes.uuid) AS employees from cafes where cafes.status = 1', (err, data) => {
                        if(err) {
                            console.error(err);
                            return reject(err);
                        }
                        let response =  {
                            status: AppProperties.SUCCESS,
                            code: AppProperties.SUCCESS_CODE,
                            data: data,
                        };
                        resolve(response);
                    });
                });
            }
        });

        server.route({
            method: 'POST',
            path: '/cafes',
            handler: async function (request : hapi.Request, h) {
                const { name, description, location } = request.payload as CafesRequestInterface;
                const image = await Fetch.getData(AppProperties.ENDPOINTS.endpoint_coffee_image.url);
                const uuid = Helper.generateUUID();
                const logo = image.file;
                const record = { name, location, description, uuid, logo };
                var sql = "INSERT INTO cafes SET ? ";
                return new Promise((resolve, reject) => {
                    return db.query(sql, record, (err, result) => {
                        if(err) {
                            console.error(err);
                            return reject(err);
                        }
                        if (result.insertId) {
                            let response =  {
                                status: AppProperties.SUCCESS,
                                code: AppProperties.SUCCESS_CODE,
                                message: 'Data has been inserted successfully!'
                            };
                            resolve(response);
                        };
                    });
                });
            }
        });

        server.route({
            method: 'GET',
            path: '/cafes/employees',
            handler: async function (request, h) {
                return new Promise((resolve, reject) => {
                    return db.query('select first_name as name , (select DATEDIFF(SYSDATE(), join_date) from cafe_employees where cafe_employees.employeeid = employees.uuid ) AS days_worked, uuid as id from employees where status = 1', (err, data) => {
                        if(err) {
                            console.error(err);
                            return reject(err);
                        }
                        // rows fetch
                        console.log(data);
                        let response =  {
                            status: AppProperties.SUCCESS,
                            code: AppProperties.SUCCESS_CODE,
                            data: data,
                        };
                        resolve(response);
                    });
                });
            }
        });

        server.route({
            method: 'POST',
            path: '/cafes/employees',
            handler: async function (request, h) {
                const { firstName : first_name, lastName : last_name, cafeID, joinDate, mobileNumber: mobile_number } = request.payload as EmployeeRequestInterface;
                const uuid = Helper.generateUUIDForEmployee();
                let emplRecord = { first_name, last_name, mobile_number, uuid };
                let emplSqlQuery = "INSERT INTO employees SET ? ";
                return new Promise((resolve, reject) => {
                    db.query("select ce.cafeid, ce.employeeid from employees em inner join cafe_employees ce on ce.employeeid = em.uuid where em.mobile_number = '" + mobile_number + "'", (err, result, fields) => {
                        if(err) {
                            console.error(err);
                            return reject(err);
                        }
                        if (result.length > 0) {
                            let response;
                            if (result[0].cafeid === cafeID) {
                                 response =  {
                                    status: AppProperties.SUCCESS,
                                    code: AppProperties.SUCCESS_CODE,
                                    message: 'Employee already exits with same compnay!'
                                };
                            } else {
                                response =  {
                                    status: AppProperties.SUCCESS,
                                    code: AppProperties.SUCCESS_CODE,
                                    message: 'Employee already exits with other compnay!'
                                };
                            }
                            return resolve(response);
                        } else {
                            return db.query(emplSqlQuery, emplRecord, (err, result) => {
                                if(err) {
                                    console.error(err);
                                    return reject(err);
                                }
                                if (result.insertId) {
                                    let emplCafeSqlQuery = "INSERT INTO cafe_employees (cafeid, employeeid, join_date ) values ( '" + cafeID + "','" + uuid + "',STR_TO_DATE('" + joinDate + "'," + "'%d-%m-%Y') )";
                                    db.query(emplCafeSqlQuery, (err, result) => {
                                       if (err) {
                                           console.log(err);
                                           return reject(err);
                                       }
                                       if (result.insertId) {
                                            let response =  {
                                                status: AppProperties.SUCCESS,
                                                code: AppProperties.SUCCESS_CODE,
                                                message: 'Data has been inserted successfully!'
                                            };
                                            resolve(response);
                                       }
                                    }); 
                                };
                            });
                        }
                       
                    });
                });
            }
        });
    }
};