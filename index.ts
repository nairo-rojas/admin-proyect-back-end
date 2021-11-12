import connectDB from "./db/db";
import { UserModel } from "./models/user";
import { ProjectModel } from "./models/project";
import {
  Enum_ObjectiveType,
  Enum_UserRole,
  Enum_UserStatus,
} from "./models/enums";
import { ObjectiveModel } from "./models/objective";

//INDEX FORMA 4: One to Many=> Quitar la parte de "proyectos" del archivo de Objetive y agregar los "objetivos" a "Proyectos"

const main = async () => {
  await connectDB();
  
    //CREAR EL USUARIOS

    const usuarioInicial = await UserModel.create({
      nombre: "Mery",
      apellido: "Grimaldos",
      documento: "23324410",
      correo: "rmerygrim@gmail.com",
      rol: Enum_UserRole.administrador,
      estatus: Enum_UserStatus.autorizado,
    });

    //1. CREAR LOS OBJETIVOS

    const objetivoGeneral = await ObjectiveModel.create({
      descripcion: "Soy el objetivo General del proyecto",
      tipo: Enum_ObjectiveType.general,
    });

    const objetivoEspecifico1 = await ObjectiveModel.create({
      descripcion: "Soy el primer objetivo especifico del proyecto",
      tipo: Enum_ObjectiveType.especifico,
    });

    const objetivoEspecifico2 = await ObjectiveModel.create({
      descripcion: "Soy el segundo objetivo especifico del proyecto",
      tipo: Enum_ObjectiveType.especifico,
    });

    //2. CREAR PROYECTO Y AGREGAR EL ARRAY DE OBJETIVOS

    const proyectoCreado = await ProjectModel.create({
      nombre: "Proyecto 1",
      fechaInicio: new Date("2021/11/11"),
      fechaFinal: new Date("2021/11/19"),
      presupuesto: 150000,
      lider: usuarioInicial._id,
      objetivos: [
        objetivoGeneral._id,
        objetivoEspecifico1._id,
        objetivoEspecifico2._id,
      ],
    });
    console.log("El proyecto creado es: ", proyectoCreado);
  };

main();
