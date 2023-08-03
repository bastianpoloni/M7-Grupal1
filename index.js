import express, { query } from 'express';
import pg from 'pg';

const {Client} = pg;
const {Pool} = pg;

const config = {
    user: 'bastianpoloni',
    database: 'always_music',
    password: '',
    port: 5432
};


const client = new Client(config);
const pool = new Pool(config);




const opcion = process.argv[2];
const nombre = process.argv[3];
const rut = process.argv[4];
const curso = process.argv[5];
const nivel = process.argv[6];

pool.query (`INSERTO INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', ${curso}, '${nivel}')`, (err, res) => {
    if (err) {
        console.log(err);
    }else{
        console.log("Estudiante insertado correctamente");
    }
});

switch (opcion) {
    case 'nuevo':
        try{
            await nuevoAlumno(nombre,rut,curso,nivel);
        }catch (error){
            console.log(error);
        }
        break;
    case 'editar':
        try{
            await updateAlumno(nombre,rut,curso,nivel);
        } catch (error){
            console.log(error);
        }
        break;
    case 'eliminar':
        pool.query (`DELETE FROM estudiantes WHERE rut = '${rut}'`, (err, res) => {
            if (err) {
                console.log(err);
            }else{
                console.log("Estudiante eliminado correctamente");
            }
        });
    case 'consulta':
        pool.query (`SELECT * FROM estudiantes`, (err, res) => {
            if (err) {
                console.log(err);
            }else{
                console.log(res.rows);
            }
        });
    case 'rut':
        pool.query (`SELECT * FROM estudiantes WHERE rut = '${rut}'`, (err, res) => {
            if (err) {
                console.log(err);
            }else{
                console.log(res.rows);
            }
        });
}


const nuevoAlumno = async(nombre,rut,curso,nivel)=>{
    // el await va cuando se llama la funcion, los pool.query que tienes arriba no tienen await
    // debiera de tener un valor de entrada onda los parametros nombre rut
    pool.query (`INSERTO INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', ${curso}, '${nivel}')`, (err, res) => {
        if (err) {
            console.log(err);
        }else{
            console.log("Estudiante insertado correctamente");
        }
    });
};

const updateAlumno = async(nombre,rut,curso,nivel)=>{
    pool.query (`UPDATE estudiantes SET nombre = '${nombre}', rut = '${rut}', curso = ${curso}, nivel = '${nivel}' WHERE rut = '${rut}'`, (err, res) => {
        if (err) {
            console.log(err);
        }else{
            console.log("Estudiante editado correctamente");
        }
    });
}
// entonces esto lo llamas asi
// try {
//     // await nuevoalumno("nombre1","rut1","cursox","nivel1");
    
// } catch (error) {
    
// }
// esto es para que el codigo espere que se realice toda la funcion antes de  seguir 
// deberia de ir dentro de un try-cach
// aah entiendo 
//aaah x2
// teniendo el codigo coon los err en el los if se supone que es lo mismo pero a nivel estructura evita que se caiga aunque ahi nose bien
//aaah x3