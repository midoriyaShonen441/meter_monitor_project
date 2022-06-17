const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server mqtt listen on port ${PORT}, http://localhost:${PORT}`);
});