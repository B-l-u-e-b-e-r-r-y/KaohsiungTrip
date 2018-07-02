var data_url = "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";

var area_data = [];

var vm = new Vue({
  el: "#app",
  data: {
    items: [],
    location_data: ["全部", "楠梓區", "左營區", "鼓山區", "三民區", "苓雅區", "新興區", "前金區", "鹽埕區", "前鎮區", "旗津區", "小港區", "鳳山區", "茂林區", "甲仙區", "六龜區", "杉林區", "美濃區", "內門區", "仁武區", "田寮區", "旗山區", "梓官區", "阿蓮區", "湖內區", "岡山區", "茄萣區", "路竹區", "鳥松區", "永安區", "燕巢區", "大樹區", "大寮區", "林園區", "彌陀區", "橋頭區", "大社區", "那瑪夏區", "桃源區"],
    search: "",
    loca_choose: "全部",
    free: false,
    allday: false,
    detailmode: false,
    detaildata: {}
  },mounted: function(){
    $.get(data_url).then(function(res){
      vm.items = res.result.records;
    })
  },methods: {
    remove: function(data){
      if(data == "loca"){
        this.loca_choose = "全部";
      }else if(data == "s_word"){
        this.search = "";
      }else if(data == "free"){
        this.free = false;
      }else if(data == "allday"){
        this.allday = false;
      }
    },
    refresh: function(){
      this.detailmode = false;
      this.$mount("#app");
    },
    home: function(){
      this.detailmode = false;
      this.$mount("#app");
      this.loca_choose = "全部";
      this.search = "";
      this.free = false;
      this.allday = false;
    },
    detail_mode: function(item){
      this.detailmode = true;
      this.detaildata = item;
    }
  },computed: {
    filtered_item: function(){
      var vm = this;
      var data = vm.items;
      var ifsearch = vm.search;
      var ifloca = vm.loca_choose;
      var ifree = vm.free;
      var ifallday = vm.allday;
      
      if(ifsearch != ""){
         data = data.filter(function(item){
           var val = false;
           if(item.Name.indexOf(ifsearch)!=-1){
             val = true;
           }
           return val;
         });
      }
      
      if(ifloca != "全部"){
        data = data.filter((item)=>{
          var val = false;
          if(item.Zone.indexOf(ifloca)!=-1){
            val = true;
          }
          return val;
        });
      }
      
      if(ifree == true){
        data = data.filter((item)=>{
          var val = false;
          if(item.Ticketinfo == "免費參觀"){
            val = true;
          }
          return val;
        });
      }
      
      if(ifallday == true){
        data = data.filter((item)=>{
          var val = false;
          if(item.Opentime == "全天候開放"){
            val = true;
          }
          return val;
        });
      }
      
      return data;
    }
  }
});