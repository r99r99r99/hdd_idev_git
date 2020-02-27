// 拖动div元素
const drag = new Vue({
  el:'#appDragCon',
  // 自定义指令
  directives:{
    drag(el,bindings){
      el.onmousedown = function(e){
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e){
          el.style.left = e.pageX - disx+'px';
          el.style.top = e.pageY - disx+'px';
        }
        document.onmouseup = function(){
          document.onmousemove = document.onmouseup = null;
        }
      }
    }
  }
})
