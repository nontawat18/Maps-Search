import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
    createPersistedState({
        key: "Restaurants",
        paths: []
    })(store);
};