function inviteUserEmailTemplate(email, token) {
  return (` <!doctype html>
                  <html>
                    <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    <body style="font-family: sans-serif;">
                      <div style="display: block; margin: auto; max-width: 600px;" class="main">
                        <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
                        <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
                        <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
                        <p>Now send your email using our fake SMTP server and integration of your choice!</p>
                        <p>Good luck! Hope it works.</p>
                        <h1>Welcome to glooming center</h1>
                        <p>You can login using your credentials</p>
                        <p>Email: ${email}</p>
                        <p>Password: ${token}</p>
                        <p>You can login to the admin portal using this link: <a href="http://localhost:7000/api/v1/signup">http://localhost:7000/api/v1/signup</a></p>
                      </div>
                      <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                      <style>
                        .main { background-color: white; }
                        a:hover { border-left-width: 1em; min-height: 2em; }
                      </style>
                    </body>
                  </html>
              `);
}

function resetPasswordEmailTemplate(token) {
  return (` <!doctype html>
                  <html>
                    <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    <body style="font-family: sans-serif;">
                      <div style="display: block; margin: auto; max-width: 600px;" class="main">
                        <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">You requested to change your password</h1>

                        <p>Visit this url to reset your password: ${token}</p>
                        <p>You can login to the admin portal using this link: <a href="http://localhost:7000/api/v1/signup">http://localhost:7000/api/v1/signup</a></p>
                      </div>
                      <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                      <style>
                        .main { background-color: white; }
                        a:hover { border-left-width: 1em; min-height: 2em; }
                      </style>
                    </body>
                  </html>
              `);
}

module.exports = {
  inviteUserEmailTemplate,
  resetPasswordEmailTemplate,
};
