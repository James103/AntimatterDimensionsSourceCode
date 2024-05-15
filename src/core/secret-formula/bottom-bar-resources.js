export const bottomBarResources = [
  // Note: ID 0 is interpreted in the Vue component as "the largest unlocked ID" - do not use ID 0
  {
    id: 1,
    optionName: "Blob",
    isAvailable: () => Themes.available().map(t => t.name).includes("S11"),
    // This is a dummy value to prevent vue errors
    value: () => new Decimal(1),
    ratio: () => 1,
    formatValue: () => "\uE010",
    icon: "\uE010", 
  },
  {
    id: 2,
    optionName: "Antimatter",
    isAvailable: () => true,
    value: () => Currency.antimatter.value,
    ratio: () => Currency.antimatter.value.log10() / Player.infinityGoal.log10(),
    formatValue: x => format(x, 2, 1),
    icon: "Ω",
  },
  {
    id: 3,
    optionName: "Infinity Points",
    isAvailable: () => PlayerProgress.infinityUnlocked(),
    value: () => Currency.infinityPoints.value.floor(),
    ratio: () => Currency.infinityPoints.value.log10() / Player.eternityGoal.log10(),
    formatValue: x => format(x, 2),
    icon: "∞",
  },
  {
    id: 4,
    optionName: "Replicanti",
    isAvailable: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
    value: () => Replicanti.amount,
    ratio: () => (Replicanti.galaxies.bought + Math.clampMax(Replicanti.amount.log10() / Math.log10(Number.MAX_VALUE), 1)) / (Replicanti.galaxies.max + 1),
    formatValue: x => (Replicanti.galaxies.max === 0 ? format(x, 2) : (formatInt(Replicanti.galaxies.bought) + "/" + formatInt(Replicanti.galaxies.max) + " RG + " + format(x, 2))),
    icon: "Ξ",
  },
  {
    id: 5,
    optionName: "Eternity Points",
    isAvailable: () => PlayerProgress.eternityUnlocked(),
    value: () => Currency.eternityPoints.value.floor(),
    ratio: () => Currency.eternityPoints.value.log10() / 4000,
    formatValue: x => format(x, 2),
    icon: "Δ",
  },
  {
    id: 6,
    optionName: "Total TT",
    resourceName: "total Time Theorems",
    isAvailable: () => PlayerProgress.eternityUnlocked(),
    value: () => player.timestudy.theorem.plus(TimeTheorems.calculateTimeStudiesCost()),
    ratio: () => player.timestudy.theorem.plus(TimeTheorems.calculateTimeStudiesCost()).div(12900).toNumber(),
    formatValue: x => format(x, 2),
    icon: "<i class='fas fa-book' />",
  },
  {
    id: 7,
    optionName: "EC completions",
    resourceName: "total Eternity Challenge completions",
    isAvailable: () => PlayerProgress.eternityUnlocked(),
    value: () => new Decimal(EternityChallenges.completions),
    ratio: () => EternityChallenges.completions / EternityChallenges.maxCompletions,
    formatValue: x => formatInt(x) + "/" + formatInt(EternityChallenges.maxCompletions),
    icon: "Δ",
  },
  {
    id: 8,
    optionName: "Tachyon Particles",
    isAvailable: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
    value: () => Currency.tachyonParticles.value,
    formatValue: x => format(x, 2),
    icon: "<i class='fas fa-meteor' />",
  },
  {
    id: 9,
    optionName: "Dilated Time",
    isAvailable: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
    value: () => Currency.dilatedTime.value,
    formatValue: x => format(x, 2),
    icon: "Ψ",
  },
  {
    id: 10,
    optionName: "Reality Machines",
    isAvailable: () => PlayerProgress.realityUnlocked(),
    value: () => Currency.realityMachines.value,
    ratio: () => Currency.realityMachines.value.log10() / 1000,
    formatValue: x => format(x, 2),
    icon: "Ϟ",
  },
  {
    id: 11,
    optionName: "Relic Shards",
    isAvailable: () => TeresaUnlocks.effarig.isUnlocked,
    value: () => new Decimal(Currency.relicShards.value),
    formatValue: x => format(x, 2),
    icon: "Ϙ",
  },
  {
    id: 12,
    optionName: "V-Achievements",
    isAvailable: () => VUnlocks.vAchievementUnlock.isUnlocked,
    value: () => new Decimal(V.spaceTheorems),
    ratio: () => V.spaceTheorems / (Ra.isUnlocked ? 66 : 36),
    formatValue: x => formatInt(x) + "/" + formatInt(Ra.isUnlocked ? 66 : 36),
    icon: "⌬",
  },
  {
    id: 13,
    optionName: "Ra Memory Levels",
    resourceName: "total Celestial Memory Levels",
    isAvailable: () => Ra.isUnlocked,
    value: () => new Decimal(Ra.totalPetLevel),
    ratio: () => Ra.totalPetLevel / Ra.maxTotalPetLevel,
    formatValue: x => formatInt(x) + "/" + formatInt(Ra.maxTotalPetLevel),
    icon: "<i class='fas fa-sun' />",
  },
  {
    id: 14,
    optionName: "All Machines",
    resourceName: "Machines",
    isAvailable: () => MachineHandler.isIMUnlocked,
    // This is a dummy value to prevent vue errors
    value: () => Currency.realityMachines.value,
    ratio: () => Math.clampMax(Currency.realityMachines.value.log10() / 2000, 0.5) + Math.clampMax(Math.log10(Currency.imaginaryMachines.value) / (2 * Math.log10(ImaginaryUpgrade(25).cost)), 0.5),
    formatValue: () => formatMachines(Currency.realityMachines.value, Currency.imaginaryMachines.value),
    icon: "Ϟ<i class='far fa-lightbulb' />",
  },
  {
    id: 15,
    optionName: "Imaginary Machines",
    isAvailable: () => MachineHandler.isIMUnlocked,
    value: () => new Decimal(Currency.imaginaryMachines.value),
    ratio: () => Math.log10(Currency.imaginaryMachines.value) / Math.log10(ImaginaryUpgrade(25).cost),
    formatValue: x => format(x, 2),
    icon: "<i class='far fa-lightbulb' />",
  },
  {
    id: 16,
    optionName: "Dark Matter",
    isAvailable: () => Laitela.isUnlocked,
    value: () => Currency.darkMatter,
    formatValue: x => format(x, 2),
    icon: "ᛝ",
  },
  {
    id: 17,
    optionName: "Dark Energy",
    isAvailable: () => Laitela.isUnlocked,
    value: () => new Decimal(Currency.darkEnergy.value),
    ratio: () => Currency.darkEnergy.value / Singularity.cap,
    formatValue: x => format(x, 2, 2),
    icon: "ᛝ",
  },
  {
    id: 18,
    optionName: "Singularities",
    isAvailable: () => Laitela.isUnlocked,
    value: () => new Decimal(Currency.singularities.value),
    ratio: () => Math.log10(Currency.singularities.value) / 50,
    formatValue: x => format(x, 2),
    icon: "ᛝ",
  },
  {
    id: 19,
    optionName: "Reality Shards",
    isAvailable: () => Pelle.isDoomed,
    value: () => Currency.realityShards,
    ratio: () => Currency.realityShards.value.log10() / 50,
    formatValue: x => format(x, 2),
    icon: "♅",
  },
];
