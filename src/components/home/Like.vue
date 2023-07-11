<template>
  <div class="like">
    <CardView><span>Guess</span></CardView>
    <ul>
      <li v-for="(item, index) in likeList" :key="index">
        <img :src="item.imgUrl" />
        <h3>{{ item.name }}</h3>
        <div>
          <span>￡</span>
          <b>{{ item.price }}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CardView from "@/components/home/Card.vue";
export default {
  name: "LikeView",
  components: {
    CardView,
  },
  data() {
    return {
      likeList: [
        {
          id: 1,
          name: "Personalised Dog Storage Basket",
          imgUrl: "./images/recommend1.jpg",
          price: "199",
        },
        {
          id: 2,
          name: "Personalised Dog Storage Basket",
          imgUrl: "./images/recommend2.jpg",
          price: "19",
        },
        {
          id: 3,
          name: "Personalised Dog Storage Basket",
          imgUrl: "./images/recommend2.jpg",
          price: "8999",
        },
        {
          id: 4,
          name: "Personalised Dog Storage Basket",
          imgUrl: "./images/recommend2.jpg",
          price: "109",
        },
      ],
    };
  },
};
</script>

<style scoped>
.like ul {
  display: flex;
  flex-wrap: wrap;
}
.like ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.like ul li img {
  width: 4rem;
  height: 4rem;
}
.like ul li h3 {
  font-size: 12px;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.like ul li span {
  font-size: 0.4rem;
}
.like ul li b {
  font-size: 0.5rem;
}
</style>
