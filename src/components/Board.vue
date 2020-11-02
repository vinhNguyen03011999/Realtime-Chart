<template>
<div class="board-body">
    <List />
    <List />
    <List />
    <List />
    <List />
    <List />
    <b-card tag="article" style="max-width: 20rem;" class="mb-2 card-custom">
        <b-form-input v-model="text" placeholder="Input Todo" />
        <div class="box-btn-input">
            <b-button variant="success">Add</b-button>
        </div>
    </b-card>
</div>
</template>

<script>
import List from "./List";

export default {
    name: "Board",
    components: {
        List
    }
    
};
</script>

<style scoped>
@import "../assets/css/componentsCss/board.css";
@import "../assets/css/global.css";
</style>
