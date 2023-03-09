<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

// Pokemon data
import PokemonList from '../data/pokemon.js'
const { pokemon } = PokemonList

// Get random Poke
import { getRandomInt } from '../utils.js'
const i = getRandomInt(0, pokemon.length)
const poke = pokemon[i]
console.log('poke', poke)

// Make template data
import { ref } from 'vue'
const pokemonName = ref(poke.name)

//Get pokemon image url
const pokeNameForUrl = poke.name.toLowerCase().replace('\'','').replace('.','').replace(' ','-')
const pokemonImageUrl = ref(`https://www.smogon.com/dex/media/sprites/bw/${pokeNameForUrl}.gif`)

//Get pokemon's types
const pokemonTypes = poke.types.join(',')

// Get Types
import TypeList from '../data/types.js'
const { types } = TypeList
const typeNames = ref( types.map(t => t.name) )
console.log('types', types)

// v-model type selects
const type1 = ref()
const type2 = ref()

// Hide answer
const revealAnswer = ref(false)

// Handle submission
const answerCorrect = ref(false)
function submit() {
  console.log('submit')

  // Check answer
  const pass = ( poke.types.length > 1 )
        ? ( poke.types.indexOf(type1) > -1
            && poke.types.indexOf(type2) > -1 )
        : ( poke.types.indexOf(type1) > -1 )

  if (pass) answerCorrect.value = true
  revealAnswer.value = true
}

</script>

<template>
<!-- Pokemon -->
  <WelcomeItem>
    <!-- Image -->
    <template #icon>
      <img :src="pokemonImageUrl" />
    </template>

    <!-- Name -->
    <template #heading>{{ pokemonName }}</template>

    <!-- Question -->
    Which type(s) is {{ pokemonName }}?
  </WelcomeItem>

<!-- Type(s) Selector -->
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>

    <!-- Dropdowns -->
    <div>
        <label>Type 1</label>
        <br />
        <select v-model="type1">
            <option v-for="name in typeNames">{{ name }}</option>
        </select>
    </div>
    <div>
        <label>Type 2</label>
        <br />
        <select v-model="type2">
            <option v-for="name in typeNames">{{ name }}</option>
        </select>
    </div>
  </WelcomeItem>

<!-- (Hidden) Answer -->
<!-- reveal after submit -->
  <WelcomeItem v-show="revealAnswer">
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading v-if="answerCorrect">Correct!</template>
    <template #heading v-else>Wrong!</template>

    <p>Answer: {{ pokemonTypes }}</p>
  </WelcomeItem>

<!-- Submit -->
  <WelcomeItem v-show="!revealAnswer">
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
      <a href="/">Next</a>
    </template>
  </WelcomeItem>

</template>
