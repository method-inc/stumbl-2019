import EventEmitter from 'events';

const API_URI = process.env.VUE_APP_STMBL_API_URI;
const LOGGED_IN = 'dsw_logged_in';
const TOKEN = 'dsw_user_token';
const EXPIRES_AT = 'dsw_expires_at';

interface Credentials {
  email_address: string;
  password: string;
}

interface ConfirmationCreds {
  confirmation_id: string;
  password: string;
  password_confirmation: string;
}

interface Email {
  email_address: string;
}

interface RecoveryCreds {
  recovery_id: string;
  password: string;
  password_confirmation: string;
}

class AuthService extends EventEmitter {
  /**
   * Log in
   */
  public logIn = async (creds: Credentials) => {
    const payload = {
      data: {
        attributes: {
          ...creds,
        },
      },
    };
    await fetch(API_URI + '/authentications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((res) => {
        this.localLogin(res);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  /**
   * Log out
   */
  public logOut = () => {
    localStorage.removeItem(LOGGED_IN);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRES_AT);

    this.emit('logout');
  }

  /**
   * Sign Up
   */
  public signUp = async (creds: Credentials) => {
    const payload = {
      data: {
        attributes: {
          ...creds,
        },
      },
    };
    await fetch(API_URI + '/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    .then((res: any) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * Confirm Account
   */
  public confirmation = async (creds: ConfirmationCreds) => {
    const { password, password_confirmation } = creds;
    const passwords = { password, password_confirmation };
    const payload = {
      data: {
        attributes: {
          ...passwords,
        },
      },
    };
    fetch(API_URI + '/confirmations/' + creds.confirmation_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    .then((res: any) => {
      this.localLogin(res);
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * Reset Password
   */
  public recovery = async (creds: Email) => {
    const payload = {
      data: {
        attributes: {
          ...creds,
        },
      },
    };
    fetch(API_URI + '/recoveries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((res) => {
        return res.ok ? true : false;
      });
  }

  /**
   * Reset Account Password
   */
  public reset = async (creds: RecoveryCreds) => {
    const { password, password_confirmation } = creds;
    const passwords = { password, password_confirmation };
    const payload = {
      data: {
        attributes: {
          ...passwords,
        },
      },
    };
    fetch(API_URI + '/recoveries/' + creds.recovery_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    .then((res: any) => {
      this.localLogin(res);
    }).catch((error) => {
      // console.log(error);
    });
  }

  public isAuthenticated = () => {
    const exp = localStorage.getItem(EXPIRES_AT) || '';
    const now = new Date().getTime() / 1000;
    const loggedIn = localStorage.getItem(LOGGED_IN);

    return parseInt(exp, 10) > now && loggedIn ? true : false;
  }

  /**
   * Local login - sets token in localStorage and emits event to app
   */
  private localLogin = async (res: any) => {
    const expires = Math.floor(new Date(res.data.attributes.expires_at).getTime() / 1000);

    localStorage.setItem(LOGGED_IN, 'true');
    localStorage.setItem(TOKEN, res.data.attributes.token);
    localStorage.setItem(EXPIRES_AT, expires.toString());

    this.emit('login');
  }

  private loginError = () => {
    this.emit('loginError', 'Something went wrong. Please try again.');
  }
}

export default new AuthService();
