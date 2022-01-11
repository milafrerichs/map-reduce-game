<script>
  import {json} from "d3-fetch";
  import Island from './Island.svelte';

  let dataset = { features: [] }
    json(
            "https://geodata.gov.gr/geoserver/wfs/?service=WFS&version=1.0.0&request=GetFeature&typeName=geodata.gov.gr:d7f50467-e5ef-49ac-a7ce-15df3e2ed738&outputFormat=application/json&srsName=epsg:4326"
      ).then((data) => {
              dataset = data;
        });
</script>

<div class="grid grid-cols-4">
{#each dataset.features as data}
  <div class="">
    <Island dataset={data} />
  </div>
{/each}
</div>
