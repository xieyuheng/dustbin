    app.router.use((req, res, next) => {
      if (req.method === "OPTIONS") {
        res.set({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        })
        res.status(200).end()
      } else {
        res.set({
          "Access-Control-Allow-Origin": "*",
        })
        next()
      }
    })
