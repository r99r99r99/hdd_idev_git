<template>
  <div>
    <div class="menuSvg">
      <hamburger :isActive="sidebar.opened" :toggleClick="toggleSideBar" class="hamburger-container"></hamburger>
    </div>
    <div class="product_sort">
      <div class="bd">
        <div :id="'menu_'+item.name" class="item" v-for="item,index in routes">
          <div class="title" v-show="$store.state.app.sidebar.opened">
            <a href="javascript:void(0)">
              <i :class="item.meta.icon" style="display:inline" v-if="item.meta&&item.meta.icon"></i>
              <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta)}}</span>
              <!--<span>{{item.meta.title}}</span>-->
            </a>
          </div>
          <div class="arrow" v-if="$store.state.app.sidebar.opened">&gt;</div>
          <div class="arrow" v-else><i :class="item.meta.icon" style="color:#494949"
                                       v-if="item.meta&&item.meta.icon"></i></div>
          <div class="line"></div>
          <div class="subitem">
            <template v-if="item.children&&item.children.length>0">
              <div class="inner" v-for="itemTwo,indexTwo in item.children">
                <div class="tit tit1">
                  <div class="name" v-if="itemTwo.meta&&itemTwo.meta.title">
                    <i :class="itemTwo.meta.icon" style="display:inline" v-if="itemTwo.meta.icon"></i>
                    {{generateTitle(itemTwo.meta)}}
                  </div>
                  <ul>
                    <li @click="clickOne(itemThree)" v-for="itemThree,indexThree in itemTwo.children">
                      <a href="javascript:void(0)"
                         v-if="itemThree.meta&&itemThree.meta.title">
                        <i :class="itemThree.meta.icon" style="display:inline" v-if="itemThree.meta.icon"></i>
                        {{generateTitle(itemThree.meta)}}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Hamburger from './Hamburger'

  export default {
    name: 'SidebarItem',
    components: {
      Hamburger,
    },
    props: {
      routes: {
        type: Array
      }
    },
    data() {
      return {
        menuVisitUrl: "",
        menuSelUrl: ""
      }
    },
    mounted() {
      let myts = this;
      $(".product_sort .bd .item").hover(function (e) {
        $(this).addClass("layer");
        $(this).children()[3].style.left = $(this).css("width");
        let itemTop = e.currentTarget.offsetTop;
        let menuHeight = $(this).children()[3].clientHeight;
        let windowHeigth = document.body.clientHeight - 85;
        if ((itemTop + menuHeight) > windowHeigth) {
          $(this).children()[3].style.top = windowHeigth - (itemTop + menuHeight) + "px";
        } else {
          $(this).children()[3].style.top = "-1px";
        }
        if (myts.menuSelUrl != myts.menuVisitUrl) $("#menu_" + myts.menuVisitUrl).removeClass("menuvisit");
        myts.menuVisitUrl = $(this)[0].id.substr(5);
        if (myts.menuSelUrl != myts.menuVisitUrl) $("#menu_" + myts.menuVisitUrl).addClass("menuvisit");
      }, function () {
        $(this).removeClass("layer");
        if (myts.menuSelUrl != myts.menuVisitUrl) $("#menu_" + myts.menuVisitUrl).removeClass("menuvisit");
      });
    },
    methods: {
      generateTitle(meta) {

        if (this.$i18n.locale == 'zh') {
          return meta.title//i18n wxl
        } else {
          return meta.enTitle//
        }
        //return this.$t('route.' + title)
      },
      clickOne(item) {

        if (!item.path && !item.redirect) {
          return false
        }
        let obj = {path: item.path, menuId: item.menuId, title: item.meta.title}
        //记录菜单点击
        this.$http.post('/webresources/login/com/ComMenuHistory/menuClick', obj).then(response => {


          $("#menu_" + this.menuSelUrl).removeClass("menuvisit");
          $("#menu_" + this.menuVisitUrl).addClass("menuvisit");

          this.menuSelUrl = this.menuVisitUrl;
        });
        if (item.meta.type === "2") {
          if (item.redirect) {
            window.open(item.redirect, '_blank');
          } else {
            let routeData = this.$router.resolve({
              name: item.name,
              params: item.meta.addQuery
            });
            window.open(routeData.href, '_blank');
          }
        } else {
          this.$router.push({
            name: item.name,
            params: item.meta.addQuery
          });
        }
      },
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ])
    },
  }

</script>
<style lang="scss" scoped>
  @import 'css/menu.css'; // normalize.css 样式格式化
</style>
