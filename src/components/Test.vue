
<template>
  <div class="control-section">
<div id = 'flat-list'>
<!-- ListView element -->
<ejs-listview id='sample-list-flat' ref='list' :dataSource='data' :fields='fields' :template='datatemplate' :actionComplete='onComplete' >
</ejs-listview>
  <!-- <template v-for="(field, index) in fields">
    <component :is="field"></component>
  </template> -->
</div>
   <button id="btn" v-on:click="onClick">Add Item</button>
  </div>
</template>
<style>
 #sample-list-flat {
  margin: 40px auto;
  max-width: 500px;
}

#btn {
  margin:40px auto;
  display:block;
}
/* csslint ignore:start */

@font-face {
  font-family: "e-icon";
  src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmXOniGAAAAcgAAAFAaGVhZBC1AhkAAADQAAAANmhoZWEIUQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQCgAAAAAAHAAAAABm1heHABDgCYAAABCAAAACBuYW1lv4Bt4QAAAwgAAAIZcG9zdJx8QW4AAAUkAAAAOwABAAAEAAAAAFwEAAAAAAAD9AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAApWcDV18PPPUACwQAAAAAANbRXpQAAAAA1tFelAAAAAAD9AP0AAAACAACAAAAAAAAAAEAAAACAIwAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAoAAAAAIAAAAAA/QD9AALAIsAAAEHFwcnByc3JzcXNwUfHz8fLx8PHgLuhIRrg4NrhIRrg4P9iQECAwQGBwcJCwsMDQ4PDxEREhMUFBUWFhcXFxkYGRkaGhkZGBkXFxcWFhUUFBMSEREPDw4NDAsLCQcHBgQDAgEBAgMEBgcHCQsLDA0ODw8RERITFBQVFhYXFxcZGBkZGhoZGRgZFxcXFhYVFBQTEhERDw8ODQwLCwkHBwYEAwICg4OGa4SEa4ODaoCE7hoZGRgZFxcXFhYVFBQTEhERDw8ODQwLCwkHBwYEAwIBAQIDBAYHBwkLCwwNDg8PERESExQUFRYWFxcXGRgZGRoaGRkYGRcXFxYWFRQUExIREQ8PDg0MCwsJBwcGBAMCAQECAwQGBwcJCwsMDQ4PDxEREhMUFBUWFhcXFxkYGRkAAAASAN4AAQAAAAAAAAABAAAAAQAAAAAAAQAGAAEAAQAAAAAAAgAHAAcAAQAAAAAAAwAGAA4AAQAAAAAABAAGABQAAQAAAAAABQALABoAAQAAAAAABgAGACUAAQAAAAAACgAsACsAAQAAAAAACwASAFcAAwABBAkAAAACAGkAAwABBAkAAQAMAGsAAwABBAkAAgAOAHcAAwABBAkAAwAMAIUAAwABBAkABAAMAJEAAwABBAkABQAWAJ0AAwABBAkABgAMALMAAwABBAkACgBYAL8AAwABBAkACwAkARcgZGVsZXRlUmVndWxhcmRlbGV0ZWRlbGV0ZVZlcnNpb24gMS4wZGVsZXRlRm9udCBnZW5lcmF0ZWQgdXNpbmcgU3luY2Z1c2lvbiBNZXRybyBTdHVkaW93d3cuc3luY2Z1c2lvbi5jb20AIABkAGUAbABlAHQAZQBSAGUAZwB1AGwAYQByAGQAZQBsAGUAdABlAGQAZQBsAGUAdABlAFYAZQByAHMAaQBvAG4AIAAxAC4AMABkAGUAbABlAHQAZQBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIAB1AHMAaQBuAGcAIABTAHkAbgBjAGYAdQBzAGkAbwBuACAATQBlAHQAcgBvACAAUwB0AHUAZABpAG8AdwB3AHcALgBzAHkAbgBjAGYAdQBzAGkAbwBuAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAQIBAwARY2lyY2xlLWNsb3NlLS0tMDIAAAA=)
format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* csslint ignore:end */

#sample-list-flat .delete-icon::after {
  font-family: "e-icon";
  content: "e700";
  float: right;
  cursor: pointer;
}


@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-lists/styles/material.css";

</style>
<script>
import Vue from "vue";
import { ListViewPlugin } from "@syncfusion/ej2-vue-lists";

//import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
Vue.use(ListViewPlugin);
//Vue.use(ButtonPlugin);
var demoVue = Vue.component("demo", {
  template: `<div class='text-content'> {{data.text}} <span class = 'delete-icon'></span> </div>`,
  data() {
return {
  data: {}
};
  }
});

export default {
  name:'Test',
  components: {
      "ejs-listview": ListViewPlugin
    },
  data: function() {
    
return {
    data: [
      { text: "Hennessey Venom", id: "1", icon: "delete-icon" },
      { text: "Bugatti Chiron", id: "2", icon: "delete-icon" },
      { text: "Bugatti Veyron Super Sport", id: "3", icon: "delete-icon" },
      { text: "Aston Martin One- 77", id: "4", icon: "delete-icon" },
      { text: "Jaguar XJ220", id: "list-5", icon: "delete-icon" },
      { text: "McLaren P1", id: "6", icon: "delete-icon" }
    ],
    fields: { text: 'text', iconCSS: 'icon' },
    datatemplate: function () {
            return { template : demoVue}
        }
};
  },
   methods: {
    deleteItem: function(args){
        args.stopPropagation();
        let liItem = args.target.parentElement.parentElement;
        this.$refs.list.removeItem(liItem);
        this.onComplete();
    },
    onComplete: function(args) {
        let iconEle = document.getElementsByClassName("delete-icon");
        var _this =this;
        //Event handler to bind the click event for delete icon
        Array.from(iconEle).forEach(function(element) {
            element.addEventListener("click", _this.deleteItem.bind(_this));
        });
    },
    onClick: function(){
        let data = {
                text: "Koenigsegg - " + (Math.random() * 1000).toFixed(0),
                id: (Math.random() * 1000).toFixed(0).toString(),
                icon: "delete-icon"
            };
        this.$refs.list.addItem([data]);
    }
}
}
</script>