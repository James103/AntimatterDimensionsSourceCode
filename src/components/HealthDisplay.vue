<script>
export default {
  name: "HealthDisplay",
  data() {
    return {
      resourceStr: "1.000",
      maxResourceStr: "1.000",
      resourceDeltaStr: "± 0.000",
      resourceIcon: "<i class='fas fa-heart'></i>",
      progressStyle: `--hp-left: 0%`,
      hover: false
    };
  },
  methods: {
    update() {
      this.resourceStr = format(1, 3, 3);
      this.maxResourceStr = format(1, 3, 3);
      const ratio = 1;
      this.progressStyle = `
        --filter: hue-rotate(-${(1 - ratio) * 100}deg) brightness(${1 + (1 - ratio) / 2});
        --hp-left: ${ratio * 100}%;
      `;

      const delta = new Decimal(0);
      const sign = ["-", "±", "+"][delta.sign() + 1];
      this.resourceDeltaStr = `${sign} ${format(delta.abs(), 3, 3)}/s`;
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
        {{ resourceStr }} / {{ maxResourceStr }} ({{ resourceDeltaStr }})
      </span>
    </span>
    <b class="health-display-icon">{{ resourceIcon }}</b>
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