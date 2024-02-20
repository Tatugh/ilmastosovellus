import {express} from "./deps.js";
import routes from "../routes/routes.js";

const app = express()
const port = 3001

//set views to be fetched from frontend/views and use .ejs files
app.set('view engine', 'ejs');


app.use("/", routes);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})