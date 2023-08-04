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
        const query = `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', ${nivel});`;
        console.log(query);
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
       const res = await pool.query (`UPDATE estudiantes SET nombre = '${nombre}', rut = '${rut}', curso = '${curso}', nivel = ${nivel} WHERE rut = '${rut}'`);
       console.log("Estudiante editado con exito");                 
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
    }
};

async function eliminarAlumno(nombre){
    try{
       await pool.query (`DELETE FROM estudiantes WHERE rut = '${nombre}'`);
       console.log(`Estudiante ${nombre} eliminado con exito`);
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
    }
};

async function consulta(){
    try{
        const res = await pool.query (`SELECT * FROM estudiantes`);
        console.log(res.rows);
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
    }           
};

async function rutAlumno(rut){
    try{
        const res = await pool.query (`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
        console.log(res.rows);
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
    }
};

pool.connect();

switch (opcion) {
    
    case 'nuevo':    
        nuevoAlumno(nombre,rut,curso,nivel);
        break;
    case 'editar':
        editarAlumno(nombre,rut,curso,nivel);
        break;
    case 'eliminar':
        eliminarAlumno(nombre);
        break;
    case 'consulta':
        consulta();     
        break;
    case 'rut':
        rutAlumno(nombre);
        break;
    default:
        console.log('Opcion no valida');
        break;
};
