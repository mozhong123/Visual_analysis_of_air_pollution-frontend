<script>

export default {
  created() {
  },
  mounted() {
// 监听鼠标移入logo事件
    $(document).on('mouseenter', '.Jnmh-btnlogo', function () {
      $('#nmh-navicon').addClass('Jnmh-open');
      GtoggleNavlogo();
    });
// 监听鼠标移除导航球移除事件（展开收缩悬浮球为什么不直接监听#nmh-navicon而多了一步监听logo是为了减少边缘触发）
    $(document).on('mouseleave', '#nmh-navicon', function () {
      $('#nmh-navicon').removeClass('Jnmh-open');
      GtoggleNavlogo();
    });
    var GtoggleNavlogo = function () {
      var li = $('#nmh-navicon').find('.Jnmh-subli');
      var lilen = li.length;
      var avgDeg = 180 / (lilen - 1);// 平均角度
      var initDeg = 6;// 起始方向角度
      if ($('#nmh-navicon').hasClass('Jnmh-onleft')) {
        // 如果悬浮球被拖拽到左边，则二级菜单则显示右侧
        li.css({transform: 'rotate(0deg)'});
        initDeg = 186;
      } else {
        // 默认悬浮球在右边，二级菜单显示在左侧
        li.css({transform: 'rotate(-360deg)'});
      }
      for (var i = 0, j = lilen - 1; i < lilen; i++, j--) {
        var d = initDeg - (i * avgDeg);
        var z = initDeg ? j : i;
        // console.log(d);
        $('#nmh-navicon').hasClass('Jnmh-open') ? GrotateNavlogo(li[z], d) : GrotateNavlogo(li[z], 0);
      }
    };
    var GrotateNavlogo = function (dom, deg) {
      $({a: 0}).animate({a: deg}, {
        step: function (now, fx) {
          $(dom).css({transform: 'rotate(' + now + 'deg)'});
          $(dom).children().css({transform: 'rotate(' + (-now) + 'deg)'});
        }, duration: 0
      });
    }

// 鼠标拖动logo移动
    $(document).on('mousedown', '.Jnmh-btnlogo', function (e_down) {
      var wrap = $('#nmh-navicon');
      wrap.removeClass('Jnmh-open');
      $('.Jnmh-m-submenu').hide();
      GtoggleNavlogo();

      var positionDiv = wrap.offset();
      var distenceX = e_down.pageX - positionDiv.left;
      var distenceY = e_down.pageY - positionDiv.top + $(document).scrollTop();
      $(document).mousemove(diy_move);

      function diy_move(e_move) {
        var x = e_move.pageX - distenceX;
        var y = e_move.pageY - distenceY;

        if (x < 0) {
          x = 0;
        } else if (x > $(document).width() - wrap.outerWidth(true)) {
          x = $(document).width() - wrap.outerWidth(true);
        }

        if (y < 0) {
          y = 0;
        } else if (y > $(window).height() - wrap.outerHeight(true)) {
          y = $(window).height() - wrap.outerHeight(true);
        }

        $(wrap).css({
          'left': x + 'px',
          'top': y + 'px'
        });
      }

      $(document).mouseup(function () {
        var x = $(wrap).offset().left;
        var rm = '', ad = 'Jnmh-open';
        if (x > $(document).width() / 2) {
          x = $(document).width() - wrap.outerWidth(true) - 10;
          rm = 'Jnmh-onleft';
        } else {
          x = 10;
          ad += ' Jnmh-onleft';
        }
        $(wrap).css({left: x + 'px'}).addClass(ad).removeClass(rm);
        $('.Jnmh-m-submenu').show();
        GtoggleNavlogo();
        $(document).unbind('mousemove', diy_move);
      });

    });

    function initBtn() {
      const navIconContainer = document.getElementById("nmh-navicon");
      const expandNavMenu = document.querySelector(".NMH-g-navicon.Jnmh-open .Jnmh-m-submenu .Jnmh-subdl ");
      navIconContainer.style.width = window.innerWidth * 0.05 + 'px';
      navIconContainer.style.height = window.innerWidth * 0.05 + 'px';

    }

    initBtn();

    const histroyBtn = document.getElementById('histroy');
    const wordBtn = document.getElementById('word-query');
    const speakBtn = document.getElementById('speak-query');
    const historyBlock = document.getElementById('chat-history');
    const speakBlock = document.getElementById('speak-chat');
    const wordBlock = document.getElementById('word-chat');
    const closeHistory=document.getElementById('history-close');
    const closeSpeak=document.getElementById('speak-close');
    const closeWord=document.getElementById('word-close');

    histroyBtn.addEventListener('click',()=>{
      historyBlock.style.display='block';
    })
    wordBtn.addEventListener('click',()=>{
      speakBlock.style.display='block';
    })
    speakBtn.addEventListener('click',()=>{
      wordBlock.style.display='block';
    })
    closeHistory.addEventListener('click',()=>{
      historyBlock.style.display='none';
    })
    closeSpeak.addEventListener('click',()=>{
      speakBlock.style.display='none';
    })
    closeWord.addEventListener('click',()=>{
      wordBlock.style.display='none';
    })

  },
  methods: {}
  ,
};

</script>

<template>
  <div id="nmh-navicon" class="NMH-g-plugin NMH-g-navicon">
    <button class="Jnmh-btnlogo"></button>
    <div class="chat-block" id="chat-history">
      <div class="close-block-btn" id="history-close">close</div>
    </div>
    <div class="chat-block" id="speak-chat">
      <div class="close-block-btn" id="speak-close">close</div>
    </div>
    <div class="chat-block" id="word-chat">
      <div class="close-block-btn" id="word-close">close</div>
    </div>
    <ins class="Jnmh-btnlogohover"></ins>
    <ul class="Jnmh-m-submenu">
      <li class="Jnmh-subli"><a class="sub-menu-btn" id="main-page" href="http://localhost:5173/newpollution">
        <dl class="Jnmh-subdl">
          <dt class="NMH-subdt">返回首页</dt>
          <dd class="NMH-subdd"></dd>
        </dl>
      </a>
      </li>
      <li class="Jnmh-subli"><a class="sub-menu-btn" id="histroy">
        <dl class="Jnmh-subdl">
          <dt class="NMH-subdt">历史记录</dt>
          <dd class="NMH-subdd"></dd>
        </dl>
      </a>
      </li>
      <li class="Jnmh-subli"><a class="sub-menu-btn" id="word-query">
        <dl class="Jnmh-subdl">
          <dt class="NMH-subdt">文字询问</dt>
          <dd class="NMH-subdd"></dd>
        </dl>
      </a>
      </li>
      <li class="Jnmh-subli"><a class="sub-menu-btn" id="speak-query">
        <dl class="Jnmh-subdl">
          <dt class="NMH-subdt">语音询问</dt>
          <dd class="NMH-subdd"></dd>
        </dl>
      </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/*导航图标*/
.NMH-g-navicon {
  position: fixed;
  top: 40%;
  right: 020px;
  width: 100px;
  height: 100px;
}

.NMH-g-navicon.Jnmh-onleft {
  right: auto;
  left: 020px;
}

/*导航图标logo按钮*/
.NMH-g-navicon .Jnmh-btnlogo {
  position: absolute;
  display: block;
  width: 70%;
  height: 70%;
  top: 13.8%;
  right: 0;
//margin-top: -50px; border: 0; background: url(src/assets/image/white-circle-emoji-clipart-md.png) no-repeat center center; background-size: 95% 95%; outline: none; border-radius: 50%; z-index: 1;
}

.NMH-g-navicon .Jnmh-btnlogohover {
  position: absolute;
  display: block;
  width: 100px;
  height: 100px;
  top: 50%;
  right: 0;
  margin: 0;
  padding: 0;
  margin-top: -50px;
  border: 0;
  overflow: hidden;
  /*background-color: red;*/
}

/*导航图标logo按钮-鼠标经过*/
.NMH-g-navicon.Jnmh-open .Jnmh-btnlogohover {
  margin-top: -150px;
  width: 200px;
  height: 300px;
  border-radius: 150px 0 0 150px;
}

.NMH-g-navicon.Jnmh-onleft .Jnmh-btnlogohover {
  left: 0;
  right: auto;
  border-radius: 0 150px 150px 0;
}

/*导航图标菜单子容器*/
.NMH-g-navicon .Jnmh-m-submenu {
  position: absolute;
  background-color: transparent;
  list-style: none;
  top: -020px;
  bottom: -020px;
  left: -020px;
  right: -020px;
  margin: 0;
  padding: 0;
}

.NMH-g-navicon .Jnmh-m-submenu .Jnmh-subli {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transition: all 0.8s ease-in-out;
}

.Jnmh-m-submenu .Jnmh-subdl {
  position: absolute;
  left: 52%;
  bottom: 90%;
  width: 0;
  height: 0;
  line-height: 1px;
  margin-left: 0;
  background: rgba(255, 255, 255, 0.42);
  border-radius: 50%;
  text-align: center;
  font-size: 1px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.8s ease-in-out, color 0.1s, background 0.1s;
}

/*导航图标-展开菜单时*/
.NMH-g-navicon.Jnmh-open .Jnmh-m-submenu .Jnmh-subdl {
  width: 60px;
  height: 60px;
  line-height: 80px;
  margin-left: -40px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

/*导航图标-三级菜单容器*/
.NMH-g-navicon.Jnmh-open .Jnmh-m-submenu .Jnmh-subdd {
  position: absolute;
  line-height: normal;
}

.NMH-subdt {
  transform: translateY(-11%);
}

.chat-block {
  position: relative;
  top: 80%;
  left: -500%;
  width: 500%;
  height: 500%;
  background-color: #ffff00;
  display: none;
}

#chat-history {
//display: block;
}

.close-block-btn{
  position: relative;
  left: 80%;
  width: 20%;
  height: 13%;
  background-color: #FF1361;
}

</style>