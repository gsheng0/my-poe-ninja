export const constructorMethod = (app) => {
    app.get('/get', async(req, res) => {
        res.json({message: "Hello World"})
    })

    app.post('/signup', async (req, res) => {
        const params = req.body;
        let name = params.name;
        let username = params.username;
        let password = params.password;

    });

    app.post("/login", async (req, res) => {


    });

    app.use("/logout", (req, res) => {

            res.status(400).json({error: e});
    })
    app.use('/recipes', recipeRouter);
  
    app.use('*', (req, res) => {
      res.status(404).json({error: 'Not found'});
    });
  };