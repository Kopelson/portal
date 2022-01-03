import React from "react";

import { uiConfig, auth } from "../../utils/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function LoginForm() {
    
    return (
    <div>
      <h2>Log In</h2>
      <form>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> 
      </form>
    </div>
    );
};

export default LoginForm;