import recipeRouter from "./recipes.js";


const constructorMethod = (app) => {
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
  
  export default constructorMethod;