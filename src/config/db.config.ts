import { Sequelize } from "sequelize-typescript";

// import { Dog } from "../models/DogModels";
import { Tutorial } from "../models/TutorialModel";

const connection = new Sequelize({
    dialect: 'mariadb',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'sequelize',
    logging: true,
    models: [Tutorial]
})

export default connection;