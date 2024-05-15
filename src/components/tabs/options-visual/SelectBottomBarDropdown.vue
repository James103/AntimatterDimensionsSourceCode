<script>
export default {
  name: "SelectBottomBarDropdown",
  computed: {
    resourceDB: () => GameDatabase.bottomBarResources,
    resources() {
      return this.resourceDB.filter(e => e.isAvailable());
    }
  },
  methods: {
    setResource(id) {
      player.options.bottomBarResourceID = id;
    }
  }
};
</script>

<template>
  <div class="l-select-theme">
    <div class="l-select-theme__inner">
      <div
        key="Default"
        class="o-primary-btn l-select-theme__item c-select-theme__item"
        @click="setResource(0)"
      >
        Latest Resource
      </div>
      <div
        v-for="res in resources"
        :key="res.name"
        class="o-primary-btn l-select-theme__item c-select-theme__item"
        @click="setResource(res.id)"
      >
        {{ res.optionName }}
      </div>
    </div>
  </div>
</template>
