<script lang="ts">
    import { Table, ProgressRadial } from '@skeletonlabs/skeleton';
    import { type LogDataComponent, type DataComponent } from '../../routes/propTypes.ts';

    export let data:DataComponent;

    type TableSource =  {
        head: string[];
        body: Array<Array<string>>;
        meta: Array<Array<string>>;
        foot: string[];
    }


    function componentToSource(component:LogDataComponent)  {
            const body = component!.rows.map(row => 
                component!.keys.map(key => {
                    const value = row[key];
                    return String(value);
                })
            );
            let keys = component!.keys.map((str)=>{
                console.log(str.replaceAll("_"," "))
                return str.replaceAll("_"," ")
            })
            console.log(keys)
            return {
                head:keys,
                body:body,
                meta:body,
                foot:[`${component!.player_name} Gamelog`],
            }
    }
    
</script>

<div>
    <Table source={componentToSource(data)} regionFoot="font-bold"></Table>
</div>

<style>
    .gradient-p {
  @apply bg-clip-text text-transparent box-decoration-clone;
  /* Direction */
  @apply bg-gradient-to-br;
  /* Color Stops */
  @apply from-secondary-500 to-primary-500;
}
</style>