const sqlPool = require('../config/dbConfig') // 配置文件
/*
  SUCCESS(-1, "请求成功！"),
  RESULT_EMPTY(0, "请求结果为空！"),
  PARAM_ERROR(1, "参数有误！"),
  RUNTIME_ERROR(2, "服务器异常！"),
  DATA_CONFLICT(3, "数据冲突！")
*/
// 操作语句函数封装
const query = (command, parm) => {
  return new Promise((resolve, reject) => {
    sqlPool.getConnection((err, connection) => {
      if (err) {
        console.log('连接数据库失败')
        return reject(2)
      }
      // console.log('数据库连接成功')
      connection.query(`${command}`, parm, (err, results) => {
        if (err) {
          connection.release() // 释放连接
          console.log('query操作失败，失败信息为：', err.sqlMessage)
          return reject(3)
        } else {
          connection.release() // 释放连接
          let res = JSON.parse(JSON.stringify(results)) // 处理res格式
          if (res.affectedRows > 0) {
            console.log('query操作成功')
            return resolve(-1)
          } else if (res.affectedRows === 0) {
            console.log('query操作失败')
            return reject(0)
          }
          return resolve(res)
        }
      })
    })
  }).catch(err => {
    console.log('错误code为:', err)
  })
}

class Database {
  // 查询
  select(prop = '*', table = 'null', parms = 'null') {
    return new Promise(resolve => {
      if (table === 'null') {
        resolve(1)
      }
      // 无条件查询
      if (parms === 'null') {
        let result = query(`SELECT ${prop} FROM ${table}`)
        resolve(result)
      }
      // WHERE 条件查询
      let result = query(`SELECT ${prop} FROM ${table} WHERE ?`, parms)
      resolve(result)
    }).catch(err => {})
  }

  // 插入
  insert(prop = {}, table = 'null') {
    return new Promise(resolve => {
      if (table === 'null') {
        // console.log('插入失败！请检查参数，如 db.insert(prop={}, tableName=String)')
        resolve(1)
      }
      let result = query(`INSERT INTO ${table} SET ? `, prop)
      resolve(result)
    }).catch(err => {})
  }
  // 删除
  delete(prop = 'null', table = 'null') {
    return new Promise(resolve => {
      if (table === 'null') {
        console.log('删除失败！请添加所查询的表单参数，如 db.delete(prop={}, tableName=String)')
        resolve(1)
      }
      let result = query(`DELETE FROM ${table} WHERE ?`, prop)
      return result
    }).catch(err => {})
  }
  // 修改
  update(updateProp = 'null', table = 'null', tag = 'null') {
    return new Promise(resolve => {
      if (updateProp === 'null') {
        console.log('修改失败！请添加所查询的表单参数，如 db.select(updateProp={} tableName=String,tag={})')
        resolve(1)
      }
      // 解析 目标参数
      let parmsString = ''
      Object.keys(updateProp).forEach(key => {
        parmsString = parmsString + `${key} = "${updateProp[key]}",`
      })
      parmsString = parmsString.substr(0, parmsString.length - 1)
      let result = query(`UPDATE ${table} SET ${parmsString} WHERE ? `, tag)
      resolve(result)
    }).catch(err => {})
  }
}
module.exports = new Database()