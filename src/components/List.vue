<template>
<div class="list">
    <h3 class='list-Name'>Todo</h3>
    <b-list-group class="list-body">
        <b-list-group-item>
            <Task />
        </b-list-group-item>
        <b-list-group-item>
            <Task />
        </b-list-group-item>

        <b-list-group-item>
            <Task />
        </b-list-group-item>
        <b-list-group-item>
            <Task />
        </b-list-group-item>

    </b-list-group>
    <b-card style="max-width: 20rem;" class="mb-2 card-task">
        <b-card-text>
            <b-form-input v-model="text" placeholder="Input Task" />
            <div class="box-btn-input">
                <b-button variant="success">Add</b-button>
            </div>
        </b-card-text>
    </b-card>
</div>
</template>

<script>
import Task from './Task'
export default {
    name: "List",
    components: {
        Task
    }
}
</script>

<style scoped>
@import '../assets/css/componentsCss/list.css';
</style>
