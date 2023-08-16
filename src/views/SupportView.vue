<template>
  <div class="support container">
    <header>
      <div class="user-info">
        <img src="/images/user4.webp" />
        <span>Jack</span>
        <span>WhatsApp: <a @click="openWhatsApp" href="#">7365789065</a></span>
      </div>
    </header>
    <section>
      <div class="merchant-intro">
        <h5>Welcome to FragranceFinesse!</h5>
        <!--        <p>
          Explore unique products carefully curated to meet your diverse needs.
          Our passionate team is committed to delivering a satisfying shopping
          experience, ensuring product quality and your expectations are met.
        </p> -->
        <p>
          We prioritize customer satisfaction, offering premium products with
          integrity in a safe shopping environment. Your satisfaction is our
          honor. Reach out for assistance with any inquiries or issues during
          your shopping journey.
        </p>
        <p>
          Thank you for your support. We're excited to provide you with an
          exceptional shopping experience!
        </p>
        <p>The FragranceFinesse Team</p>
        <p>WhatsApp: 7365789065</p>
        <p>Email: 7365789065@gmail.com</p>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
export default {
  name: "SupportView",
  components: {
    TabbarView,
  },
  methods: {
    openWhatsApp() {
      // 定义弹出窗口的宽度和高度
      const width = 600;
      const height = 400;

      // 计算窗口的左上角位置，使其居中
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      // 定义窗口属性
      const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

      // 构建 WhatsApp 链接
      const whatsappLink = `https://web.whatsapp.com/`;

      // 在新窗口中打开 WhatsApp
      window.open(whatsappLink, "_blank", windowFeatures);
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.26rem;
  background-color: #fa9884;
  .user-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.76rem;
      height: 1.76rem;
      border-radius: 50%;
    }
    span {
      font-size: 0.48rem;
      color: #fff;
      padding: 0.3rem 0;
    }
  }
}
section {
  .merchant-intro {
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 1.6;
    h5 {
      margin: 0.2rem 0.1rem;
    }
    p {
      margin: 0.1rem;
    }
  }
}
</style>
