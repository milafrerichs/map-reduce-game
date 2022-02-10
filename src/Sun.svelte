<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { circIn } from "svelte/easing";

  export let month;
  export let colors;
  export let arcAngleRad;

  const MAX_ROTATION_ARC_ANGLE = 90;

  const MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const progress = tweened(0, {
    duration: 1000,
    easing: circIn,
  });

  let width;
  let height;

  $: transformOriginX = width / 2;
  $: transformOriginY =
    (Math.cos(arcAngleRad / 2) * transformOriginX) / Math.sin(arcAngleRad / 2);

  onMount(() => {
    let monthIndex = 1 + MONTHS.findIndex((m) => m === month)??0;
    // if (monthIndex === 11) monthIndex = 12;
    const rotationAngle = monthIndex * (MAX_ROTATION_ARC_ANGLE / (MONTHS.length + 1));
    progress.set(rotationAngle);
  });
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<template>
  <main>
    <svg {width} {height}>
      <g id="Layer_2" data-name="Layer 2" transform="rotate({MAX_ROTATION_ARC_ANGLE / ( MONTHS.length)} {transformOriginX} {transformOriginY})">
        <g
          id="Layer_1-2"
          data-name="Layer 1"
          transform="translate(0, {height / 2}) rotate({$progress} {transformOriginX} {transformOriginY})"
        >
          <circle style="fill:{colors[0]};" cx="44.92" cy="44.92" r="22.21" />
          <rect
            style="fill:{colors[0]};"
            x="43.38"
            y="71.42"
            width="3.08"
            height="18.42"
          />
          <rect
            style="fill:{colors[0]};"
            x="43.38"
            width="3.08"
            height="18.42"
          />
          <rect
            style="fill:{colors[0]};"
            x="10.46"
            y="68.64"
            width="18.42"
            height="3.08"
            transform="translate(-43.86 34.46) rotate(-45)"
          />
          <rect
            style="fill:{colors[0]};"
            x="60.96"
            y="18.13"
            width="18.42"
            height="3.08"
            transform="translate(6.65 55.38) rotate(-45)"
          />
          <rect
            style="fill:{colors[0]};"
            y="43.38"
            width="18.42"
            height="3.08"
          />
          <rect
            style="fill:{colors[0]};"
            x="71.42"
            y="43.38"
            width="18.42"
            height="3.08"
          />
          <rect
            style="fill:{colors[0]};"
            x="18.13"
            y="10.46"
            width="3.08"
            height="18.42"
            transform="translate(-8.15 19.67) rotate(-45)"
          />
          <rect
            style="fill:{colors[0]};"
            x="68.63"
            y="60.96"
            width="3.08"
            height="18.42"
            transform="translate(-29.07 70.17) rotate(-45)"
          />
          <rect
            style="fill:{colors[1]};"
            x="54.91"
            y="69.14"
            width="3.08"
            height="7.21"
            transform="translate(-23.54 27.13) rotate(-22.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="31.86"
            y="13.49"
            width="3.08"
            height="7.21"
            transform="translate(-4 14.08) rotate(-22.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="29.79"
            y="71.21"
            width="7.21"
            height="3.08"
            transform="translate(-46.59 75.77) rotate(-67.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="52.84"
            y="15.56"
            width="7.21"
            height="3.08"
            transform="translate(19.05 62.71) rotate(-67.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="13.49"
            y="54.91"
            width="7.21"
            height="3.08"
            transform="translate(-20.29 10.84) rotate(-22.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="69.14"
            y="31.86"
            width="7.21"
            height="3.08"
            transform="translate(-7.24 30.37) rotate(-22.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="15.56"
            y="29.79"
            width="3.08"
            height="7.21"
            transform="translate(-20.3 36.42) rotate(-67.5)"
          />
          <rect
            style="fill:{colors[1]};"
            x="71.21"
            y="52.84"
            width="3.08"
            height="7.21"
            transform="translate(-7.24 102.06) rotate(-67.5)"
          />
        </g>
      </g>
    </svg>
  </main>
</template>
