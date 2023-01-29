<template>
  <img
    class="Avatar-container"
    :src="src"
    alt=""
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 160,
    },
  },
};
</script>

<style scoped lang="less">
.Avatar-container {
  display: block;
  object-fit: cover;
  border-radius: 50%;
}
</style>