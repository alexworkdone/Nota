<template>
  <div class="game">
    <section class="btns flex-h__center m-t-40 m-b-40">
      <button
        v-for="(item, index) in getListOctave"
        :key="index"
        class="btn btn-small"
        :class="{ active: octave === item }"
        @click="octave = item"
      >
        {{ item }}
      </button>
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
          <text x="12.6" y="147" style="font-size: 84px; font-family: 'Helsinki Std'; fill: #000">
            &amp;
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
  violin: {
    '1-ша октава': ['do_1', 're_1', 'mi_1', 'fa_1', 'sol_1', 'la_1', 'si_1'],
    '2-га октава': ['do_2', 're_2', 'mi_2', 'fa_2', 'sol_2', 'la_2', 'si_2'],
    '3-тя октава': ['do_3', 're_3', 'mi_3', 'fa_3'],
  },
};

const violin = [
  {
    id: 'do_1',
    name: 'до',
    y: 189,
    line: [189],
  },
  {
    id: 're_1',
    name: 'ре',
    y: 178.5,
  },
  {
    id: 'mi_1',
    name: 'мі',
    y: 168,
  },
  {
    id: 'fa_1',
    name: 'фа',
    y: 157.5,
  },
  {
    id: 'sol_1',
    name: 'соль',
    y: 147,
  },
  {
    id: 'la_1',
    name: 'ля',
    y: 136.5,
  },
  {
    id: 'si_1',
    name: 'сі',
    y: 126,
  },
  {
    id: 'do_2',
    name: 'до',
    y: 115.5,
  },
  {
    id: 're_2',
    name: 'ре',
    y: 105,
  },
  {
    id: 'mi_2',
    name: 'мі',
    y: 94.5,
  },
  {
    id: 'fa_2',
    name: 'фа',
    y: 84,
  },
  {
    id: 'sol_2',
    name: 'соль',
    y: 73.5,
  },
  {
    id: 'la_2',
    name: 'ля',
    y: 63,
    line: [63],
  },
  {
    id: 'si_2',
    name: 'сі',
    y: 52.5,
    line: [63],
  },
  {
    id: 'do_3',
    name: 'до',
    y: 42,
    line: [63, 42],
  },
  {
    id: 're_3',
    name: 'ре',
    y: 31.5,
    line: [63, 42],
  },
  {
    id: 'mi_3',
    name: 'мі',
    y: 21,
    line: [63, 42, 21],
  },
  {
    id: 'fa_3',
    name: 'фа',
    y: 10.5,
    line: [63, 42, 21],
  },
];

export default {
  name: 'ViolinClef',

  data: () => ({
    clef: 'violin',
    octave: '1-ша октава',

    arrayOctave,
    violin,

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

      const noteNamesInRange = this.violin
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

      const selectedNote = this.violin.find((note) => note.id === selectedNoteId);
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
