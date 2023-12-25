<script>
import {backendURL, queryRoute, method, headers} from "@/config/const.ts";
import Recorder from 'js-audio-recorder'

export default {
  props: {
    msg: String
  },
  data() {
    return {
      file: null,
      historyRecords: [
        //{
        //       time: '2023-01-01 10:00',
        //       question: '历史问题1',
        //       answer: '历史回答1',
        //       image: '/src/assets/image/bg.jpg'
        //     },{
        //       time: '2023-01-01 10:00',
        //       question: '历史问题1',
        //       answer: '历史回答1',
        //       image: '/src/assets/image/leftb1.png'
        //     },
      ],
      itemsPerPage: 5, // 每页显示的记录数
      currentPage: 1,// 当前页
      recorder: null,
      playTime: 0,
      timer: null,
      src: null
    };
  },
  created() {
    this.recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是 16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，Chrome 是 48000
      numChannels: 1, // 声道数，支持 1 或 2， 默认是 1
    })
  },
  mounted() {
    let that = this;
    const addHistory = async () => {
      let result = await fetchDataGet('http://127.0.0.1:8000/gpts/gpt_content');
      for (var i = 0; i < result.length; i++) {
        let newRecord = {
          time: result[i]['create_dt'],
          question: result[i]['ask_content'],
          answer: result[i]['reply_content'],
          image: result[i]['url']
        };
        this.historyRecords.push(newRecord);
      }
    }
    let isExpanded = false;

// 监听鼠标移入logo事件
    $(document).on('mouseenter', '.Jnmh-btnlogo', function () {
      if (isExpanded) {
        return;
      }
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
        var rm = '', ad = isExpanded ? '' : 'Jnmh-open';
        if (x > $(document).width() / 2) {
          x = $(document).width() - wrap.outerWidth(true) - 10;
          $('.chat-block-left').addClass('chat-block-right').removeClass("chat-block-left");
          rm = 'Jnmh-onleft';
        } else {
          x = 10;
          ad += ' Jnmh-onleft';

          $('.chat-block-right').addClass("chat-block-left").removeClass('chat-block-right');
        }
        $(wrap).css({left: x + 'px'}).addClass(ad).removeClass(rm);
        $('.Jnmh-m-submenu').show();
        GtoggleNavlogo();
        $(document).unbind('mousemove', diy_move);
      });

    });


    const histroyBtn = document.getElementById('histroy');
    const wordBtn = document.getElementById('word-query');
    const speakBtn = document.getElementById('speak-query');
    const historyBlock = document.getElementById('chat-history');
    const speakBlock = document.getElementById('speak-chat');
    const wordBlock = document.getElementById('word-chat');
    const closeHistory = document.getElementById('history-close');
    const closeSpeak = document.getElementById('speak-close');
    const closeWord = document.getElementById('word-close');
    const wordAnswerBlock = document.getElementById('word-answer');
    const speakAnswerBLock = document.getElementById('speak-answer');
    const addWordPicture = document.getElementById("word-picture-submit");
    const addSpeakPicture = document.getElementById("speak-picture-submit");
    const addWordPictureComplete = document.getElementById('word-update-picture-complete');
    const addSpeakPictureComplete = document.getElementById('speak-update-picture-complete');
    const recordButton = document.querySelector('.record-button');
    const recordedIcon = document.querySelector('.recorded-button');
    const recordRetryButton = document.querySelector('.record-retry');
    const recordPlayButton = document.querySelector('.record-play');
    const recordPauseButton = document.querySelector('.record-pause');
    const speakSubmit = document.getElementById('speak-submit');
    const wordSubmit = document.getElementById('word-submit');
    let recording = false;
    let answerPage = 0;

    function initBtn() {
      const navIconContainer = document.getElementById("nmh-navicon");
      navIconContainer.style.width = window.innerWidth * 0.05 + 'px';
      navIconContainer.style.height = window.innerWidth * 0.05 + 'px';
    }

    async function fetchDataGet(url) {
      let result;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        result = data.data;
        // 在这里处理你的数据，更新前端界面
      } catch (error) {
        console.error('Error:', error);
      }
      return result;
    }

    async function fetchDataPost(url, postData) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
      })
          .then(response => response.json())
          .then(data => {
            // 处理后端返回的数据
            sendMessage(data.data);
          })
          .catch(error => {
            sendMessage('Error:' + error);
          });
    }

    async function fetchDataPostFile(url, fileInputComponent) {
      const fileInput = document.getElementById(fileInputComponent);
      let result;
      let formData = new window.FormData();
      formData.append('gpt_ask', String(fileInput[0].value));
      formData.append('file', that.file)
      await fetch(url, {
        method: 'POST',
        body: formData
      })
          .then(response => response.json())
          .then(data => {
            // 处理后端返回的数据
            result = data;
          })
          .catch(error => {
            result = {message: 'Error:' + error, code: -1};
          });
      return result;
    }

    async function fetchDataPostFile2(url) {
      const blob = that.recorder.getWAVBlob() // 获取 pcm 格式音频数据
      // 此处获取到 blob 对象后需要设置 fileName 满足项目上传需求，这里选择直接把 blob 作为 file 塞入 formData
      const fileOfBlob = new File([blob], new Date().getTime() + '.wav')
      let result;
      let formData = new window.FormData();
      formData.append('voice', fileOfBlob, new Date().getTime() + '.pcm');
      formData.append('file', that.file);
      console.log(fileOfBlob);
      console.log(that.file);
      console.log(formData);
      await fetch(url, {
        method: 'POST',
        body: formData
      })
          .then(response => response.json())
          .then(data => {
            // 处理后端返回的数据
            result = data;
          })
          .catch(error => {
            result = {message: 'Error:' + error, code: -1};
          });
      return result;
    }


    function clickWait(component) {
      return new Promise((resolve) => {
        const button = document.getElementById(component);
        button.addEventListener('change', () => {
          resolve();
        });
        button.click();
      });
    }

    async function waitForAnswer(formId, outputId) {
      const outputContent = document.getElementById(outputId);
      const queryMethod = "ask_gpt_by_content"
      const queryURL = 'http://' + backendURL + 'gpts/' + queryMethod;
      outputContent.innerText = '等待回应...';
      const result = await fetchDataPostFile(queryURL, formId);
      console.log(result);
      if (result.code !== 0) {
        outputContent.innerText = result.message;
      } else {
        outputContent.innerText = result.data.reply_content;
      }
    }

    async function waitForAnswer2(pictureId, outputId) {
      const outputContent = document.getElementById(outputId);
      const queryMethod = "ask_gpt_by_voice"
      const queryURL = 'http://' + backendURL + 'gpts/' + queryMethod;
      outputContent.innerText = '等待回应...';
      const result = await fetchDataPostFile2(queryURL);
      console.log(result);
      if (result.code !== 0) {
        outputContent.innerText = result.message;
      } else {
        outputContent.innerText = result.data.reply_content;
      }
    }

    async function uploadPictures(destination) {
      await clickWait(destination);
    }


    histroyBtn.addEventListener('click', () => {
      isExpanded = true;
      historyBlock.style.display = 'block';
      $('#nmh-navicon').removeClass('Jnmh-open');
      GtoggleNavlogo();
      addHistory();
    })
    wordBtn.addEventListener('click', () => {
      isExpanded = true;
      wordBlock.style.display = 'block';
      $('#nmh-navicon').removeClass('Jnmh-open');
      GtoggleNavlogo();
    })
    speakBtn.addEventListener('click', () => {
      isExpanded = true;
      speakBlock.style.display = 'block';
      $('#nmh-navicon').removeClass('Jnmh-open');
      GtoggleNavlogo();
    })

    addWordPicture.addEventListener('click', async () => {
      await uploadPictures('picture-input-word');
      const button = document.getElementById('picture-input-word');
      if (button.files.length === 0) {
        return;
      }
      addWordPicture.style.display = 'none';
      addWordPictureComplete.style.display = 'block';
    })

    wordSubmit.addEventListener('click', async () => {
      const inputText = document.getElementById('text-chat');
      const askContent = document.getElementById('ask-content');
      const wordAnswer = document.getElementById('word-answer-content');
      const inputPicture = document.getElementById('picture-input-word');
      if (inputText.value === '') {
        wordAnswer.innerText = '请输入提问内容！';
        return;
      }
      askContent.value = inputText.value;
      await waitForAnswer('word-GPT-Form', 'word-answer-content');
      inputText.value = '';
      inputPicture.value = '';
      addWordPicture.style.display = 'block';
      addWordPictureComplete.style.display = 'none';
    })

    wordAnswerBlock.addEventListener('wheel', (event) => {
      const answerContent = document.getElementById('word-answer-content');
      const wheelDown = event.deltaY > 0;
      if (answerContent.innerText.length <= 100) {
        return;
      }
      if ((answerPage === -4 && wheelDown === true)) {
        return;
      }
      if ((answerPage === 0) && (wheelDown === false)) {
        return;
      }
      answerPage += wheelDown ? (-1) : 1;
      console.log(answerContent.style.top);
      answerContent.style.top = (answerPage * 90) + '%';
    })

    speakAnswerBLock.addEventListener('wheel', (event) => {
      const answerContent = document.getElementById('speak-answer-content');
      const wheelDown = event.deltaY > 0;
      if (answerContent.innerText.length <= 100) {
        return;
      }
      if ((answerPage === -4 && wheelDown === true)) {
        return;
      }
      if ((answerPage === 0) && (wheelDown === false)) {
        return;
      }
      answerPage += wheelDown ? (-1) : 1;
      console.log(answerContent.style.top);
      answerContent.style.top = (answerPage * 90) + '%';
    })

    addSpeakPicture.addEventListener('click', async () => {
      await uploadPictures('picture-input-word');
      const button = document.getElementById('picture-input-word');
      if (button.files.length === 0) {
        return;
      }
      addSpeakPicture.style.display = 'none';
      addSpeakPictureComplete.style.display = 'block';
    })
    recordButton.addEventListener('click', () => {
      const answerContent = document.getElementById('speak-answer-content');
      const recordComponentHidden = document.getElementById('start-record');
      const recordStopComponentHidden = document.getElementById('stop-record');
      if (recording === false) {
        recordComponentHidden.click();
        answerContent.innerText = '录音中，再点击一次录音键以完成录音';
        recording = true;
        return;
      }
      recording = false;
      recordButton.style.display = 'none';
      recordedIcon.style.display = 'block';
      answerContent.innerText = '';
      recordStopComponentHidden.click();
    })
    recordRetryButton.addEventListener('click', () => {
      const recordRetryComponentHidden = document.getElementById('play-record-retry');
      recordButton.style.display = 'block';
      recordedIcon.style.display = 'none';
      recordPauseButton.style.display = 'none';
      recordPlayButton.style.display = 'block';
      recordRetryComponentHidden.click();
    })
    recordPlayButton.addEventListener('click', () => {
      const recordPlayComponentHidden = document.getElementById('play-record-start');
      recordPauseButton.style.display = 'block';
      recordPlayButton.style.display = 'none';
      recordPlayComponentHidden.click();
    })
    recordPauseButton.addEventListener('click', () => {
      const recordPauseComponentHidden = document.getElementById('play-record-stop');
      recordPauseButton.style.display = 'none';
      recordPlayButton.style.display = 'block';
      recordPauseComponentHidden.click();
    })
    //在这里加入上传逻辑
    speakSubmit.addEventListener('click', async () => {
      //上传逻辑
      //待补充
      const inputPicture = document.getElementById('picture-input-speak');
      const recordRetryComponentHidden = document.getElementById('play-record-retry');
      await waitForAnswer2('picture-input-speak', 'speak-answer-content')
      addSpeakPicture.style.display = 'block';
      addSpeakPictureComplete.style.display = 'none';
      recordButton.style.display = 'block';
      recordedIcon.style.display = 'none';
      recordPauseButton.style.display = 'none';
      recordPlayButton.style.display = 'block';
      recordRetryComponentHidden.click();
      inputPicture.value = '';
      //将要展示的结果
      //以下是上传后处理
      //销毁录音并且复原按键
      //清除图片
      //展示结果

    })

    closeHistory.addEventListener('click', () => {
      isExpanded = false;
      historyBlock.style.display = 'none';
    })
    closeSpeak.addEventListener('click', () => {
      isExpanded = false;
      speakBlock.style.display = 'none';
      const answerContent = document.getElementById('speak-answer-content');
      const inputPicture = document.getElementById('picture-input-speak');
      //销毁录音并且复原按键
      recordRetryButton.click();
      //清除图片
      inputPicture.value = '';
      //重置图片状态
      addSpeakPicture.style.display = 'block';
      addSpeakPictureComplete.style.display = 'none';
      //展示结果
      answerContent.value = '';
      answerPage = 0;
    })
    closeWord.addEventListener('click', () => {
      isExpanded = false;
      wordBlock.style.display = 'none';
      const inputText = document.getElementById('text-chat');
      const wordAnswer = document.getElementById('word-answer-content');
      const inputPicture = document.getElementById('picture-input-word');
      inputText.value = '';
      inputPicture.value = '';
      wordAnswer.innerText = '';
      wordAnswer.style.top = '0%';
      addWordPicture.style.display = 'block';
      addWordPictureComplete.style.display = 'none';
      answerPage = 0;
    })
    initBtn();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.historyRecords.length / this.itemsPerPage);
    },
    displayedRecords() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.historyRecords.slice(startIndex, endIndex);
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    handleStart() {
      this.recorder = new Recorder()
      Recorder.getPermission().then(() => {
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        this.$message({
          message: '请先允许该网页使用麦克风',
          type: 'info'
        })
        console.log(`${error.name} : ${error.message}`)
      })
    },
    handlePause() {
      console.log('暂停录音')
      this.recorder.pause() // 暂停录音
    },
    handleResume() {
      console.log('恢复录音')
      this.recorder.resume() // 恢复录音
    },
    handleStop() {
      console.log('停止录音')
      this.recorder.stop() // 停止录音
    },
    handlePlay() {
      console.log('播放录音')
      console.log(this.recorder)
      this.recorder.play() // 播放录音
      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handlePausePlay() {
      console.log('暂停播放')
      this.recorder.pausePlay() // 暂停播放
      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.time = null
    },
    handleResumePlay() {
      console.log('恢复播放')
      this.recorder.resumePlay() // 恢复播放
      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handleStopPlay() {
      console.log('停止播放')
      this.recorder.stopPlay() // 停止播放
      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.timer = null
    },
    handleDestroy() {
      console.log('销毁实例')
      this.recorder.destroy() // 销毁实例
      this.timer = null
    },
    downloadPCM() {
      console.log('下载PCM格式数据')
      // 注：使用该方法会默认调用 stop() 方法
      this.recorder.downloadPCM('record-pcm')
    },
    downloadWAV() {
      console.log('下载WAV格式数据')
      // 注：使用该方法会默认调用 stop() 方法
      this.recorder.downloadWAV('record-wav')
    },
    uploadRecord() {
      if (this.recorder == null || this.recorder.duration === 0) {
        this.$message({
          message: '请先录音',
          type: 'error'
        })
        return false
      }
      this.recorder.pause() // 暂停录音
      this.timer = null
      console.log('上传录音') // 上传录音
      const formData = new FormData()
      const blob = this.recorder.getPCMBlob() // 获取 pcm 格式音频数据
      // 此处获取到 blob 对象后需要设置 fileName 满足项目上传需求，这里选择直接把 blob 作为 file 塞入 formData
      const fileOfBlob = new File([blob], new Date().getTime() + '.pcm')
      formData.append('file', fileOfBlob)
      const url = window.URL.createObjectURL(fileOfBlob)
      this.src = url
      // const axios = require('axios')
      // axios.post(url, formData).then(res => {
      //   console.log(res.data.data[0].url)
      // })
    }
  }
};

</script>

<template>
  <div class="record-component">
    <div style="padding: 20px;">
      <h1>{{ msg }}</h1>
      <h3>录音上传</h3>
      <div style="font-size:14px">
        <h3>录音时长：{{ recorder && recorder.duration.toFixed(4) }}</h3>
        <br/>
        <el-button id="start-record" type="primary" @click="handleStart">开始录音</el-button>
        <el-button id="pause-record" type="info" @click="handlePause">暂停录音</el-button>
        <el-button id="continue-record" type="success" @click="handleResume">继续录音</el-button>
        <el-button id="stop-record" type="warning" @click="handleStop">停止录音</el-button>
        <br/>
        <br/>
        <h3>
          播放时长：{{ recorder && (playTime > recorder.duration ? recorder.duration.toFixed(4) : playTime.toFixed(4)) }}
        </h3>
        <br/>
        <el-button id="play-record-start" type="primary" @click="handlePlay">播放录音</el-button>
        <el-button id="play-record-pause" type="info" @click="handlePausePlay">暂停播放</el-button>
        <el-button id="play-record-continue" type="success" @click="handleResumePlay">继续播放</el-button>
        <el-button id="play-record-stop" type="warning" @click="handleStopPlay">停止播放</el-button>
        <el-button id="play-record-retry" type="error" @click="handleDestroy">销毁录音</el-button>
        <el-button type="primary" @click="downloadPCM">下载PCM数据</el-button>
        <el-button type="primary" @click="downloadWAV">下载WAV数据</el-button>
        <el-button type="primary" @click="uploadRecord">上传</el-button>
      </div>
    </div>
  </div>
  <div id="nmh-navicon" class="NMH-g-plugin NMH-g-navicon">
    <button class="Jnmh-btnlogo"></button>

    <div class="chat-block-right" id="chat-history">
      <svg class="close-block-btn" id="history-close" viewBox="0 0 1026 1024">
        <path
            d="M786.432 173.568L510.976 449.024 235.52 173.568c-18.944-18.944-49.664-18.944-69.12 0-18.944 18.944-18.944 49.664 0 69.12l275.456 275.456L166.4 793.6c-18.944 18.944-18.944 49.664 0 69.12 18.944 18.944 49.664 18.944 69.12 0l275.456-275.968 275.456 275.456c18.944 18.944 49.664 18.944 69.12 0 18.944-18.944 18.944-49.664 0-69.12l-275.456-275.456 275.456-275.456c18.944-18.944 18.944-49.664 0-69.12-19.456-17.92-50.176-17.92-69.12 0.512z"
            p-id="583"></path>
      </svg>
      <div class="history_con">
        <template v-for="(record, index) in displayedRecords" :key="index">
          <div class="history-record">
            <div>{{ record.time }}</div>
            <div>{{ record.question }}</div>
            <div>{{ record.answer }}</div>
            <img v-if="record.image" :src="record.image" alt="Question Image" style="width: 70%;height: 70%;"/>
          </div>
        </template>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>
    <div class="chat-block-right" id="speak-chat">
      <form id="speak-GPT-Form" enctype="multipart/form-data">
        <input type="text" id="voice-content" name="gpt_ask" required>
        <input type="file" id="picture-input-speak" name="file">
      </form>
      <svg class="close-block-btn" id="speak-close" viewBox="0 0 1026 1024">
        <path
            d="M786.432 173.568L510.976 449.024 235.52 173.568c-18.944-18.944-49.664-18.944-69.12 0-18.944 18.944-18.944 49.664 0 69.12l275.456 275.456L166.4 793.6c-18.944 18.944-18.944 49.664 0 69.12 18.944 18.944 49.664 18.944 69.12 0l275.456-275.968 275.456 275.456c18.944 18.944 49.664 18.944 69.12 0 18.944-18.944 18.944-49.664 0-69.12l-275.456-275.456 275.456-275.456c18.944-18.944 18.944-49.664 0-69.12-19.456-17.92-50.176-17.92-69.12 0.512z"
            p-id="583"></path>
      </svg>
      <h2 class="chat-block-title" id="speak-chat-title">语音询问</h2>
      <div class="answer-block" id="speak-answer">
        <div class="answer-content" id="speak-answer-content"></div>
      </div>
      <svg class="record-button" viewBox="0 0 1024 1024">
        <path
            d="M543.507692 747.657846v127.428923h94.523077a25.856 25.856 0 1 1 0 50.451693H385.969231a25.856 25.856 0 1 1 0-50.471385h94.523077v-127.409231c-159.212308-12.662154-283.569231-120.123077-283.569231-251.037538a28.888615 28.888615 0 0 1 31.507692-25.225846 28.888615 28.888615 0 0 1 31.507693 25.225846c0 111.478154 112.856615 201.846154 252.061538 201.846154s252.061538-90.368 252.061538-201.846154a32.295385 32.295385 0 0 1 63.015385 0c0 130.816-124.356923 238.355692-283.569231 251.037538zM512 647.995077c-104.369231 0-189.046154-67.780923-189.046154-151.374769V269.548308C322.953846 185.934769 407.630769 118.153846 512 118.153846s189.046154 67.780923 189.046154 151.394462v227.072c0 83.593846-84.676923 151.374769-189.046154 151.374769z m126.030769-378.466462c0-55.748923-56.418462-100.923077-126.030769-100.923077s-126.030769 45.174154-126.030769 100.923077v227.091693c0 55.748923 56.418462 100.923077 126.030769 100.923077s126.030769-45.174154 126.030769-100.923077V269.548308z"
            fill="#FFFFFF"></path>
      </svg>
      <svg class="recorded-button" id="record-complete" viewBox="0 0 1024 1024">
        <path
            d="M823.3 303.6c-12.5-12.4-32.9-12.4-45.3 0L429.1 652.5 246 459.3c-12.5-12.4-32.9-12.4-45.3 0-12.4 12.5-12.4 32.9 0 45.3l205.8 215.8c6.2 6.2 14.4 9.3 22.6 9.3 8.2 0 16.4-3.1 22.7-9.3l371.5-371.5c12.4-12.5 12.4-32.8 0-45.3z"
            fill="#FFFFFF" p-id="18253"></path>
      </svg>
      <svg class="record-retry" viewBox="0 0 1024 1024">
        <path
            d="M512 962.68a430 430 0 1 1 236.39-789.24 35 35 0 1 1-38.53 58.44A358.37 358.37 0 0 0 512 172.68c-198.5 0-360 161.5-360 360s161.5 360 360 360 360-161.49 360-360a35 35 0 0 1 70 0 429.65 429.65 0 0 1-430 430zM783.7 263.12a35 35 0 0 1-32.62-22.32L699.77 109A35 35 0 0 1 765 83.62l51.3 131.79a35 35 0 0 1-32.61 47.71zM651.91 314.42a35 35 0 0 1-12.7-67.63L771 195.49a35 35 0 1 1 25.39 65.23L664.6 312a34.81 34.81 0 0 1-12.69 2.42z "
            fill="#FFFFFF"></path>
      </svg>
      <svg class="record-play" viewBox="0 0 1024 1024">
        <path
            d="M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z"
            fill="#FFFFFF"></path>
      </svg>
      <svg class="record-pause" viewBox="0 0 1024 1024">
        <path
            d="M320 938.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V106.666667a21.333333 21.333333 0 0 1 42.666666 0v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334z m405.333333-21.333334V106.666667a21.333333 21.333333 0 0 0-42.666666 0v810.666666a21.333333 21.333333 0 0 0 42.666666 0z"
            fill="#FFFFFF"></path>
      </svg>
      <svg class="add-picture-button" id="speak-picture-submit" viewBox="0 0 1024 1024">
        <path
            d="M716.78 609.59L604.8 525.61c-16.97-12.72-40.62-12.72-57.59 0l-98.58 73.92L317.2 494.39c-16.48-13.19-39.28-14.19-56.81-2.39L128 581.02V224h704v352c0 17.67 14.33 32 32 32s32-14.33 32-32V221.31c0-33.81-27.5-61.31-61.31-61.31H125.31C91.5 160 64 187.5 64 221.31v581.38C64 836.5 91.5 864 125.31 864H608c17.67 0 32-14.33 32-32s-14.33-32-32-32H128V658.16l158.36-106.48 161.02 128.8L576 584l102.38 76.78c14.19 10.67 34.23 7.73 44.8-6.39 10.6-14.14 7.74-34.2-6.4-44.8z"
            fill="#FFFFFF" p-id="13836"></path>
        <path
            d="M576 384c0 52.94 43.06 96 96 96s96-43.06 96-96-43.06-96-96-96-96 43.06-96 96z m128 0c0 17.64-14.36 32-32 32s-32-14.36-32-32 14.36-32 32-32 32 14.36 32 32zM928 768h-64v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64v64c0 17.67 14.33 32 32 32s32-14.33 32-32v-64h64c17.67 0 32-14.33 32-32s-14.33-32-32-32z"
            fill="#FFFFFF" p-id="13837"></path>
      </svg>
      <svg class="submit-button" id="speak-submit" viewBox="0 0 80 80" width="80" height="80">
        <g>
          <g transform="matrix(1,0,0,1,38.970001220703125,39.39099884033203)" opacity="1"
             style="display: block;">
            <g opacity="1" transform="matrix(2,0,0,2,0,0)">
              <path fill="#FFFFFF" fill-opacity="1"
                    d=" M4.166999816894531,2.5299999713897705 C4.166999816894531,2.5299999713897705 -9.038000106811523,8.050000190734863 -9.038000106811523,8.050000190734863 C-9.038000106811523,8.050000190734863 -9.038000106811523,4.199999809265137 -9.038000106811523,4.199999809265137 C-9.038000106811523,4.199999809265137 -2.8320000171661377,2.5299999713897705 -2.8320000171661377,2.5299999713897705 C-2.8320000171661377,2.5299999713897705 -9.038000106811523,0.824999988079071 -9.038000106811523,0.824999988079071 C-9.038000106811523,0.824999988079071 -9.038000106811523,-3.049999952316284 -9.038000106811523,-3.049999952316284 C-9.038000106811523,-3.049999952316284 4.166999816894531,2.5299999713897705 4.166999816894531,2.5299999713897705z M-10.86299991607666,-5.809000015258789 C-10.86299991607666,-5.809000015258789 -10.86299991607666,10.869999885559082 -10.86299991607666,10.869999885559082 C-10.86299991607666,10.869999885559082 8.88599967956543,2.5299999713897705 8.88599967956543,2.5299999713897705 C8.88599967956543,2.5299999713897705 -10.86299991607666,-5.809000015258789 -10.86299991607666,-5.809000015258789z"></path>
            </g>
          </g>
          <g class="send-animation-path" transform="matrix(-1,0,0,-1,63.066001892089844,17.67569923400879)"
             opacity="1" style="display: block;">
            <g opacity="1" transform="matrix(2,0,0,2,0,0)">
              <path fill="#FFFFFF" fill-opacity="1"
                    d=" M3.8350000381469727,-3.8420000076293945 C4.8979997634887695,-2.7790000438690186 5.428999900817871,-1.49399995803833 5.428999900817871,0.012000000104308128 C5.428999900817871,-1.49399995803833 5.958000183105469,-2.7790000438690186 7.015999794006348,-3.8420000076293945 C8.074000358581543,-4.90500020980835 9.357000350952148,-5.435999870300293 10.86299991607666,-5.435999870300293 C9.357000350952148,-5.435999870300293 8.074000358581543,-5.965000152587891 7.015999794006348,-7.0229997634887695 C5.958000183105469,-8.081000328063965 5.428999900817871,-9.36400032043457 5.428999900817871,-10.869999885559082 C5.428999900817871,-9.36400032043457 4.8979997634887695,-8.081000328063965 3.8350000381469727,-7.0229997634887695 C2.7720000743865967,-5.965000152587891 1.4869999885559082,-5.435999870300293 -0.01899999938905239,-5.435999870300293 C1.4869999885559082,-5.435999870300293 2.7720000743865967,-4.90500020980835 3.8350000381469727,-3.8420000076293945z"></path>
            </g>
          </g>
        </g>
      </svg>
      <svg class="update-complete" id="speak-update-picture-complete" viewBox="0 0 1024 1024">
        <path
            d="M823.3 303.6c-12.5-12.4-32.9-12.4-45.3 0L429.1 652.5 246 459.3c-12.5-12.4-32.9-12.4-45.3 0-12.4 12.5-12.4 32.9 0 45.3l205.8 215.8c6.2 6.2 14.4 9.3 22.6 9.3 8.2 0 16.4-3.1 22.7-9.3l371.5-371.5c12.4-12.5 12.4-32.8 0-45.3z"
            fill="#FFFFFF" p-id="18253"></path>
      </svg>
    </div>
    <div class="chat-block-right" id="word-chat">
      <form id="word-GPT-Form" enctype="multipart/form-data">
        <input type="text" id="ask-content" name="gpt_ask" required/>
        <input type="file" ref="fileInput" @change="handleFileChange" id="picture-input-word" name="file" required/>
      </form>
      <svg class="close-block-btn" id="word-close" viewBox="0 0 1026 1024">
        <path
            d="M786.432 173.568L510.976 449.024 235.52 173.568c-18.944-18.944-49.664-18.944-69.12 0-18.944 18.944-18.944 49.664 0 69.12l275.456 275.456L166.4 793.6c-18.944 18.944-18.944 49.664 0 69.12 18.944 18.944 49.664 18.944 69.12 0l275.456-275.968 275.456 275.456c18.944 18.944 49.664 18.944 69.12 0 18.944-18.944 18.944-49.664 0-69.12l-275.456-275.456 275.456-275.456c18.944-18.944 18.944-49.664 0-69.12-19.456-17.92-50.176-17.92-69.12 0.512z"
            p-id="583"></path>
      </svg>
      <div class="answer-block" id="word-answer">
        <div class="answer-content" id="word-answer-content"></div>
      </div>
      <input class="input-text" id="text-chat" placeholder="你想问我什么？">
      <h2 class="chat-block-title" id="word-chat-title">文字询问</h2>
      <svg class="add-picture-button" id="word-picture-submit" viewBox="0 0 1024 1024">
        <path
            d="M716.78 609.59L604.8 525.61c-16.97-12.72-40.62-12.72-57.59 0l-98.58 73.92L317.2 494.39c-16.48-13.19-39.28-14.19-56.81-2.39L128 581.02V224h704v352c0 17.67 14.33 32 32 32s32-14.33 32-32V221.31c0-33.81-27.5-61.31-61.31-61.31H125.31C91.5 160 64 187.5 64 221.31v581.38C64 836.5 91.5 864 125.31 864H608c17.67 0 32-14.33 32-32s-14.33-32-32-32H128V658.16l158.36-106.48 161.02 128.8L576 584l102.38 76.78c14.19 10.67 34.23 7.73 44.8-6.39 10.6-14.14 7.74-34.2-6.4-44.8z"
            fill="#FFFFFF" p-id="13836"></path>
        <path
            d="M576 384c0 52.94 43.06 96 96 96s96-43.06 96-96-43.06-96-96-96-96 43.06-96 96z m128 0c0 17.64-14.36 32-32 32s-32-14.36-32-32 14.36-32 32-32 32 14.36 32 32zM928 768h-64v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64v64c0 17.67 14.33 32 32 32s32-14.33 32-32v-64h64c17.67 0 32-14.33 32-32s-14.33-32-32-32z"
            fill="#FFFFFF" p-id="13837"></path>
      </svg>
      <svg class="submit-button" id="word-submit" viewBox="0 0 80 80" width="80" height="80">
        <g>
          <g transform="matrix(1,0,0,1,38.970001220703125,39.39099884033203)" opacity="1"
             style="display: block;">
            <g opacity="1" transform="matrix(2,0,0,2,0,0)">
              <path fill="#FFFFFF" fill-opacity="1"
                    d=" M4.166999816894531,2.5299999713897705 C4.166999816894531,2.5299999713897705 -9.038000106811523,8.050000190734863 -9.038000106811523,8.050000190734863 C-9.038000106811523,8.050000190734863 -9.038000106811523,4.199999809265137 -9.038000106811523,4.199999809265137 C-9.038000106811523,4.199999809265137 -2.8320000171661377,2.5299999713897705 -2.8320000171661377,2.5299999713897705 C-2.8320000171661377,2.5299999713897705 -9.038000106811523,0.824999988079071 -9.038000106811523,0.824999988079071 C-9.038000106811523,0.824999988079071 -9.038000106811523,-3.049999952316284 -9.038000106811523,-3.049999952316284 C-9.038000106811523,-3.049999952316284 4.166999816894531,2.5299999713897705 4.166999816894531,2.5299999713897705z M-10.86299991607666,-5.809000015258789 C-10.86299991607666,-5.809000015258789 -10.86299991607666,10.869999885559082 -10.86299991607666,10.869999885559082 C-10.86299991607666,10.869999885559082 8.88599967956543,2.5299999713897705 8.88599967956543,2.5299999713897705 C8.88599967956543,2.5299999713897705 -10.86299991607666,-5.809000015258789 -10.86299991607666,-5.809000015258789z"></path>
            </g>
          </g>
          <g class="send-animation-path" transform="matrix(-1,0,0,-1,63.066001892089844,17.67569923400879)"
             opacity="1" style="display: block;">
            <g opacity="1" transform="matrix(2,0,0,2,0,0)">
              <path fill="#FFFFFF" fill-opacity="1"
                    d=" M3.8350000381469727,-3.8420000076293945 C4.8979997634887695,-2.7790000438690186 5.428999900817871,-1.49399995803833 5.428999900817871,0.012000000104308128 C5.428999900817871,-1.49399995803833 5.958000183105469,-2.7790000438690186 7.015999794006348,-3.8420000076293945 C8.074000358581543,-4.90500020980835 9.357000350952148,-5.435999870300293 10.86299991607666,-5.435999870300293 C9.357000350952148,-5.435999870300293 8.074000358581543,-5.965000152587891 7.015999794006348,-7.0229997634887695 C5.958000183105469,-8.081000328063965 5.428999900817871,-9.36400032043457 5.428999900817871,-10.869999885559082 C5.428999900817871,-9.36400032043457 4.8979997634887695,-8.081000328063965 3.8350000381469727,-7.0229997634887695 C2.7720000743865967,-5.965000152587891 1.4869999885559082,-5.435999870300293 -0.01899999938905239,-5.435999870300293 C1.4869999885559082,-5.435999870300293 2.7720000743865967,-4.90500020980835 3.8350000381469727,-3.8420000076293945z"></path>
            </g>
          </g>
        </g>
      </svg>
      <svg class="update-complete" id="word-update-picture-complete" viewBox="0 0 1024 1024">
        <path
            d="M823.3 303.6c-12.5-12.4-32.9-12.4-45.3 0L429.1 652.5 246 459.3c-12.5-12.4-32.9-12.4-45.3 0-12.4 12.5-12.4 32.9 0 45.3l205.8 215.8c6.2 6.2 14.4 9.3 22.6 9.3 8.2 0 16.4-3.1 22.7-9.3l371.5-371.5c12.4-12.5 12.4-32.8 0-45.3z"
            fill="#FFFFFF" p-id="18253"></path>
      </svg>
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

.chat-block-right,
.chat-block-left {
  position: relative;
  background-color: rgba(0, 255, 255, .4);
  border: 2px solid #53B6B2; /* 分隔线 */
  border-radius: 10px 10px 10px 10px; /* 10px 圆角，底部为直角 */
  top: 80%;
  width: 500%;
  height: 500%;
  display: none;
}

.chat-block-right {
  position: relative;
  left: -475%;

}

.chat-block-left {
  left: 100%;
}

#chat-history {
//display: block;
}

.close-block-btn {
  position: absolute;
  top: 6%;
  right: 5%;
  width: 8%;
  height: 8%;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}

.chat-block-title {
  position: absolute;
  top: 2%;
  left: 5%;
  width: 50%;
  height: 15%;
}

.answer-block {
  position: absolute;
  top: 19%;
  left: 4%;
  width: 91%;
  height: 63%;
  color: #FFFFFF;
  border: 2px solid #53B6B2; /* 分隔线 */
  border-radius: 10px 10px 10px 10px; /* 10px 圆角，底部为直角 */
  overflow: hidden;
}

.answer-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
}

.input-text {
  position: absolute;
  bottom: 5%;
  left: 4%;
  width: 60%;
  height: 10%;
  background-color: #53B6B2;
  border: 2px solid rgba(1, 202, 217, 1); /* 分隔线 */
  border-radius: 10px 10px 10px 10px; /* 10px 圆角，底部为直角 */
}

.add-picture-button {
  position: absolute;
  bottom: 4%;
  right: 20%;
  width: 10%;
  height: 10%;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;

}

.update-complete {
  position: absolute;
  bottom: 2%;
  right: 17%;
  width: 14%;
  height: 14%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  display: none;
}

.submit-button {
  position: absolute;
  bottom: 2%;
  right: 3%;
  width: 15%;
  height: 15%;
  transform: translate3d(0px, 0px, 0px);
}

#word-GPT-Form,
#speak-GPT-Form {
  display: none;
}

.record-component {
  position: fixed;
  top: 20%;
  left: 30%;
  width: 50%;
  height: 50%;
  display: none;
}

.history_con {
  position: absolute;
  width: 385px;
  height: 350px;
  top: 13%;
  overflow-y: auto; /* 添加滚动条 */
}

.history-record {
  position: relative;

}

.record-button {
  position: absolute;
  bottom: 4%;
  right: 83%;
  width: 11%;
  height: 11%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}

.recorded-button {
  position: absolute;
  bottom: 0%;
  right: 80%;
  width: 17%;
  height: 17%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  display: none;
}

.record-play {
  position: absolute;
  bottom: 4%;
  right: 69%;
  width: 10%;
  height: 10%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}

.record-pause {
  position: absolute;
  bottom: 4%;
  right: 69%;
  width: 10%;
  height: 10%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  display: none;
}

.record-retry {
  position: absolute;
  bottom: 4%;
  right: 55%;
  width: 9.8%;
  height: 9.8%;
  color: #FFFFFF;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}


</style>