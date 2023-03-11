<script setup>
  import WelcomeItem from './WelcomeItem.vue'
  import DocumentationIcon from './icons/IconDocumentation.vue'
  import ToolingIcon from './icons/IconTooling.vue'
  import EcosystemIcon from './icons/IconEcosystem.vue'
  import CommunityIcon from './icons/IconCommunity.vue'
  import SupportIcon from './icons/IconSupport.vue'

  // Type data
  import TypeList from '../data/types.js'
  const { types } = TypeList
  console.log('types', types)

  // Get random type1
  import { getRandomItem } from '../utils.js'
  const type1 = getRandomItem(types)

  // Get random type2 based on filter
  const type1Effectives = type1.atk_effectives.filter(e => e[1] > 1 || e[1] < 1)
  const type2fromType1 = getRandomItem(type1Effectives)
  const type2 = types.filter(t => t.name === type2fromType1[0])[0]

  // Get multiple choices
  const choices = [
    { option: 'super effective', text: 'is super effective against', atk_effective: 2 },
    { option: 'not very effective', text: 'is not very effective against', atk_effective: 0.5 },
    { option: 'has not effect', text: 'has no effect on', atk_effective: 0 },
  ]

  // Correct Choice 
  const correctChoice = choices.filter(c => c.atk_effective === type2fromType1[1])[0]

  // Handle submission
  import { ref } from 'vue'
  const guess = ref(true)
  const answerCorrect = ref(false)
  const revealAnswer = ref(false)

  function submit() {

    // if statement is true
    console.log('guess', guess.value)
    console.log('type1', type1)
    if (guess.value.atk_effective === type1.atk_effectives.filter(ae => ae[0] === type2.name)[0][1])
        answerCorrect.value = true

    revealAnswer.value = true
  }

  // Pick a poke gif based on first type
  import PokemonData from '../data/pokemon'
  const { pokemon } = PokemonData
  const rightTypePokes = pokemon.filter(p => p.types[0] === type1.name)
  const randPokeForGif = getRandomItem(rightTypePokes)
  const pokeNameForUrl = randPokeForGif.name.toLowerCase().replace('\'','').replace('.','').replace(' ','-')
  const pokemonGifUrl = `https://www.smogon.com/dex/media/sprites/bw/${pokeNameForUrl}.gif`
</script>

<template>
  <WelcomeItem> 
    <!-- Image -->
    <template #icon>
      <img :src="pokemonGifUrl" />
    </template>
    <template #heading>{{ type1.name }} vs {{ type2.name }}</template>
  </WelcomeItem> 

  <WelcomeItem v-if="!revealAnswer"> 
    <template #icon>
      <EcosystemIcon />
    </template>
    <div v-for="choice in choices" :key="choice.option">
      <input type="radio" v-model="guess" :value="choice" />
      <label style="margin-left:5px">{{ choice.option }}</label>
    </div>
  </WelcomeItem> 

  <!-- Answer -->
  <WelcomeItem v-if="revealAnswer">
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading v-if="answerCorrect">Correct!</template>
    <template #heading v-else>Wrong!</template>

    {{ type1.name }} {{ correctChoice.text }} {{ type2.name }}
  </WelcomeItem> 

  <!-- Submit Button -->
  <WelcomeItem v-if="!revealAnswer">
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>
      <button @click="submit">Submit</button>
    </template>
  </WelcomeItem>

  <!-- Next -->
  <WelcomeItem v-show="revealAnswer">
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      <a href="#" @click="$router.go()">Next</a>
    </template>
  </WelcomeItem>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
