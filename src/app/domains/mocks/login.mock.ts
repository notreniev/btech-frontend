import { LoginModel } from "../models/login.model";
import { getUserMock } from "./user.mock";

export function getLoginMock(){
    const loginModel = new LoginModel();
    loginModel.user = getUserMock();
    loginModel.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJldmVydG9uLmNhbmV6QGdtYWlsLmNvbSIsImlzcyI6InRvZG8tYXBpIiwiaWF0IjoxNjQwMDQxMTU5fQ.s0LqlG5d6kQIOqiSz65l4vYnIA29_IiQo4sNSMhWApg";

    return loginModel;
}