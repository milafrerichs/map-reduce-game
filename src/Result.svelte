<script>
  import {
    currentStep,
    result,
  } from "./stores/game.store";
  import {
    question as questionStore,
    data as dataStore,
  } from "./stores/data.store";
</script>

<div class="m-auto h-full">
  <div class="grid h-full place-items-center">
    <div class="relative">
      <!-- Centered Text Content -->
      <div
        class="absolute inset-0 flex h-full w-full flex-col items-center justify-center px-12 text-center font-bamboo text-app-blue-900"
      >
        <h1 class="text-4xl">The result after the reduce step is:</h1> 
        <p class="text-2xl mt-16">{$result.island}: {$result.temp}</p>
      </div>

      <svg
        aria-hidden="true"
        width="845"
        height="648"
        viewBox="0 0 845 648"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_0_332)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 89.7807V642L201.463 557.89L422.996 637.724L506.999 603.478L523.928 587.39H546.463L624.342 555.641L843 642V503.247L825.692 476.08L843 441.174V89.7807L624.497 0L532.667 37.4575L512.126 55.4131L496.482 52.2174L421.569 82.7745L201.312 1.84971L112.214 41.1575L95.0582 60.4734L79.9008 55.4131L2 89.7807Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_332"
            x="0"
            y="0"
            width="845"
            height="648"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_332"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_332"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</div>
