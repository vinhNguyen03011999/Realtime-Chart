<template>
<div>
    <b-card tag="article" style="max-width: 20rem;" class="mb-2 card-custom">
        <b-form-input v-model="newTask" @keyup.enter="addTask" placeholder="Input Todo" />
        <div class="box-btn-input">
            <b-button variant="success" @click="addTask">Add</b-button>
        </div>
    </b-card>
    <b-list-group class="list-body">
        <b-list-group-item v-for="element in arrTodo" :key="element.index">
            {{element.taskname}}
        </b-list-group-item>

    </b-list-group>
</div>
</template>

<script>
export default {
    name: "TaskBoard",
    data() {
        return {
            newTask: "",
            arrTodo: [{
                    taskname: "Make plan"
                },
                {
                    taskname: "Assign Task"
                },
                {
                    taskname: "Design UI"
                },
                {
                    taskname: "List Screen"
                },
                {
                    taskname: "List Function"
                }
            ],
            connection: null,
            arrDoing: [],
            arrTest: [],
            arrDone: []
        }

    },
    created: function () {
        console.log('connecting ...')
        this.connection = new WebSocket('wss://acommax.trade:3000')
        this.connection.onopen = function (event) {
            alert('connect successfully')
            console.log(event)
        }
        this.connection.send = function (event) {
            alert('new task:', event.Task)
        }
    },
    methods: {
        addTask() {

            if (this.newTask) {
                this.arrTodo.push({
                    taskname: this.newTask
                });
                this.connection.send({
                    Task: this.newTask
                })
                this.newTask = "";
            }
        }
    },
};
</script>

<style></style>
