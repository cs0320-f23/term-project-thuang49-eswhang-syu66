import { clientId, client_secret } from "../../private/keys";
import { AuthKey } from "../handlerUtilities/authObj";

import {Request, Response} from 'express'
import { errorMap, successMap } from "../server";


export async function initialAuth(req : Request, res : Response, token : AuthKey) {

      const auth_url = 'https://accounts.spotify.com/api/token' 
        
      const body = new URLSearchParams({
          grant_type: `client_credentials`    
      });
      const headers = {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(clientId + ':' + client_secret).toString('base64')
      }

      // executing a post request.
      let response = await fetch(auth_url, {
          method: "POST",
          headers: headers, 
          body : body
      }).then(res => res.json())

      if ("token_type" in response && response.token_type == "Bearer") {
        token.setAuthToken(response.access_token)
        let clientResponse : successMap = {
            status: "success",
            data: "client authenticated"
        }
        res.send(clientResponse)
      } else {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "client_auth",
            error_message: "client failed to authenticate; please reload page or contact admin."
        }
        res.send(clientResponse)
      }
    };
      
  