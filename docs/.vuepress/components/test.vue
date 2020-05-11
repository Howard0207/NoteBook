<template>
  <div>
    <div>
      <div>
        参数1：
        <input />
      </div>
      <div>
        参数2：
        <input />
      </div>
      <div>
        参数3：
        <input />
      </div>
    </div>
    <button @click="doSomething">提交</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    doSomething: function() {
      this.count = ++this.count;
    }
  }
};
</script>