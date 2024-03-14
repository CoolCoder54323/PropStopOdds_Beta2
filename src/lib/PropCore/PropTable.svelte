<script lang="ts">
    import { Table, ProgressRadial } from '@skeletonlabs/skeleton';
    import { type LogDataComponent } from '../../routes/propTypes.ts';

    export let data:LogDataComponent;

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
            return {
                head:component!.keys,
                body:body,
                meta:body,
                foot:["Gamelog"],
            }
    }
    
</script>

<div>
    <Table source={componentToSource(data)}></Table>
</div>
