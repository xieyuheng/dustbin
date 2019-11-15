<html>
  <head>
    <title>POST Form</title>
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
  </head>
  <body>
    <div style="margin: 20px">
      <h1>A POST Form</h1>
      <?php if(empty($_POST)): ?>
        <form name="user" method="post" class="pure-form pure-form-stacked">
          Email:
          <input type="text" length="60" name="email" />
          Display name:
          <input type="text" length="60" name="display_name" />
          <input type="submit" value="Go" class="pure-button pure-button-primary"/>
        </form>
      <?php else:
      // echo "new user email: " . filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
      echo "new user email: " . $_POST["email"];
      echo "<br>";
      echo "new user name: " . $_POST["display_name"];
      echo "<br>";
      endif; ?>
    </div>
  </body>
</html>
