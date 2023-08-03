<template>
  <div class="path-list container">
    <HeaderView>
      <span v-if="status">Add Address</span>
      <span v-else>Edit Address</span>
    </HeaderView>
    <section>
      <div class="details">
        <ul>
          <li>
            <span>Name</span>
            <input style="text" v-model="name" />
          </li>
          <li>
            <span>Tel</span>
            <input style="text" v-model="tel" />
          </li>
          <li>
            <span>Address</span>
            <input style="text" v-model="address" />
          </li>
        </ul>
      </div>
      <div class="default">
        <p>default adress</p>
        <van-checkbox v-model="isDefault"></van-checkbox>
      </div>
      <div class="btn" @click="onSave">
        <span>save</span>
      </div>
      <div v-if="!status" class="delete" @click="deleteAdd">
        <span>delete</span>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import HeaderView from "@/components/path/Header.vue";
import TabbarView from "@/components/common/Tabbar.vue";
import http from "@/common/api.js";
import { Toast } from "mint-ui";
export default {
  components: {
    HeaderView,
    TabbarView,
  },
  data() {
    return {
      status: false, //判断是否是添加进来的
      name: "",
      tel: "",
      address: "",
      isDefault: false,
      id: 0, //记录地址数据的id号
    };
  },
  methods: {
    deleteAdd() {
      http
        .$axios({
          url: "/api/deleteAdd",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            id: this.id,
          },
        })
        .then((res) => {
          if (res.status) {
            Toast(res.msg);
            this.$router.push("/path");
          }
        });
    },
    onSave() {
      //true为0，false为1
      let de = this.isDefault ? 0 : 1;
      //用户输入的值
      let content = {
        name: this.name,
        tel: this.tel,
        address: this.address,
        isDefault: de,
      };
      //发送请求
      http
        .$axios({
          url: "/api/addAddress",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            ...content,
            status: this.status,
            id: this.id,
          },
        })
        .then((res) => {
          if (res.status) {
            Toast(res.msg);
            this.$router.push("/path");
          }
        });
    },
  },
  mounted() {
    this.id = this.$route.params.key.id;
    //通过点击添加进来
    if (this.$route.params.key == "add") {
      this.status = true;
    } else if (this.$route.params.key) {
      let isDefault = this.$route.params.key.isDefault === 0 ? true : false;
      this.name = this.$route.params.key.name;
      this.tel = this.$route.params.key.tel;
      this.address = this.$route.params.key.address;
      this.isDefault = isDefault;
    } else {
      this.name = "";
      this.tel = "";
      this.address = "";
      this.isDefault = false;
    }
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: #ffe5ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  .details {
    width: 98%;
    height: 30%;
    background-color: #fff;
    border-radius: 6px;
    margin-top: 0.5rem;
    ul {
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.3rem 0;
        span {
          font-size: 0.4rem;
        }
        input {
          border: none;
          margin: 0;
          padding: 0;
          outline: none;
          border-bottom: 0.01rem solid #ccc;
        }
      }
    }
  }
  .default {
    width: 98%;
    height: 10%;
    background-color: #fff;
    margin: 0.3rem 0.2rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 0.4rem;
      margin: 0 0.2rem;
    }
  }
  .btn {
    background-color: #fa9884;
    width: 60%;
    height: 1.2rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    span {
      color: #fff;
    }
  }
  .delete {
    background-color: #fff3e2;
    width: 60%;
    height: 1.2rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 0.5rem;
    span {
      color: #fa9884;
    }
  }
}
</style>
