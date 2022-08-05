<template>
  <div class="pagination" >
    <!-- 前部 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo-1)" >上一页</button>
    <!-- <button v-show="pageNo>=4" @click="$emit('getPageNo', 1)" :class="{'active':pageNo == 1}">1</button>
    <button v-show="pageNo>4" @click="$emit('getPageNo', 2)" :class="{'active':pageNo == 2}">2</button>
    <button v-show="pageNo>5">...</button> -->
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startNumAndEndNum.start>2">...</button>

    <!-- 连续页，用v-for遍历数字形式 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{'active':pageNo == page}">{{page}}</button>

    <!-- 后部 -->
    <!-- <button v-show="pageNo<4" @click="$emit('getPageNo', 6)" :class="{'active':pageNo == 6}">6</button>
    <button v-show="pageNo<5" @click="$emit('getPageNo', 7)" :class="{'active':pageNo == 7}">7</button>
    <button v-show="!(pageNo+2 >= totalpage)">···</button> -->
    <button v-if="startNumAndEndNum.end < totalpage -1">...</button>
    <button v-if="startNumAndEndNum.end < totalpage" @click="$emit('getPageNo', totalpage)">{{totalpage}}</button>
    <button :disabled="pageNo == totalpage" @click="$emit('getPageNo', pageNo+1)">下一页</button>

    <!-- 总共的数据 -->
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {

  name: 'sv-pagenation',
  props: ['total', 'pageSize', 'pageNo', 'continues'],
  computed: {
    // 总共的页数
    totalpage () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页码的其实数字与结束数字【连续页码数字：5】
    startNumAndEndNum () {
      // 先将要用的数据结构出来
      const { totalpage, pageNo, continues } = this
      // 先定义两个变量存储开始数字和结束数字
      let start = 0; let end = 0
      // 总页数少于5的情况：
      if (continues > totalpage) {
        start = 1
        end = totalpage
      } else {
        // 总页数大于5的情况,不能写死减2
        // 起始数字
        start = pageNo - parseInt(continues / 2)
        // 结束数字
        end = pageNo + parseInt(continues / 2)
        // 解决起始为负数的问题，结束值超过总页数的问题
        if (start < 1) {
          start = 1
          end = continues
        } else if (end > totalpage) {
          end = totalpage
          start = totalpage - continues + 1
        }
      }

      return { start, end }
    }
  }
}

</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
