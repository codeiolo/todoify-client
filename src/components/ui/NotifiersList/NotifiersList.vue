<template>
  <transition-group class="notifiersList" name="slideInLeft" tag="div">
    <div
      v-for="(notifier, index) in notifiers"
      :key="index + 1"
      :class="notifier.type"
      class="notifier"
    >
      <div class="icon" :class="iconType(notifier.type)"></div>
      <span class="message">{{ notifier.message }}</span>
      <l-button design="noStyle" @click="close(index)">
        <i class="icon-cancel close"></i>
      </l-button>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "NotifiersList",
  computed: {
    notifiers() {
      return this.$store.getters.getNotifiers;
    }
  },
  updated() {
    if (this.notifiers.length >= 1) {
      let vm = this;
      setTimeout(() => {
        vm.$store.commit("closeNotifier");
      }, 5000);
    }
  },
  methods: {
    close(index) {
      this.$store.commit("closeNotifier", index);
    },
    iconType(type) {
      let icon;
      switch (type) {
        case "error":
          icon = "icon-attention-circled";
          break;
        case "warning":
          icon = "icon-attention";
          break;
        case "success":
          icon = "icon-ok-circled";
          break;
        case "info":
          icon = "icon-info-circled";
          break;
        default:
          icon = "icon-info-circled";
          break;
      }
      return icon;
    }
  }
};
</script>

<style lang="scss">
.notifiersList {
  position: sticky;
  top: 55px;
  width: 100%;
  z-index: 1;

  .notifier {
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;

    > .icon {
      font-size: 20px;
      margin-right: 15px;
      width: 20px;
    }

    > .message {
      width: 100%;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  > .error {
    background: #f8d7da;
    color: rgb(110, 49, 54);
  }

  > .warning {
    background: #fff3cd;
    color: rgb(110, 104, 49);
  }

  > .success {
    background: #d4edda;
    color: rgb(51, 110, 49);
  }

  > .info {
    background: #d1ecf1;
    color: rgb(49, 80, 110);
  }
}

@media screen and (min-width: 1025px) {
  .notifiersList {
    top: 0;
  }
}
</style>
