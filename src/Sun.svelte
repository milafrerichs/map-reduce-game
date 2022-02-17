<script>
  import { onMount } from "svelte";
  import { monthNames as MONTHS } from "./utils/data";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import gsap from "gsap";
  gsap.registerPlugin(MotionPathPlugin);

  export let month;
  export let colors;

  let sun;
  let path;

  let width;

  onMount(() => {
    let monthIndex = 1 + MONTHS.findIndex((m) => m === month) ?? 0;
    let progress = monthIndex/11;
    let animation = gsap.timeline({paused:true}).to(sun, {
      duration: 1,
      ease: "power1.inOut",
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
      },
    });
    animation.tweenTo(progress);
  });
</script>

<template>
  <div bind:clientWidth={width}>
    <svg {width} viewBox="0 0 390.78 89.51">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g bind:this={sun}>
            <circle style="fill:{colors[0]}" cx="28.24" cy="60.68" r="13.96" />
            <rect
              style="fill:{colors[0]}"
              x="27.23"
              y="77.34"
              width="1.95"
              height="11.57"
            />
            <rect
              style="fill:{colors[0]}"
              x="27.23"
              y="32.44"
              width="1.95"
              height="11.57"
            />
            <rect
              style="fill:{colors[0]}"
              x="6.59"
              y="75.56"
              width="11.57"
              height="1.95"
              transform="translate(-50.49 31.17) rotate(-45)"
            />
            <rect
              style="fill:{colors[0]}"
              x="38.35"
              y="43.81"
              width="11.57"
              height="1.95"
              transform="translate(-18.74 44.33) rotate(-45)"
            />
            <rect
              style="fill:{colors[0]}"
              y="59.67"
              width="11.57"
              height="1.95"
            />
            <rect
              style="fill:{colors[0]}"
              x="44.9"
              y="59.67"
              width="11.57"
              height="1.95"
            />
            <rect
              style="fill:{colors[0]}"
              x="11.39"
              y="38.98"
              width="1.95"
              height="11.57"
              transform="translate(-28.03 21.86) rotate(-45)"
            />
            <rect
              style="fill:{colors[0]}"
              x="43.15"
              y="70.74"
              width="1.95"
              height="11.57"
              transform="translate(-41.19 53.61) rotate(-45)"
            />
            <rect
              style="fill:{colors[1]}"
              x="34.53"
              y="75.9"
              width="1.95"
              height="4.53"
              transform="translate(-27.2 19.53) rotate(-22.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="20.06"
              y="40.92"
              width="1.95"
              height="4.53"
              transform="translate(-14.92 11.33) rotate(-22.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="18.74"
              y="77.23"
              width="4.53"
              height="1.95"
              transform="translate(-59.29 67.69) rotate(-67.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="33.22"
              y="42.21"
              width="4.53"
              height="1.95"
              transform="translate(-17.99 59.44) rotate(-67.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="8.56"
              y="66.95"
              width="4.53"
              height="1.95"
              transform="translate(-25.16 9.31) rotate(-22.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="43.46"
              y="52.44"
              width="4.53"
              height="1.95"
              transform="translate(-16.96 21.56) rotate(-22.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="9.72"
              y="51.12"
              width="1.95"
              height="4.53"
              transform="translate(-42.72 42.85) rotate(-67.5)"
            />
            <rect
              style="fill:{colors[1]}"
              x="44.75"
              y="65.6"
              width="1.95"
              height="4.53"
              transform="translate(-34.47 84.14) rotate(-67.5)"
            />
          </g>
          <path
            bind:this={path}
            style="fill:none;"
            d="M31.94,59.05a458.87,458.87,0,0,1,330.6,0"
          />
          <rect style="fill:none;" x="0.42" width="390.36" height="89.51" />
        </g>
      </g>
    </svg>
  </div>
</template>
