<template>
  <div class="editorContainer">
        <markdown 
        :mdValuesP="msg.mdValue"  
        :fullPageStatusP="false" 
        :editStatusP="true" 
        :previewStatusP="true" 
        :navStatusP="true"
        :icoStatusP="true"  
        @childevent="childEventHandler"
        ></markdown>
        </div>
</template>
<script>
import markdown from './markdown'
export default {
  data() {
        return {
            msgShow:'我要显示的内容',
            dilogStatus:false,
            msg: {
                mdValue:'## Vue-markdownEditor'
            }
        }
    },
    components: {
        markdown
    },
    methods:{
        childEventHandler:function(res){
            // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg=res;
        },
    }
}
</script>
<style>
.editorContainer {
        width: 90%;
        height: 700px;
        border: 1px solid #ddd;
    }
</style>
