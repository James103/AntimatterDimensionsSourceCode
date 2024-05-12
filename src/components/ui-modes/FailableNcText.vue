<script>
export default {
  name: "FailableNcText",
  data() {
    return {
      currentResource: new Decimal(0),
      maximumResource: new Decimal(0),
      currentNormalChallengeId: 9
    };
  },
  computed: {
    textStyle() {
      if (this.maximumResource.eq(0)) return {};

      const ratio = this.currentResource.div(this.maximumResource).toNumber();
      // Goes from green to yellow to red. If theme is light, use a slightly lighter yellow
      // by not allowing full red and green at the same time.
      const darkTheme = Theme.current().isDark() && Theme.current().name !== "S6";
      // Setting this constant to 2 will give green - yellow - red, setting it to 1
      // will give a straight line between green and red in colorspace, intermediate values
      // will give intermediate results.
      // The last factor in the green term darkens the text on light themes to provide better contrast
      const c = darkTheme ? 2 : 1.5;
      const rgb = [
        Math.round(Math.min(c * ratio, 1) * 255),
        Math.round(Math.min(c * (1 - ratio), 1) * 255 * (darkTheme ? 1 : 0.7)),
        0
      ];

      return { color: `rgb(${rgb.join(",")})` };
    },
    text() {
      if (this.currentNormalChallengeId === 9) {
        return `${formatInt(this.currentResource)} / ${formatInt(this.maximumResource)} purchases used`;
      }
    }
  },
  methods: {
    update() {
      if (this.currentNormalChallengeId === 9) {
        // Normal Challenge 9
        this.currentResource = new Decimal(player.chall9Purchases);
        this.maximumResource = new Decimal(NormalChallenge(9).config.maxPurchases());
      }
    },
  },
};
</script>

<template>
  <span> - <span :style="textStyle">{{ text }}</span></span>
</template>

<style scoped>

</style>
