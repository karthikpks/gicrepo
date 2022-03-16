import mysql from 'mysql';

const db = mysql.createPool({
  connectionLimit: 100,  
  host: 'localhost',
  user: 'root',
  password: 'walkmake',
  database: 'cafedb'
});

db.getConnection((err : any) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');

  let createEmployeesTable = `create table if not exists employees(
      id int primary key auto_increment,
      first_name varchar(255) not null,
      last_name varchar(255) not null,
      uuid varchar(255) not null,
      status int default 1,
      UNIQUE KEY (uuid )
  )`;

  let createCafesTable = `create table if not exists cafes(
    id int primary key auto_increment,
    name varchar(255)not null,
    description varchar(255)not null,
    employees int default 0,
    uuid varchar(255) not null,
    logo varchar(255)not null,
    status int default 1,
    UNIQUE KEY (uuid )
)`;


let createCafeEmployeesTable = `create table if not exists cafe_employees(
  id int primary key auto_increment,
  cafeid varchar(255) not null,
  employeeid varchar(255) not null,
  join_date DATETIME,
  end_date DATETIME,
  status int default 1,
    CONSTRAINT FK_CafesTable FOREIGN KEY (cafeid) REFERENCES cafes(uuid),
    CONSTRAINT FK_EmployeesTable FOREIGN KEY (employeeid) REFERENCES employees(uuid)
)`;


db.query(createEmployeesTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  };
});

db.query(createCafesTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  };
});

db.query(createCafeEmployeesTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  };
});
  
});

export default db;