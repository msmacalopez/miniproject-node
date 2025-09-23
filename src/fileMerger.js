export const makeHTMLstring = (userArray) => {
  const str = userArray.reduce((acc, user) => {
    return user.length
      ? acc + `<li> ${user.split(",")[0]}: ${user.split(",")[1]} </li>`
      : acc;
  });
  return (
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous"
    />
    <!-- 7) I can pull style.css because i have the static path to it  -->
    <link rel="stylesheet" href="style.css" />
    <title>User Dairy</title>

    <style>
      /* body {
        margin: 0;
      }
      .wrapper {
        font-size: 2rem;
      }
      nav {
        background: black;
        color: white;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      a {
        color: white;
        margin-right: 15px;
        text-decoration: none;
      } */
    </style>
  </head>
  <body>
    <div class="wrapper">
      <nav>
        <div>SSR</div>
        <div>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>
      
      <div class="container">
      <h1>Welcome to Our community</h1>
      <hr />
        <ul>
        ` +
    str +
    `</ul>
      </div>
    </div>
  </body>
</html>
`
  );
};
