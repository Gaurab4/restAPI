const pool = require('../../db');

const queries = require('./queries');


const getStudents = (req,res) => {
    pool.query(queries.getStudents,(error , results) =>{
        try{
            res.status(200).json(results.rows);
        }catch(error){
            throw error;
        }
    })
}

const getStudentById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById ,[id] , (error, results) => {
        try {
            res.status(200).json(results.rows);
        } catch (error) {
            throw error;
        }
    });
};

const addStudent = (req,res) => {
    const {name , email,age,dob} = req.body;

    //check if email is there 

    pool.query(queries.checkEmailExists , [email], (error, results) => {
        if(results.rows.length){
            res.send("Email is already taken....");
        }
        // adding the stundet to db 

        pool.query(queries.addStudent, [name,email,age,dob] , (error , results) => {
            if(error){
                throw error;
            }
            res.status(201).send("Student has been created....gg");
        });
    });

};

const deleteStudent  = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById , [id] , (error , results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound) {
                res.send("there is no studnet braaawww...");
        }else{
            pool.query(queries.deleteStudent , [id] , (error, results) => {
                if(error) throw error;
                res.status(200).send("Student removed successfully...");
            })
            
        }

        
    });
};

const updateStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name } = req.body;

    pool.query(queries.getStudentById , [id] , (error ,results) => {
        if(!results.rows.length){
            res.send("Student don't exist in db");
        }else{
            pool.query(queries.updateStudent , [ name ,id ] , (error , results ) => {
                if(error ) throw error;
                res.status(200).send("student name is updated...gg");
            })
        }
    });


};


module.exports = {
    getStudents,
    addStudent,
    getStudentById,
    deleteStudent,
    updateStudent
};
