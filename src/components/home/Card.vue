<template>
  <div class="title">
    <slot>
      <span>Recommend</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "CardView",
};
</script>

<style scoped>
.title {
  padding: 0.2rem 0;
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
}
.title span {
  position: relative;
  color: #fa9884;
}
.title span::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  background-color: #fa9884;
  top: 50%;
  margin-top: -4px;
  right: -0.5rem;
}
.title span::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  top: 50%;
  margin-top: -4px;
  left: -0.5rem;
  background-color: #fa9884;
}
</style>
