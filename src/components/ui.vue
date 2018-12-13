<template>
<div class="ui-dialog-box passwordBox" :class="{'ui-show': isShowPwd}" v-if="isShowPwd">
    <div class="ui-dialog ui-center">
        <div class="ui-dialog-header">
            <h3 class="ui-dialog-header-title">{{dtitle||'请输入交易密码'}}</h3>
            <i class="ui-icon ui-dialog-close icon-close" @click="closeClick()">X</i>
        </div>
        <div class="ui-dialog-body ui-form">
            <input class="inp"  ref="inp"  type="tel" pattern="[0-9]*" name="txtPassword" v-model="pwdValue" @change="updatePassword();" @focus="onFocus();" @blur="onBlur()" autocomplete="off" autocorrect="off" maxlength="6">
            <div class="ui-form-item" :class="{'ui-focus':focused}">
                <ul class="pwdList ui-form-text">
                    <li v-for="(item, index) in passwordList" :key="index" @click="inputFocus()"><span :class="{'dot': index<pwdValue.length}"></span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
@Component
// ({
//     data() {
//         return {
//           pwdValue: ''
//         }
//     }}
// )
export default class Ui extends Vue {
//   @Prop({default: '请输入交易密码'}) private dtitle!: string;
  private isShowPwd: boolean = true;
  private dtitle: string = '请输入交易密码';
  private focused: boolean = false;
  private passwordList: number[] = [1, 2, 3, 4, 5, 6];
  private pwdValue: string = ''
  constructor() {
      super();
      this.pwdValue = ''
  }
//   public pwdValue: any = '';
  //#endregion
  public inputFocus() {
      (<any>this.$refs.inp).focus()
    //   console.log(this.pwdValue.length)
  }
  private updatePassword() {}
  private onFocus() {}
  private onBlur() {}
  private created(): void {}
  private mounted(): void {
     (<any>this.$refs.inp).focus();
  }
  private closeClick() {
      this.isShowPwd = false;
      this.$emit('close')
  }
 @Watch('pwdValue', {immediate: true})
  public pwdValueChange(val: number, oldVal: number) {
      console.log(val)
    if(val.toString().length === 6) {
        (<any>this.$refs.inp).focus()
        this.closeClick()
    }
  }
}
</script>

<style scoped lang="less">
.ui-dialog-box{
    background: rgba(0,0,0,0.1);
    width: 100%;
    height: 100%;
    position: relative;
    .ui-dialog{
     width:70%;
     height: 2rem;
     background: #fff;
     position: fixed;
     top: 10%;
    //  bottom: 0;
     left: 0;
     right: 0;
     margin:auto;
     .ui-dialog-header{
         height: .53rem;
         line-height: .53rem;
         position: relative;
         border-bottom: 1px solid #ddd;
         h3{
             font-weight: 200;
             font-size: .24rem;
         }
         .ui-icon{
             display: inline-block;
             width: .27rem;
             height: .27rem;
             position: absolute;
             right: .13rem;
             top: 0;
         }
     }
     .ui-dialog-body{
         position: relative;
         width: 100%;
         height: 1.47rem;
         .inp{
             width: 100%;
             height: .01rem;
             position: absolute;
             z-index: 5;
             left: 0;
             right: 0;
             top: -10rem;
             bottom: 0;
             margin: auto;
             color: #fff;
         }
         .ui-form-item{
             z-index: 50;
             width: 80%;
             height: .27rem;
             border: 1px solid #999;
             position: absolute;
             left: 0;
             right: 0;
             top: 0;
             bottom: 0;
             margin: auto;
          .ui-form-text{
              width: 100%;
              display: flex;
              height: 100%;
              padding: 0;
              li{
                flex: 1;
                list-style: none;
                border-right: 1px solid #999;
                position: relative;
                &:last-of-type{
                    border: none; 
                }
                .dot{
                    display: block;
                    &:after{
                  display: inline-block;
                  content: '.';
                //   width: 100%;
                }}
              }
          }
         }
     }
    }
}
</style>