import express from 'express';
import pg from 'pg';

const {Pool} = pg;

const config = {
    user: 'bastianpoloni',
    password: '',
    database: 'always_music',    
    port: 5432
};

const pool = new Pool(config);

const opcion = process.argv[2];
const nombre = process.argv[3];
const rut = process.argv[4];
const curso = process.argv[5];
const nivel = process.argv[6];

 async function nuevoAlumno (nombre,rut,curso,nivel){
    console.log(nombre,rut,curso,nivel);
    try{
        await pool.connect();
        const query = `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', ${curso}, '${nivel}')`;
         await pool.query (query);
        console.log(`Estudiante ${nombre} agregado con exito`);
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
    }
};

async function editarAlumno (nombre,rut,curso,nivel){
    try{
       const res = await pool.query (`UPDATE estudiantes SET nombre = '${nombre}', rut = '${rut}', curso = ${curso}, nivel = '${nivel}' WHERE rut = '${rut}'`);
       console.log(res);                 
    } catch (error) {
        console.log(error);
    }
};

async function eliminarAlumno(rut){
    try{
       await pool.query (`DELETE FROM estudiantes WHERE rut = '${rut}'`);
       console.log(res);                 
    } catch (error) {
        console.log(error);
    }
};

async function consulta(){
    try{
        const res = await pool.query (`SELECT * FROM estudiantes`);
        console.log(res);
    } catch (error) {
        console.log(error);
    }            
};

async function rutAlumno(rut){
    try{
        const res = await pool.query (`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
 console.log (opcion);

switch (opcion) {
    
    case 'nuevo': 
    console.log("agregar alumno");   
        nuevoAlumno(nombre,rut,curso,nivel);
        break;

    case 'editar':
        console.log("editar alumno");
        editarAlumno(nombre,rut,curso,nivel);
        break;
    case 'eliminar':
        console.log("eliminar alumno");
        eliminarAlumno(rut);
        break;
    case 'consulta':
        console.log("tu consulta");
        consulta();     
        break;
    case 'rut':
        console.log("rut");
        rutAlumno(rut);
        break;
    default:
        console.log('opcion no valida');
        break;
};


// const nuevoAlumno = async(nombre,rut,curso,nivel)=>{
//     // el await va cuando se llama la funcion, los pool.query que tienes arriba no tienen await
//     // debiera de tener un valor de entrada onda los parametros nombre rut
//     pool.query (`INSERTO INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', ${curso}, '${nivel}')`, (err, res) => {
//         if (err) {
//             console.log(err);
//         }else{
//             console.log("Estudiante insertado correctamente");
//         }
//     });
// };

// const updateAlumno = async(nombre,rut,curso,nivel)=>{
//     pool.query (`UPDATE estudiantes SET nombre = '${nombre}', rut = '${rut}', curso = ${curso}, nivel = '${nivel}' WHERE rut = '${rut}'`, (err, res) => {
//         if (err) {
//             console.log(err);
//         }else{
//             console.log("Estudiante editado correctamente");
//         }
//     });
// }
// // entonces esto lo llamas asi
// // try {
// //     // await nuevoalumno("nombre1","rut1","cursox","nivel1");
    
// // } catch (error) {
    
// // }
// // esto es para que el codigo espere que se realice toda la funcion antes de  seguir 
// // deberia de ir dentro de un try-cach
// // aah entiendo 
// //aaah x2
// // teniendo el codigo coon los err en el los if se supone que es lo mismo pero a nivel estructura evita que se caiga aunque ahi nose bien
// //aaah x3

