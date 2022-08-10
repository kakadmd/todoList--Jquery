//  获取数据函数
// 刷新页面不会丢失数据 需要从本地存储中获取数据
 function getData() {
    // var data = localStorage.getItem('todolist') || '[]'
    // return JSON.parse(data)
    // console.log(data)
    var data = localStorage.getItem('todolist')
    if(data) {
        data = JSON.parse(data)
        // parse 转化成数组
    }else {
        data = []
    }
    return data
 }
 getData()

//  接收数据函数
function saveData(data) {
    localStorage.setItem('todolist', JSON.stringify(data))
    // stringify转化成字符串
}

// 给title绑定键盘弹起事件
$('#title').on('keyup',function(e) {
    if(e.keyCode === 13) {
        // 按下回车键 13
        // console.log(1)
        if($(this).val().trim().length == 0) {
            // trim会把字符串前后空格去掉
            alert('请输入内容')
            return
        }

        // 页面中的数据,都要从本地存储里面获取,这样刷新页面不会丢失数据
        var local = getData() //接收的是getData()的返回值 是本地存储的数据
        local.push({
            title:$(this).val(),
            done:false  //正在进行中
        })
        saveData(local)
        $(this).val('')
        load()
    }
})

// 删除操作
$('ol,ul').on('click','a',function() {
    var i = $(this).prop('id')
    // console.log(i)
    var data = getData()
    data.splice(i, 1)
    // console.log(data)
    saveData(data) //更新数据 把data重新传入
    load() //调用渲染页面的函数
})

// 正在进行和已完成切换
$('ol, ul') .on('click','input',function() {
    var data = getData()
    var sss = +$(this).siblings('a').prop('id')
    // console.log(sss)
    data[sss].done = $(this).prop('checked')
    // console.log(data)
    saveData(data) 
    load()

})

// 渲染数据到页面
function load() {
    // 渲染数据 先读取本地数据
    var data = getData()
    // console.log(data)
    // 清空ol ul 里面的数据
    $('ol,ul').empty() //清空子节点

    var todoCount = 0 //正在进行的数量
    var doneCount = 0 //已经完成的数量

    // 遍历读取的数据 $.each
    $.each(data,function(index,ele) {
        // console.log(ele)
        if(ele.done) {
            // done 为true ，表示已经完成的
            doneCount++
            $('ul').prepend(`<li><input type = "checkbox" checked/>
            <p>${ele.title}</p><a id="${index}" href="javascript:;"></a></li>`)

        }else{

            todoCount++
            $('ol').prepend(`<li><input type = "checkbox"/>
                            <p>${ele.title}</p><a id="${index}" href="javascript:;"></a></li>`)
        }
    })
    $('#todocount').text(todoCount)
    $('#donecount').text(doneCount)
}
load()

