<template>
    <div class="app-footer">
        <p>Audio Visualizer</p>
        <p>Alex Gomes {{curYear}}</p>
    </div>
</template>

<script>
export default {
    name: "FooterVue",
    computed: {
        curYear() {
            return new Date().getFullYear();
        },
    }
}
</script>

<style>
    .app-footer {
        margin-top: 4em;
        padding: 0.5em 1em;
        height: 4em;
        background-color: var(--v-primary);
        z-index: 1;
    }

    .app-footer > p {
        margin-bottom: 0 !important; 
    }
</style>