<script>
export default {
  name: "HealthDisplay",
  data() {
    return {
      sidebarID: 0,
      resourceName: "",
      resourceValue: new Decimal(0),
      resourceIcon: "<i class='fas fa-heart'></i>",
      progressStyle: `--hp-left: 0%`
    };
  },
  computed: {
    resourceDB: () => GameDatabase.bottomBarResources,
    numDBEntries() {
      return this.resourceDB.length;
    },
    resource() {
      // With "default" sorting, return the latest unlocked resource - otherwise, return the specified one
      return this.sidebarID === 0
        ? this.resourceDB.filter(e => e.isAvailable()).sort((a, b) => b.id - a.id)[0]
        : this.resourceDB.find(e => e.id === this.sidebarID);
    },
    displayValue() {
      // RM + iM seems to cause strange, undesirable linebreaks
      return this.resource.formatValue(this.resourceValue);
    }
  },
  methods: {
    update() {
      this.sidebarID = player.options.bottomBarResourceID;
      this.resourceName = this.resource.resourceName ?? this.resource.optionName;
      this.resourceIcon = this.resource.icon ?? "?";
      this.resourceValue.copyFrom(this.resource.value());
      const ratio = Math.clamp(this.getResourceRatio(), 0, 1);
      this.progressStyle = `
        --filter: hue-rotate(-${(1 - ratio) * 100}deg) brightness(${1 + (1 - ratio) / 2});
        --hp-left: ${ratio * 100}%;
      `;
    },
    getResourceRatio() {
      if (this.resource.ratio) {
        return +this.resource.ratio()
      } else {
        return this.resourceValue.log10() / Math.log10(Number.MAX_VALUE)
      }
    }
  }
};
</script>

<template>
  <div
    class="health-display"
    :style="progressStyle"
  >
    <span class="health-display__nums">
      <span>
        {{ displayValue }} {{ resourceName }}
      </span>
    </span>
    <b class="health-display-icon" v-html="resourceIcon"></b>
  </div>
</template>

<style scoped>
.health-display {
  --filter: hue-rotate(0deg) brightness(1);
  --hp-left: 30%;


  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2rem;

  color: #111;

  background: linear-gradient(
    90deg,
    #5e7d24 0%,
    #9ccc42 48%,
    #0000 50%
  ), repeating-linear-gradient(
    45deg,
    #111 0%,
    #111 0.8%,
    #411 0.8%,
    #411 0.9%,
    #111 0.9%
  );
  filter: var(--filter);

  background-position: calc(100% - var(--hp-left)), calc(var(--hp-left) / 5);
  background-size: 200%;

  z-index: 50;
  pointer-events: all;
  user-select: none;

  border-top: 0.2rem solid #5e7d24;

  transition: 0.3s background-position;
}

.health-display__nums {
  color: #aaa;
  mix-blend-mode: difference;
}

.health-display-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 5.5rem;
  height: 5.5rem;
  padding: 0 1rem 1rem 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  font-size: 2em;

  color: #5e7d24;
  background-color: #9ccc42;
  border-left: 0.2rem solid #5e7d24;
  border-top: 0.2rem solid #5e7d24;
  border-radius: 100% 0 0 0;
}
</style>