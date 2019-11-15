<html>
  <head>
    <title>GET Form</title>
  </head>
  <body>
    <div>
      <h1>A GET Form</h1>
      <?php if(empty($_GET)): ?>
        <form name="search"
              method="get">

          Category:
          <select name="category">
            <option value="entertainment">Entertainment</option>
            <option value="sport">Sport</option>
            <option value="technology">Technology</option>
          </select>
          <br>

          Rows per page:
          <select name="rows">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <br>

          <input type="submit"
                 value="search"/>
          <br>

        </form>
      <?php else: ?>
        <p>Wonderfully filtered search results</p>
        <?php
        echo $_GET;
        ?>
      <?php endif; ?>
    </div>
  </body>
</html>
