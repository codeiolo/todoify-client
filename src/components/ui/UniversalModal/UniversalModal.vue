<template>
  <div class="universalModal">
    <div class="universalModal--container">
      <h1 class="universalModal--container--title">
        <slot name="title">title slot</slot>
        <button
          class="universalModal--container--close"
          aria-label="close"
          @click="close"
        >
          <i class="icon-cancel"></i>
        </button>
      </h1>
      <div class="body">
        <slot name="body">body slot</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UniversalModal",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.universalModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 99999;
  overflow: auto;
  display: flex;

  > .universalModal--container {
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 15px;
    margin: auto;
    border-radius: 5px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.281);

    > .universalModal--container--title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 0 15px 0;
      padding: 0;
      font-size: 1.5rem;
      font-weight: 300;

      > .universalModal--container--close {
        cursor: pointer;
        appearance: none;
        background: none;
        border: 0;
        padding: 0;
        font-size: 1rem;
      }
    }

    > .body {
      display: flex;
      flex-direction: column;

      > :last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
