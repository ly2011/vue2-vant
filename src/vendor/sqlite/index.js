const sqlite = {
  db: null,
  /**
   * 打开sqlite数据库
   * @param dbName 数据库名称
   * @param options Object 其他的可配置项，eg：location
   * @return db sqlite数据库实例
   */
  openOrgetDatabase (dbName) {
    if (!this.db && window.sqlitePlugin) {
      this.db = window.sqlitePlugin.openDatabase({
        name: `${dbName}.db`,
        location: 'default'
      })
    }
    return this.db
  },
  /**
   * 关闭sqlite数据库
   */
  close () {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  },
  /**
   * 创建表
   * @param tableName
   * @param fields
   */
  createTable (tableName, fields = []) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      this.db.transaction(
        (tx) => {
          console.log('创建表SQL', `CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(', ')})`)
          tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(', ')})`)
        },
        (error) => {
          console.log(`${tableName }表创建失败: ${ error.message}`)
          resolve(error)
        },
        () => {
          console.log(`${tableName }表创建成功`)
          resolve({
            code: 1,
            message: 'OK'
          })
        }
      ) // end transaction
    }) // end promise
  },

  /**
   * 删除表
   * @param tableName
   */
  deleteTabel (tableName) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      this.db.transaction((tx) => {
        console.log('删除表SQL', `DROP TABLE IF EXISTS ${tableName}`)
        tx.executeSql(
          `DROP TABLE IF EXISTS ${tableName}`,
          (ts, rs) => {
            console.log('删除成功', rs)
            resolve(rs)
          },
          (ts, error) => {
            resolve(error)
          }
        ) // end executesql
      }) // end transaction
    }) // end promise
  },

  /**
   * 插入数据
   * @param tableName 表名
   * @param table 插入参数
   * 比如 table ={a:1,b:2,c:{d:1,f:2}} 则对应的表结构为 a  b  c 三个字段 c将存入json字符串
   */
  insertData (tableName, table) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      const headers = []
      const values = []

      for (const [key, value] of Object.entries(table)) {
        headers.push(key)
        const type = typeof value
        if (type === 'object' && !!value) {
          values.push(JSON.stringify(value))
        } else {
          values.push(value)
        }
      }
      const fieldName = headers.join(',')
      const valuesStr = headers.fill('?').join(',')
      this.db.transaction((tx) => {
        console.log('插入SQL', `INSERT INTO ${tableName} (${fieldName}) VALUES (${valuesStr})`, values)
        tx.executeSql(
          `INSERT INTO ${tableName} (${fieldName}) VALUES (${valuesStr})`,
          values,
          (ts, rs) => {
            console.log('插入成功', rs)
            resolve(rs)
          },
          (ts, error) => {
            console.log('插入错误', error)
            resolve(error)
          }
        ) // end executesql
      }) // end transaction
    }) // end promise
  },
  /**
   * 插入数据
   * @param tableName 表名
   * @param tableList 插入参数数组
   * 比如 table ={a:1,b:2,c:{d:1,f:2}} 则对应的表结构为 a  b  c 三个字段 c将存入json字符串
   */
  insertDataList (tableName, tableList) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      const insertIds = []
      this.db.transaction(
        (tx) => {
          tableList.forEach((table) => {
            const headers = []
            const values = []

            for (const [key, value] of Object.entries(table)) {
              headers.push(key)
              const type = typeof value
              if (type === 'object' && !!value) {
                values.push(JSON.stringify(value))
              } else {
                values.push(value)
              }
            }
            const fieldName = headers.join(',')
            const valuesStr = headers.fill('?').join(',')
            console.log('插入SQL', `INSERT INTO ${tableName} (${fieldName}) VALUES (${valuesStr})`, values)
            tx.executeSql(
              `INSERT INTO ${tableName} (${fieldName}) VALUES (${valuesStr})`,
              values,
              (ts, rs) => {
                if (!rs.rowsAffected) {
                  insertIds.push(rs.insertId)
                }
              },
              (ts, error) => {
                console.log('插入错误', error)
              }
            ) // end executesql
          })
        },
        (error) => {
          console.log('插入错误', error)
          resolve(error)
        },
        () => {
          resolve({
            code: 1,
            message: insertIds
          })
        }
      ) // end transaction
    }) // end promise
  },
  /**
   * 删除数据
   * @param tableName 表名
   * @param where 删除条件 'id=? and name = ?'
   * @param param 匹配的参数
   */
  deleteData (tableName, where, param) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      this.db.transaction((tx) => {
        console.log('删除表SQL', `DELETE FROM ${tableName} WHERE ${where}`, param)
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE ${where}`,
          param,
          (ts, rs) => {
            if (rs.rowsAffected > 0) {
              resolve({
                code: 1,
                message: '删除成功'
              })
            } else {
              resolve({
                code: 5,
                message: '删除失败'
              })
            }
          },
          (ts, error) => {
            console.log('插入错误', error)
            resolve(error)
          }
        ) // end executesql
      }) // end transaction
    }) // end promise
  },
  /**
   * 清空数据
   * @param tableName sql脚本，数组，支持多个sql
   * [
          'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
          [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
          [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
        ]
   */
  cleanData (tableName) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      this.db.sqlBatch(
        [`DELETE from ${tableName}`, ['UPDATE sqlite_sequence SET seq = 0 where name =?', [tableName]]],
        () => {
          resolve({
            code: 1,
            message: '操作成功'
          })
        },
        (error) => {
          console.log('清除数据错误', error)
          resolve(error)
        }
      )
      // this.db.transaction((tx) => {
      //   tx.sqlBatch([
      //     `DELETE from ${tableName}`,
      //     ['UPDATE sqlite_sequence SET seq = 0 where name =?', [tableName]]
      //   ], function() {
      //     resolve({
      //       code: 1,
      //       message: '操作成功'
      //     })
      //   }, function(error) {
      //     resolve(error)
      //   })
      // }) // end transaction
    }) // end promise
  },
  /**
   * 更新数据
   * @param tableName 表名
   * @param table 插入参数
   * @param where 更新条件 'id=? and name = ?'
   * @param param 匹配的参数
   * @returns 注意取出的对象进行json序列化
   */
  updateData (tableName, table, where, param) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      const headers = []
      const values = []

      for (const [key, value] of Object.entries(table)) {
        headers.push(key)
        values.push(value)
      }

      const conditon = values.concat(param)
      let setParam = ''
      headers.forEach((item) => {
        setParam = `${setParam + item } = ?, `
      })
      if (setParam !== '') {
        setParam = setParam.substr(0, setParam.length - 2)
      }
      this.db.transaction((tx) => {
        console.log('更新SQL', `UPDATE ${tableName} SET ${setParam} WHERE ${where}`, conditon)
        tx.executeSql(
          `UPDATE ${tableName} SET ${setParam} WHERE ${where}`,
          conditon,
          (ts, rs) => {
            console.log('更新成功', rs)
            resolve(rs)
          },
          (ts, error) => {
            console.log('更新失败', error)
            resolve(error)
          }
        ) // end executesql
      }) // end transaction
    }) // end promise
  },
  /**
   * 查询数据
   * @param tableName 表名
   * @param where 删除条件 'id=? and name = ?'
   * @param param 匹配的参数 [1,2] 数组
   * @param rows 查找的字段 不传为所有字段*
   * @returns 注意取出的对象进行json序列化
   */
  selectData (tableName, where, param, rows) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      let row = '*'
      if (rows) {
        row = rows.join(',')
      }
      this.db.transaction((tx) => {
        console.log('查询SQL', `SELECT ${row} FROM ${tableName} WHERE ${where}`, param)
        tx.executeSql(
          `SELECT ${row} FROM ${tableName} WHERE ${where}`,
          param,
          (ts, rs) => {
            const dataList = []
            if (rs.rows.length > 0) {
              for (let i = 0; i < rs.rows.length; i++) {
                dataList.push(rs.rows.item(i))
              }
            }
            resolve({
              code: 1,
              message: dataList
            })
          },
          (ts, error) => {
            console.log('查询错误', error)
            resolve(error)
          }
        ) // end executesql
      }) // end transaction
    }) // end promise
  },
  /**
   * 清空数据
   * @param sqlList sql脚本，数组，支持多个sql
   * [
          'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
          [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
          [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
        ]
   */
  sqlBatch (sqlList) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve({
          code: 5,
          message: '请先打开数据库链接'
        })
      }
      this.db.sqlBatch(
        sqlList,
        () => {
          console.log('---------------- 执行 sqlBatch 成功----------------', sqlList)
          resolve({
            code: 1,
            message: '操作成功'
          })
        },
        (error) => {
          console.log('---------------- 执行 sqlBatch 失败----------------', error)
          resolve(error)
        }
      )
      // this.db.transaction((tx) => {
      //   tx.sqlBatch(sqlList, function() {
      //     resolve({
      //       code: 1,
      //       message: '操作成功'
      //     })
      //   }, function(error) {
      //     resolve(error)
      //   })
      // }) // end transaction
    }) // end promise
  }
}
export default sqlite
