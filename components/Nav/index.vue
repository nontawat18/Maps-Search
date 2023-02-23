<template>
  <div>
    <v-app-bar
      app
      color="grey darken-3"
      elevation="2"
    >
    <v-spacer></v-spacer>

      <div class="containers">
        <h1 class="title">
          <span class="title-word title-word-1">Search</span>
          <span class="title-word title-word-2">Maps</span>
        </h1>
      </div>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn> -->
    </v-app-bar>
  </div>
</template>
<style>
.title-word {
  animation: color-animation 4s linear infinite;
}

.title-word-1 {
  --color-1: #000000;
  --color-2: #ffffff;
  --color-3: #000000;
}

.title-word-2 {
  --color-1: #ffffff;
  --color-2: #000000;
  --color-3: #ffffff;
}

.title-word-3 {
  --color-1: #accfcb;
  --color-2: #e4a9a8;
  --color-3: #accfcb;
}

.title-word-4 {
  --color-1: #3d8dae;
  --color-2: #df8453;
  --color-3: #e4a9a8;
}

@keyframes color-animation {
  0% {
    color: var(--color-1);
  }
  32% {
    color: var(--color-1);
  }
  33% {
    color: var(--color-2);
  }
  65% {
    color: var(--color-2);
  }
  66% {
    color: var(--color-3);
  }
  99% {
    color: var(--color-3);
  }
  100% {
    color: var(--color-1);
  }
}

/* Here are just some visual styles. 🖌 */

.containers {
  display: grid;
  place-items: center;
  text-align: center;
  height: 10vh;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 40px;
  text-transform: uppercase;
}
</style>
