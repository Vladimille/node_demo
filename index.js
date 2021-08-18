// 安装mongoose
// 导入mongoose
// 连接mongodb数据库
// 建立schema
// 建立model
// crud操作
const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const ListSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  todoid: {
    type: Number,
    required: true
  }
})

const user_model = mongoose.model("User",UserSchema,"user")

const list_model = mongoose.model("List",ListSchema,"list")

app.use(express.urlencoded({extended: false}))

//注册
app.post("/enroll",(req,res) => {
  //操作mongodb的读写
  console.log(req.body)
  user_model.find({"number":req.body.number},function (err,result){
    if (err) return handleError(err);
    if (result.length > 0) {
      res.send(200,{code:0})
    } else {
      login_model.insertMany(req.body)
      res.send(200,{code:1})
    }
  })
})
//登录
app.post("/login",(req,res) => {
  console.log(req.body)
  user_model.find({"number":req.body.number},function (err,result){
    if (err) return handleError(err);
    if (result.length > 0) {
      if (req.body.number == result[0].number && req.body.password == result[0].password) {
        res.send(200,{code:1})
      } else {
        res.send(200,{code:0})
      }
    } else {
      res.send(200,{code:0})
    }
  })
})
//添加
app.get("/additem",(req,res) => {
  list_model.insertMany(req.query)
  res.send(200,{code:1})
})
//删除
app.get("/deleteitem",(req,res) => {
  list_model.find({"number":req.query.number,"todoid":req.query.todoid},function(err,result){
    if (err) return handleError(err);
    if (result.length > 0) {
      list_model.deleteOne({"number":req.query.number,"todoid":req.query.todoid}, function(err,res) {
        if (err) {
          return handleError(err);
          console.log(err)
        } else {
          console.log(res)
        }
      })
      res.send(200,{code:1})
    } else {
      res.send(200,{code:0})
    }
  })
})
//查找
app.get("/getlist",(req,res) => {
  list_model.find({"number":req.query.number},function(err,result){
    if (err) return handleError(err);
    console.log(result)
    res.send(200,result)
  })
})
//编辑
app.post()

app.listen(8080, () => {
  console.log("server is running at http://127.0.0.1:8080")
})