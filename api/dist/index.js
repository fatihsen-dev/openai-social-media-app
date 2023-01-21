"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./src/routes/users"));
const photo_1 = __importDefault(require("./src/routes/photo"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use(express_1.default.static("src/public"));
app.use(body_parser_1.default.json());
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listen ${process.env.PORT || 5000}`);
});
app.use("/users", users_1.default);
app.use("/photo", photo_1.default);
(async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(`${process.env.DB_URL}`);
        return console.log("connected db");
    }
    catch (err) {
        return console.log(err);
    }
})();
