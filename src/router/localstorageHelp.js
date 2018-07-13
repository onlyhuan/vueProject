// // localstorage 存储数据的格式 {goodslist:[{'id':id,count:1},{'id':id,count:1},{'id':id,count:1}]}
// // localstorage 存储的数据都是字符串形式 所以要转成对象


// // 读取laocalstorage数据
// export function getData(){
//     return  JSON.parse( localStorage.getItem('goodslist') || '[]');  
// }
// // 写入
// // 先要判断getdate里有没有 id，有count累加，没有追加
// export function setData(json){
//     let data = getData();
//     let hasData = false;  // 假设 没有json.id

//     data.forEach(item => {
//         if(item.id === json.id){
//             hasData = true;
//             item.count += json.count;
//         }
//     });

//     if(!hasData){
//         data.push(json);
//     }

//     localStorage.setItem('goodslist', JSON.stringify(data))
      
//   }
 

// {goodslist: [{id: 1, count:2}, {....}]}

// 读取本地存储中的数据
// 本地存储，存储的是字符串，所以要转换成对象
export function getData() {
    return JSON.parse( localStorage.getItem('goodslist') || '[]');
  }
  
export function setData(json) {
    // 获取数据
    let data = getData();
    // 设置数据
    // 判断之前的数据中是否有json.id
  
    let hasData = false;  // 假设 没有json.id
    data.forEach(item => {
      if (item.id == json.id) {
        hasData = true;
        // 如果有， 累加
        item.count += json.count;
      } 
    });
    // 如果没有，添加push
    if (!hasData) {
      data.push(json);
    }
  
    localStorage.setItem('goodslist', JSON.stringify(data));
  }

  // 根据id删除本地存储中的数据
  export function deleteData(id) {
    let data = getData();
    // 根据id找到对应数据的索引  es6新增方法
    let index = data.findIndex(item =>{
      // 满足条件返回对应数据的索引值
      return item.id == id;
    })
    // 删除数组中的一个元素
    data.splice(index, 1);
    localStorage.setItem('goodslist', JSON.stringify(data));
  }

  export function update(json){
    // {id: 1, num: -1}
    let data = getData();
    data.forEach(item =>{
      if(item.id == json.id){
        item.count += json.num;
      }
    })
    localStorage.setItem('goodslist', JSON.stringify(data));
  }