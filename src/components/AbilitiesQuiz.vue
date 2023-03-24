<script>
  import WelcomeItem from './WelcomeItem.vue'

  import abilities from '../data/abilities.js'
  console.log('abilities', abilities)
</script>

<template>
  <WelcomeItem>
    <!-- Image -->
    <template #icon>
      <img src="" />
    </template>

    <!-- Name -->
    <template #heading>Abilities Quiz</template>

    Pick one of the multiple choice:
  </WelcomeItem>

</template>
