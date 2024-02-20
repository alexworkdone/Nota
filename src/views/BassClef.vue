<template>
  <div class="game">
    <section class="relative p-b-20 m-t-40 m-b-40">
      <div class="btns flex-h__center">
        <button
          v-for="(item, index) in getListOctave"
          :key="index"
          class="btn btn-small"
          :class="{ active: octave === item }"
          @click="octave = item"
        >
          {{ item }}
        </button>
      </div>

      <div v-if="octave === 'Додаткові лінійки'" class="hint">
        ( ноти першої октави в басовому ключі )
      </div>
    </section>

    <h1 class="m-b-40">Яка це нота?</h1>

    <section class="query">
      <svg viewBox="0 0 621 252" style="width: 100.001%; max-width: 700px">
        <line x1="0" y1="84" x2="9999" y2="84" stroke="#000" stroke-width="2"></line>
        <line x1="0" y1="105" x2="9999" y2="105" stroke="#000" stroke-width="2"></line>
        <line x1="0" y1="126" x2="9999" y2="126" stroke="#000" stroke-width="2"></line>
        <line x1="0" y1="147" x2="9999" y2="147" stroke="#000" stroke-width="2"></line>
        <line x1="0" y1="168" x2="9999" y2="168" stroke="#000" stroke-width="2"></line>

        <svg>
          <text x="12.6" y="105" style="font-size: 84px; font-family: 'Helsinki Std'; fill: #000">
            ?
          </text>
        </svg>

        <template v-if="selectedNota?.line">
          <svg v-for="(lineY, index) in selectedNota.line" :key="index">
            <line
              x1="144.9"
              :y1="lineY"
              :x2="189"
              :y2="lineY"
              stroke="#000"
              stroke-width="2"
            ></line>
          </svg>
        </template>

        <svg>
          <text
            x="149.1"
            :y="selectedNota?.y"
            style="font-size: 84px; font-family: 'Helsinki Std'"
            class="normal"
          >
            w
          </text>
        </svg>
      </svg>
    </section>

    <section ref="wrapAnswer" class="btns flex-h__center m-b-a">
      <button
        v-for="(item, index) in answerBtn"
        :key="index"
        class="btn"
        :disabled="item.disabled"
        @click="answer(item, $event)"
      >
        {{ item.name }}
      </button>
    </section>
  </div>
</template>

<script>
const arrayOctave = {
  bass: {
    'Мала октава': ['do_m', 're_m', 'mi_m', 'fa_m', 'sol_m', 'la_m', 'si_m'],
    'Велика октава': ['do_v', 're_v', 'mi_v', 'fa_v', 'sol_v', 'la_v', 'si_v'],
    'Додаткові лінійки': ['do_dl', 're_dl', 'mi_dl', 'fa_dl', 'sol_dl'],
  },
};

const bass = [
  {
    id: 'do_v',
    name: 'до',
    y: 210,
    line: [210, 189],
  },
  {
    id: 're_v',
    name: 'ре',
    y: 199.5,
    line: [189],
  },
  {
    id: 'mi_v',
    name: 'мі',
    y: 189,
    line: [189],
  },
  {
    id: 'fa_v',
    name: 'фа',
    y: 178.5,
  },
  {
    id: 'sol_v',
    name: 'соль',
    y: 168,
  },
  {
    id: 'la_v',
    name: 'ля',
    y: 157.5,
  },
  {
    id: 'si_v',
    name: 'сі',
    y: 147,
  },
  {
    id: 'do_m',
    name: 'до',
    y: 136.5,
  },
  {
    id: 're_m',
    name: 'ре',
    y: 126,
  },
  {
    id: 'mi_m',
    name: 'мі',
    y: 115.5,
  },
  {
    id: 'fa_m',
    name: 'фа',
    y: 105,
  },
  {
    id: 'sol_m',
    name: 'соль',
    y: 94.5,
  },
  {
    id: 'la_m',
    name: 'ля',
    y: 84,
  },
  {
    id: 'si_m',
    name: 'сі',
    y: 73.5,
  },
  {
    id: 'do_dl',
    name: 'до',
    y: 63,
    line: [63],
  },
  {
    id: 're_dl',
    name: 'ре',
    y: 52.5,
    line: [63],
  },
  {
    id: 'mi_dl',
    name: 'мі',
    y: 42,
    line: [63, 42],
  },
  {
    id: 'fa_dl',
    name: 'фа',
    y: 31.5,
    line: [63, 42],
  },
  {
    id: 'sol_dl',
    name: 'соль',
    y: 21,
    line: [63, 42, 21],
  },
];

export default {
  name: 'BassClef',

  data: () => ({
    clef: 'bass',
    octave: 'Мала октава',

    arrayOctave,
    bass,

    answerBtn: [
      {
        name: 'до',
        disabled: false,
      },
      {
        name: 'ре',
        disabled: false,
      },
      {
        name: 'мі',
        disabled: false,
      },
      {
        name: 'фа',
        disabled: false,
      },
      {
        name: 'соль',
        disabled: false,
      },
      {
        name: 'ля',
        disabled: false,
      },
      {
        name: 'сі',
        disabled: false,
      },
    ],

    lastSelectedNoteId: null,
    selectedNota: null,
  }),

  computed: {
    getListOctave() {
      return Object.keys(arrayOctave[this.clef]);
    },
  },

  watch: {
    octave(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.updateAnswerBtnDisabledStatus();
      this.generateRandomNote();
    },

    clef(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.updateAnswerBtnDisabledStatus();
      this.generateRandomNote();
    },
  },

  mounted() {
    this.updateAnswerBtnDisabledStatus();
    this.generateRandomNote();
  },

  methods: {
    updateAnswerBtnDisabledStatus() {
      const notesInRangeIds = this.arrayOctave[this.clef][this.octave];

      const noteNamesInRange = this.bass
        .filter((note) => notesInRangeIds.includes(note.id))
        .map((note) => note.name);

      this.answerBtn.forEach((btn) => {
        btn.disabled = !noteNamesInRange.includes(btn.name);
      });
    },

    generateRandomNote() {
      const notesInRange = this.arrayOctave[this.clef][this.octave];
      let selectedNoteId;

      do {
        const randomIndex = Math.floor(Math.random() * notesInRange.length);
        selectedNoteId = notesInRange[randomIndex];
      } while (selectedNoteId === this.lastSelectedNoteId);

      this.lastSelectedNoteId = selectedNoteId;

      const selectedNote = this.bass.find((note) => note.id === selectedNoteId);
      this.selectedNota = { ...selectedNote };
    },

    answer(item, e) {
      this.$refs.wrapAnswer.classList.add('pointer-none');
      if (this.selectedNota.name === item.name) {
        e.target.classList.add('success');
        setTimeout(() => {
          e.target.classList.remove('success');
          this.generateRandomNote();
          this.updateAnswerBtnDisabledStatus();
          this.$refs.wrapAnswer.classList.remove('pointer-none');
        }, 1000);
      } else {
        e.target.classList.add('error');
        setTimeout(() => {
          e.target.classList.remove('error');
          item.disabled = true;
          this.$refs.wrapAnswer.classList.remove('pointer-none');
        }, 1000);
      }
    },
  },
};
</script>
