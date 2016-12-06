/**
 * Created by gaochang on 2016/7/21.
 */

//当前被拖动元素(DOM对象)
var dragged;

//当前被拖动元素的标识(字符串)
var draggingElement;

//当前被拖动元素的对象副本
var dragEleCopyObj;

//当前被拖动元素的完整html
var dragEleCopyHtml;



//监听drag事件
document.addEventListener("drag", function( event ) {

}, false);

//监听dragstart事件
document.addEventListener("dragstart", function( event ) {
    //将当前被拖动元素赋值给全局变量dragged，以便其它函数使用
    dragged = event.target;

    //获取当前被拖动元素的html（包含父节点）
    if($(event.target).parent().attr("id") == "model-name-content"){
        dragEleCopyHtml = $(event.target).prop("outerHTML");
    } else {
        dragEleCopyHtml = $(event.target).parent().prop("outerHTML");
    }

    console.log(dragEleCopyHtml);

    //获取当前被拖动元素的对象副本
    dragEleCopyObj = event.target;

    //拖动开始时，将被拖动元素透明度变为50%并增加虚线边框（对于有class="done"的元素，表明已经拖入手机屏幕，不再监听）
    if(!($(dragged).hasClass("done"))){
        event.target.style.opacity = .5;
        event.target.style.border = "3px black dashed";
    }

    //判断被拖动元素的类型，从而给标识变量相应赋值
    //布局
    if(dragged.id == "nav"){
        draggingElement = "nav";
    }
    if(dragged.id == "banner"){
        draggingElement = "banner";
    }
    if(dragged.id == "picture"){
        draggingElement = "picture";
    }
    if(dragged.id == "text"){
        draggingElement = "text";
    }
    if($(dragged).hasClass("matrix")){
        draggingElement = "matrix";
    }
    if(dragged.id == "single"){
        draggingElement = "single";
    }
    if(dragged.id == "space"){
        draggingElement = "space";
    }
    if(dragged.id == "title"){
        draggingElement = "title";
    }
    if(dragged.id == "classify"){
        draggingElement = "classify";
    }

    //素材
    if(dragged.className == "source-movie"){
        draggingElement = "video";
    }
}, false);

//监听dragenter事件，当拖拽元素进入目标元素的时候触发
document.addEventListener("dragenter", function( event ) {

}, false);

//监听dragover事件
document.addEventListener("dragover", function( event ) {
    //拖拽元素在目标元素上移动的时候，阻止事件冒泡，否则ondrop事件不会被触发
    if(!($(dragged).hasClass("done"))) {
        event.preventDefault();
    }
}, false);

var i = 2;
//监听drop事件
document.addEventListener("drop", function( event ) {
    //编辑区右上角关闭按钮
    var delEle = $("<div class='delete'>X</div>");
    delEle.css({
        "z-index": "10",
        "display": "block",
        "color": "black",
        "width": "40px",
        "height": "40px",
        "top": "-10px",
        "right": "-7px",
        "position": "absolute",
        "text-align": "center",
        "line-height": "40px",
        "background": "orange",
        "border-radius": "50%"
    })
    //点击删除按钮移除当前元素
    delEle.click(function(){
        $(this).parent().remove();
    })

    if(!($(dragged).hasClass("done"))){
        //阻止事件冒泡
        event.preventDefault();

        //只要drop了，无论发生在哪个区域，都应该去掉虚线边框
        $(dragged).css("border", "none");
        $(dragged).css("opacity","1");

        //如果drop发生在屏幕预览区且拖动的是布局元素，对样式做如下处理
        if ($(event.target).hasClass("pane") && $(dragged).parent().parent().attr("id") == "layout-content") {
            $(dragged).addClass("done");
            $(dragged).css("width","95%");
            event.target.appendChild( dragged );
        } else {
            //否则，如果目标元素不是屏幕预览区，不作处理
            if(!($(event.target).hasClass("pane"))){

            } else {
                //否则，如果拖动元素不是布局元素，提示操作错误
                $('#layout-first-prompt').modal({
                    relatedTarget: this,
                    closeViaDimmer: 0
                });
            }
        }

        //如果拖拽的元素是“页面布局-导航”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "nav" && $(dragged).hasClass("done")){
            //复制一个新的导航布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "62px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"

            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("导航区<br>(请拖拽导航组件至该区域)");
            $(dragged).append(delEle);
        }

        //如果拖拽的元素是“页面布局-banner”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "banner" && $(dragged).hasClass("done")){
            //复制一个新的轮播布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "179px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("banner区<br>(点击编辑图片和描述信息)");
            $(dragged).append(delEle);

            //点击轮播区配置参数
            $(dragged).on('click', function() {
                $('#add-banner-prompt').modal({
                    relatedTarget: this,
                    height: 232,
                    width:800,
                    closeViaDimmer: 0,
                    onConfirm: function(e) {
                        //调整banner高度-默认值130px
                        $(dragged).css("height",$("#banner-height").val()==""?179:$("#banner-height").val());
                        //去除边框
                        $(dragged).css("border","none");

                        var carousel = $("<img src='images/carousel.gif'>");
                        carousel.css("width","100%");
                        carousel.css("height",$("#banner-height").val()==""?179:$("#banner-height").val());

                        $(dragged).html(carousel);
                        $(dragged).append(delEle);
                        //点击删除按钮移除当前元素
                        delEle.click(function(){
                            $(this).parent().remove();
                        })
                    },
                    onCancel: function(e) {
                    }
                });
                return false;
            });
        }

        //如果拖拽的元素是“页面布局-图片”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "picture" && $(dragged).hasClass("done")){
            //复制一个新的图片布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "160px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            /*$(dragged).html("图片区<br>");*/
            var previewPic = $("<div class='am-form-file'>" +
                "<button type='button' class='am-btn am-btn-default am-btn-sm am-padding-xs'>" +
                "<i class='am-icon-cloud-upload'></i> " +
                "请选择一张图片" +
                "</button>" +
                "<input id='upload-pic' name='picture' type='file' accept='.png,.jpg,.jpeg,.gif' multiple>" +
                "</div>"
            );
            $(dragged).append(previewPic);

            var fileInput = document.getElementById('upload-pic'),
                uploadPreview = dragged;

            // 使用H5的API进行图读取和预览-监听change事件
            fileInput.addEventListener('change', function () {
                // 获取File引用:
                var file = fileInput.files[0];

                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/gif') {
                    alert('不是有效的图片文件!');
                    return;
                }
                // 读取文件:
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
                    uploadPreview.style.backgroundImage = "url(" + data + ")";
                    uploadPreview.style.backgroundSize ='443px 177px';
                };
                // 以DataURL的形式读取文件:
                reader.readAsDataURL(file);
            });

            $(dragged).append(delEle);
        }

        //如果拖拽的元素是“页面布局-文本”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "text" && $(dragged).hasClass("done")){
            //复制一个新的文本布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "60px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("文本区<br>(点击编辑文本内容)");
            $(dragged).append(delEle);

            //点击文本区配置参数
            $(dragged).on('click', function() {
                $('#add-text-prompt').modal({
                    relatedTarget: this,
                    height: 469,
                    width:900,
                    closeViaDimmer: 0,
                    onConfirm: function(e) {
                        $(dragged).css("color","black");
                        $(dragged).css("text-align","left");
                        //将ueditor中的内容追加至文本区内
                        $(dragged).html(ue.getContent());
                        $(dragged).append(delEle);
                        //点击删除按钮移除当前元素
                        delEle.click(function(){
                            $(this).parent().remove();
                        })
                    },
                    onCancel: function(e) {
                    }
                });
                return false;
            });
        }

        //如果拖拽的元素是“页面布局-列表”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "matrix" && $(dragged).hasClass("done")){

            console.log("待复制元素id："　+ $(dragEleCopyHtml).children().attr("id"));

            var b = $(dragEleCopyHtml).children().attr("id","matrix" + i);

            console.log("修改后元素id："　+ $(b).attr("id"));
            console.log($(b).parent().prop("outerHTML"));

            var copy = $(b).parent().prop("outerHTML");
            //复制一个新的列表布局元素放在面板中，以备后续使用
            $("#layout-content").append(copy);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "50px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("列表区<br>(点击编辑列表内容)");
            $(dragged).append(delEle);

            //重要，以闭包方式为每一次拖入的列表区绑定事件，否则会出现错误
            $("#" + "matrix" + (i-1)).on('click', function(n) {
                return function (){
                    console.log("当前点击：" + n);

                    var hideCurrentMatrix = $("#hideCurrentMatrix").html(n);
                    var title = "";
                    var height = "";
                    var bgColor = "";
                    var rowNum = "";
                    var columnNum = "";
                    var marginX = "";
                    var marginY = "";

                    $('#add-matrix-prompt').modal({
                        relatedTarget: this,
                        height: 232,
                        width:650,
                        closeViaDimmer: 0,
                        onConfirm: function(e) {
                            n = $("#hideCurrentMatrix").html();
                            console.log("modal中的n ：" + n);
                            title = $("#matrix-title").val();
                            height = $("#matrix-height").val() < 50 ? 50:$("#matrix-height").val();
                            bgColor = $("#matrix-bgColor").val();
                            rowNum = $("#matrix-rowNum").val();
                            columnNum = $("#matrix-columnNum").val();
                            marginX = $("#matrix-marginX").val();
                            marginY = $("#matrix-marginY").val();

                            if(rowNum == "1") {
                                $("#" + "matrix" + n).css({
                                    "height": height,
                                    "border": "none"
                                })
                            }
                            if(rowNum == "2") {
                                $("#" + "matrix" + n).css({
                                    "height": height * 2,
                                    "border": "none"
                                })
                            }

                            if(rowNum == 1 && columnNum == 1){
                                var show11 = $("#hide-1x1").clone();
                                $(show11).children().css("height",height);
                                show11.css("display","");
                                $("#" + "matrix" + n).html(show11.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 1 && columnNum == 2){
                                var show12 = $("#hide-1x2").clone();
                                $(show12).children().css("height",height);
                                show12.css("display","");
                                $("#" + "matrix" + n).html(show12.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 1 && columnNum == 3){
                                var show13 = $("#hide-1x3").clone();
                                $(show13).children().css("height",height);
                                show13.css("display","");
                                $("#" + "matrix" + n).html(show13.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 1 && columnNum == 4){
                                var show14 = $("#hide-1x4").clone();
                                $(show14).children().css("height",height);
                                show14.css("display","");
                                $("#" + "matrix" + n).html(show14.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 2 && columnNum == 1){
                                var show21 = $("#hide-1x1").clone();
                                $(show21).children().css("height",height);
                                show21.css("display","");
                                $("#" + "matrix" + n).html(show21.html() + show21.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 2 && columnNum == 2){
                                var show22 = $("#hide-1x2").clone();
                                $(show22).children().css("height",height);
                                show22.css("display","");
                                $("#" + "matrix" + n).html(show22.html() + show22.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 2 && columnNum == 3){
                                var show23 = $("#hide-1x3").clone();
                                $(show23).children().css("height",height);
                                show23.css("display","");
                                $("#" + "matrix" + n).html(show23.html() + show23.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == 2 && columnNum == 4){
                                var show24 = $("#hide-1x4").clone();
                                $(show24).children().css("height",height);
                                show24.css("display","");
                                $("#" + "matrix" + n).html(show24.html() + show24.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                            if(rowNum == "" || columnNum == ""){
                                var show11 = $("#hide-1x1").clone();
                                $(show11).children().css("height",height);
                                show11.css("display","");
                                $("#" + "matrix" + n).html(show11.html());

                                //点击删除按钮移除当前元素
                                var tmpDel = delEle.clone();
                                tmpDel.click(function(){
                                    $(this).parent().remove();
                                })
                                $("#" + "matrix" + n).append(tmpDel);
                            }
                        },
                        onCancel: function(e) {
                        }
                    });
                }
            }(i-1));

            //点击列表区配置参数
            i = i + 1;
        }

        //如果拖拽的元素是“页面布局-单品”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "single" && $(dragged).hasClass("done")){
            //复制一个新的单品布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "120px",
                "padding": "0px",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("单品区<br>(请拖拽单品素材至该区域)");
            $(dragged).append(delEle);
        }

        //如果拖拽的元素是“页面布局-间距”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "space" && $(dragged).hasClass("done")){
            //复制一个新的间距布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "20px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("间距区(点击编辑间距参数)");
            $(dragged).append(delEle);

            //点击间距区配置参数
            $(dragged).on('click', function() {
                $('#add-space-prompt').modal({
                    relatedTarget: this,
                    height: 170,
                    width:500,
                    closeViaDimmer: 0,
                    onConfirm: function(e) {
                        var space = ($("#space-px").val() == "" || $("#space-px").val() < 20)?"20":$("#space-px").val();
                        $(dragged).css("height",space + "px");
                        /*$(dragged).html("间距区(当前间距：" + space + "px)<br>(点击编辑间距参数)");*/
                        $(dragged).html("间距区(点击编辑间距参数)");
                        $(dragged).append(delEle);
                        //点击删除按钮移除当前元素
                        delEle.click(function(){
                            $(this).parent().remove();
                        })
                    },
                    onCancel: function(e) {
                    }
                });
                return false;
            });
        }

        //如果拖拽的元素是“页面布局-标题”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "title" && $(dragged).hasClass("done")){
            //复制一个新的标题布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "60px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("标题区<br>(点击编辑标题内容)");
            $(dragged).append(delEle);

            //点击标题区配置参数
            $(dragged).on('click', function() {
                $('#add-title-prompt').modal({
                    relatedTarget: this,
                    height: 170,
                    width:500,
                    closeViaDimmer: 0,
                    onConfirm: function(e) {
                        var title = $("#title-content").val();
                        $(dragged).css({
                            "height": "36px",
                            "border": "none",
                            "border-radius": "0",
                            "border-left": "10px solid #0099CC",
                            "padding-left": "4px",
                            "padding-bottom": "11px",
                            "font-family": "Microsoft YaHei",
                            "font-weight": "5px",
                            "font-size": "23px",
                            "text-align": "left",
                            "color": "gray"
                        });
                        $(dragged).html(title);

                        $(dragged).append(delEle);
                        //点击删除按钮移除当前元素
                        delEle.click(function(){
                            $(this).parent().remove();
                        })
                    },
                    onCancel: function(e) {
                    }
                });
                return false;
            });
        }

        //如果拖拽的元素是“页面布局-分类”且确定已经放置到屏幕预览区，作如下处理
        if(draggingElement == "classify" && $(dragged).hasClass("done")){
            //复制一个新的标题布局元素放在面板中，以备后续使用
            $("#layout-content").append(dragEleCopyHtml);

            //重新定义被拖动元素的样式
            $(dragged).css({
                "border": "1px solid black",
                "background-color": "white",
                "background-image": "none",
                "box-shadow": "none",
                "font-size": "14px",
                "cursor": "pointer",
                "height": "32px",
                "padding": "0",
                "width": "100%",
                "margin": "0px"
            });

            //加入提示语和右上角关闭按钮
            $(dragged).html("分类区(请拖拽分类组件至此区域)");
            $(dragged).append(delEle);
        }

        //如果是向导航布局中拖入导航组件
        if (event.target.id == "nav") {
            //如果拖入导航区域的不是组件而是素材，则提示错误
            if($(dragged).parent().parent().parent().attr("id") == "single-content" ||
               $(dragged).parent().parent().attr("id") == "movie-content" ||
               $(dragged).parent().parent().parent().attr("id") == "book-content" ||
               $(dragged).parent().parent().parent().attr("id") == "music-content" ||
               $(dragged).parent().parent().parent().attr("id") == "game-content" ||
               $(dragged).parent().parent().parent().attr("id") == "cartoon-content" ||
               $(dragged).parent().attr("id") == "model-name-content"){

               $('#component-only-prompt').modal({
                    relatedTarget: this,
                    closeViaDimmer: 0
                });
                return;
            }

            //分情况复制一个新的导航组件放在面板中，以备后续使用
            if(dragged.className == "pic-gateway"){
                $("#gateway-content").append(dragEleCopyHtml);
            }
            if(dragged.className == "pic-main-site"){
                $("#main-site-content").append(dragEleCopyHtml);
            }
            if(dragged.className == "pic-disney"){
                $("#disney-content").append(dragEleCopyHtml);
            }
            if(dragged.className == "nav-bar"){
                $("#nav-bar").append(dragEleCopyHtml);
            }

            //处理被拖动元素样式
            $(dragged).addClass("done");
            $(dragged).css("width","100%");
            $(dragged).css("height","60px");

            //处理导航区域
            $(event.target).html( $(dragged) );
            $(event.target).append(delEle);
        }

        //如果是向列表布局的单元格中拖入素材或组件
        if($(event.target).hasClass("list-cell")){
            //如果拖入的是素材，则再复制该素材以备后续使用
            if($(dragged).hasClass("source-movie")){
                $("#movie-content").append(dragEleCopyHtml);
            }
            if($(dragged).hasClass("source-book")){
                $("#book-content").append(dragEleCopyHtml);
            }
            if($(dragged).hasClass("source-music")){
                var tmp = $("<div class='am-u-sm-3'></div>").append(dragEleCopyHtml);
                $("#music-content").append(tmp);
            }
            if($(dragged).hasClass("source-game")){
                var tmp = $("<div class='am-u-sm-6'></div>").append(dragEleCopyHtml);
                $("#game-content").append(tmp);
            }
            if($(dragged).hasClass("source-cartoon")){
                var tmp = $("<div class='am-u-sm-6'></div>").append(dragEleCopyHtml);
                $("#cartoon-content").append(tmp);
            }
            //如果拖入的是组件，则再复制该组件以备后续使用
            if($(dragged).hasClass("pic-gateway") || $(dragged).hasClass("pic-main-site") || $(dragged).hasClass("pic-disney") ||
               $(dragged).parent().attr("id") == "model-name-content"){
                $('#matrix-source-only-prompt').modal({
                    relatedTarget: this,
                    closeViaDimmer: 0
                });
                return;
            }

            if($(dragged).hasClass("source-book")){
                $(dragged).css("height","120px");
            } else if ($(dragged).hasClass("source-game")){
                $(dragged).css("height","80px");
            } else {
                $(dragged).css("height","160px");
            }
            $(dragged).addClass("done");
            $(dragged).css("width","100%");
            $(dragged).css("margin","0");
            $(dragged).css("padding","0");
            $(event.target).css("padding","5px");
            $(event.target).html( $(dragged) );


        }

        //如果是向单品布局的单元格中拖入素材
        if (event.target.id == "single"){
            //如果拖入单品区域的不是单品，则提示错误
            if(!$(dragged).parent().hasClass("source-single")){
                $('#source-only-prompt').modal({
                    relatedTarget: this,
                    closeViaDimmer: 0
                });
                return;
            }

            //如果拖入的是单品，则再复制该单品以备后续使用
            $("#single-content").append(dragEleCopyHtml);

            //处理被拖动元素样式
                $(dragged).addClass("done");
                $(dragged).css("width","100%");
                $(dragged).css("height","116px");

            //处理导航区域
            $(event.target).html( $(dragged) );
            $(event.target).append(delEle);
        }

        //如果是向分类布局中拖入组件
        if (event.target.id == "classify"){
            //如果拖入分类区域的不是分类组件，则提示错误
            if($(dragged).parent().attr("id") != "model-name-content"){
                $('#classify-only-prompt').modal({
                    relatedTarget: this,
                    closeViaDimmer: 0
                });
                return;
            }

            //如果拖入的是分类组件，则再复制该分类组件以备后续使用
            $("#model-name-content").append(dragEleCopyHtml);

            //处理被拖动元素样式
            $(dragged).addClass("done");
            $(dragged).css("width","100%");
            $(dragged).css("height","28px");

            //处理导航区域
            $(event.target).html( $(dragged) );
            $(event.target).append(delEle);
        }
    }

    //一次拖放事件完成，主动将标识用的全局变量重置
    draggingElement = "";
    dragEleCopyObj = "";
    dragEleCopyHtml = "";
}, false);

//监听dragend事件
document.addEventListener("dragend", function( event ) {

}, false);

//监听dragleave事件
document.addEventListener("dragleave", function( event ) {

}, false);


