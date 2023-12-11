
export class AuthKey {
    private userAuthToken: string | undefined = undefined;
  
    // Update userAuthToken
    setAuthToken(token: string) {
      this.userAuthToken = token;
    }

    // clears the existing token
    clearAuthToken(token: string) {
        this.userAuthToken = undefined
    }
  
    // Get userAuthToken
    getAuthToken() {
        if (this.userAuthToken == undefined) {
            return undefined
        } else {
            return this.userAuthToken.slice();
        }
    }


  }
  