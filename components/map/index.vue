<template>
  <div>
    <!-- Map and Input to search -->
    <v-card color="grey lighten-4" elevation="0">
      <div class="d-flex flex-no-wrap justify-space-between" align="center">
        <v-row>
          <v-col cols="12" md="10" class="">
            <gmap-map
              :zoom="14"
              :center="center"
              style="width: 100%; height: 600px"
            >
              <gmap-marker
                :key="index"
                v-for="(m, index) in places"
                :position="m.geometry.location"
                @click="center = m.geometry.location"
              ></gmap-marker>
            </gmap-map>
          </v-col>
          <v-col cols="12" md="2" class="pt-8">
            <h2>Search for the place.</h2>
            <v-col class="">
              <gmap-autocomplete
                @place_changed="initMarker"
                style="
                  width: 100%;
                  height: 40px;
                  border-style: solid;
                  border-color: #bdbdbd;
                "
              ></gmap-autocomplete>

              <v-combobox
                v-model="selectedType"
                class="mt-6"
                :items="optionsType"
                item-value="value"
                item-text="text"
                label="Selected Type"
                outlined
                dense
              ></v-combobox>
              <v-combobox
                v-model="selectedRedius"
                class=""
                :items="optionsRedius"
                item-value="value"
                item-text="text"
                label="Selected Redius"
                outlined
                dense
              ></v-combobox>
              <v-btn
                class="mt-3"
                @click="findCloseBuyButtonPressedButton"
                rounded
                color="#B3E5FC"
              >
                Search <v-icon right> mdi-magnify </v-icon>
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <!-- Dialog results keyword to search -->
    <v-dialog v-model="dialog" width="70%">
      <v-row>
        <v-col v-for="place in places" :key="place.id" cols="12" md="3">
          <v-card
            class="mx-auto"
            max-width="374"
            height="400px"
            @click="select(place)"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="200" :src="image"></v-img>

            <v-card-title>{{ place.name }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="place.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">{{ place.rating }}</div>
              </v-row>

              <div class="my-4 text-subtitle-1"></div>

              <div>
                {{ place.vicinity }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "GoogleMap",
  data() {
    return {
      center: {
        lat: 13.823407815603725,
        lng: 100.51234692335129,
      },
      image: "https://cdn.vuetifyjs.com/images/toolbar/map.jpg",
      selectedType: null,
      selectedRedius: null,
      lat: 13.823407815603725,
      lng: 100.51234692335129,
      places: [],
      dialog: false,
      existingPlace: null,
      optionsType: [
        { value: "Restaurant", text: "Restaurant" },
        { value: "Hospital", text: "Hospital" },
        { value: "Cafe", text: "Cafe" },
      ],
      optionsRedius: [
        { value: 5, text: "5 KM" },
        { value: 10, text: "10 KM" },
      ],
    };
  },
  computed: {

  },
  mounted() {
    this.addLocationMarker();
    this.findCloseBuyButtonPressed();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    // this is fucntion add location marker on map
    addLocationMarker() {
      if (this.existingPlace) {
        this.lat = this.existingPlace.geometry.location.lat();
        this.lng = this.existingPlace.geometry.location.lng();
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.center = marker;
        this.existingPlace = null;
      }
    },
    // this is fucntion get place on google api show by type and redius
    findCloseBuyButtonPressedButton() {
      this.dialog = true;
      this.addLocationMarker();
      let redius = 0;
      let type = "";
      if (this.selectedRedius == null) {
        redius = 1;
      } else {
        redius = this.selectedRedius.value;
      }
      if (this.selectedType == null) {
        type = "Restaurant";
      } else {
        type = this.selectedType.value;
      }
      if (type == "Restaurant") {
        this.image = "https://cdn.vuetifyjs.com/images/cards/cooking.png";
      } else {
        this.image = "https://cdn.vuetifyjs.com/images/toolbar/map.jpg";
      }
      const URL = `/maps/api/place/nearbysearch/json?location=${this.lat},${
        this.lng
      }&type=${type}&radius=${
        redius * 1000
      }&key=AIzaSyAXsl7deCMhvVBsVRJHGks_RJvJ59kEAI4`;
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    findCloseBuyButtonPressed() {
      this.addLocationMarker();
      let redius = 0;
      let type = "";
      if (this.selectedRedius == null) {
        redius = 1;
      } else {
        redius = this.selectedRedius.value;
      }
      if (this.selectedType == null) {
        type = "Restaurant";
      } else {
        type = this.selectedType.value;
      }
      const URL = `/maps/api/place/nearbysearch/json?location=${this.lat},${
        this.lng
      }&type=${type}&radius=${
        redius * 1000
      }&key=AIzaSyAXsl7deCMhvVBsVRJHGks_RJvJ59kEAI4`;
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    // this is fucntion marker place of you select
    select(place) {
      let newplaces = [];
      newplaces.push(place);
      const marker = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      };
      this.center = marker;
      this.dialog = false;
      this.places = newplaces;
      
    },
  },
};
</script>
