<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <p><input type="text" v-model="hello"></p>
    <button @click="resetCount(msg)">清空</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  private hello: string = '你好';
  @Prop({default: '消息'}) private msg!: string;

  @Emit('reset')
  public resetCount(h: string) {
    this.hello = this.msg;
    this.$router.push('/capture')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
p,button,h1{
  font-size: .21rem;
}
</style>
