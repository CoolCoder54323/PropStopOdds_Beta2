
<script lang="ts">
    import PropGraph from "$lib/PropCore/PropGraph.svelte";
    const graphDataComponent = {
    name:"poop",
    keys: ['PTS', 'GAME_DATE', 'REB', 'AST'], // Added 'REB' for Rebounds, 'AST' for Assists
    rows: [
        { GAME_DATE: 'JAN 30, 2024', PTS: 14, REB: 5, AST: 7 },
        { GAME_DATE: 'JAN 25, 2024', PTS: 31, REB: 9, AST: 3 },
        // ... more rows
    ]
};
</script>

<PropGraph data={graphDataComponent}></PropGraph>
<div class="bg-primary-50"></div>