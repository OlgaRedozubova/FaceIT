var express = require('express'); //подключаем express
var fs = require('fs');

var app = express(); //создаем объект приложения
var tasksRouter = express.Router(); //обрабатывает все запросы по маршруту /tasks

app.use(express.static(__dirname + "/public"));

tasksRouter.route("/")
  .get(function(req, res){
    const content = fs.readFileSync("tasks.json", "utf8");
    const tasks = JSON.parse(content);
    res.send(tasks);
  });

tasksRouter.route("/:id")
  .get(function(req, res){
    res.send(`Задание ${req.params.id}`);
  });
app.use("/tasks", tasksRouter);

app.get('/', function(req, res){
  res.send('Hello');
});

app.use(function(request, response, next){

  var now = new Date();
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n");
  next();
});






app.listen(3000); //начинаем прослушивать подключение к порту 3000
