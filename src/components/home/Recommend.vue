<template>
  <div class="recommend">
    <CardView></CardView>
    <ul>
      <li v-for="(item, index) in recommendList" :key="index">
        <img :src="item.imgUrl" alt="" />
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.content }}</p>
          <div class="price">
            <span>￡</span>
            <b>{{ item.price }}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CardView from "@/components/home/Card.vue";
export default {
  name: "RecView",
  components: {
    CardView,
  },
  data() {
    return {
      recommendList: [
        {
          id: 1,
          name: "VonHaus Large Sideboard",
          imgUrl: "./images/recommend1.jpg",
          content: "Wide Storage Cabinet White",
          price: "179",
        },
        {
          id: 2,
          name: "Dog Storage Basket",
          imgUrl: "./images/recommend2.jpg",
          content:
            "Personalised Dog Storage Basket ssssssssssssssssssssssssssssssss",
          price: "14.5",
        },
        {
          id: 3,
          name: "VonHaus Large Sideboard",
          imgUrl: "./images/recommend1.jpg",
          content: "Wide Storage Cabinet White",
          price: "170",
        },
      ],
    };
  },
};
</script>

<style scoped>
.recommend {
  position: relative;
}
.recommend ul li {
  position: relative;
  top: 0;
}
.recommend li img {
  width: 3rem;
  height: 3rem;
}
.recommend ul li > div {
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  width: 50%;
  /*  padding: 0.5rem; */
}
.recommend ul li > div h3 {
  font-size: 12px;
}
.recommend ul li > div p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.4rem;
}
.price {
  margin-top: 0.66rem;
  text-align: right;
}
.price span {
  font-size: 0.4px;
}
.price b {
  font-size: 0.5rem;
}
</style>
