<template>
  <div class="history">
    <div v-for="(record, index) in displayedRecords" :key="index" class="history-record">
      <div>{{ record.time }}</div>
      <div>{{ record.question }}</div>
      <div>{{ record.answer }}</div>
      <img v-if="record.image" :src="record.image" alt="Question Image" />
    </div>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default{
  data(){
      return {
  historyRecords: [
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: '/src/assets/image/leftb1.png'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    {
      time: '2023-01-01 10:00',
      question: '历史问题1',
      answer: '历史回答1',
      image: 'path/to/image1.jpg'
    },
    // ... 其他历史记录
  ],
  itemsPerPage: 5, // 每页显示的记录数
  currentPage: 1 // 当前页
};
  },
  created() {
},
mounted() {
  
  function addHistory(){
      this.historyRecords.push(newRecord);
  }

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
  addHistoryRecord(question, answer, image) {
  const currentTime = new Date().toLocaleString();
  const newRecord = {
    time: currentTime,
    question: question,
    answer: answer,
    image: image
  };
  this.historyRecords.push(newRecord);
},
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}

}

</script>
<style>
.history{
  background: url(/src/assets/image/leftb1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 100%;
}

</style>