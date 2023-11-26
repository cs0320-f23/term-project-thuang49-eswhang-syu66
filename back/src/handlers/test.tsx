// this file is purely to test the access token state
import {Request, Response} from 'express'
import { errorMap, successMap } from '../server'
import { AuthKey } from '../handlerUtilities/authObj'



export function test(req : Request, res: Response, userAuthToken: AuthKey) {

    if (userAuthToken.getAuthToken() == undefined) {
        let response : errorMap = {
            status: "error",
            error_type: "faulty_auth_token",
            error_message: "User authentication token is currently empty",
        }
        res.send(response)
    } else {
        let response : successMap = {
            status: "success",
            data: {
                token: userAuthToken.getAuthToken()
            }

        }
        res.send(response)
    }
    console.log(userAuthToken)
}