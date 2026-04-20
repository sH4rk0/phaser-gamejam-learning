import type { QuizQuestion } from './chapter-1'

export const quiz5: QuizQuestion[] = [
  {
    question: 'Quale metodo si usa per aggiungere un gameObject alla scena corrente?',
    options: [
      'this.create.text()',
      'this.add.text()',
      'this.scene.add()',
      'this.spawn.text()',
    ],
    correct: 1,
  },
  {
    question: 'Cosa controlla il metodo .setDepth()?',
    options: [
      'La profondità fisica del gameObject nella scena 3D',
      'Lo z-index di visualizzazione del gameObject',
      'La distanza dalla camera',
      'La dimensione del gameObject',
    ],
    correct: 1,
  },
  {
    question: 'Quale valore di setScrollFactor mantiene un gameObject fisso sullo schermo indipendentemente dalla camera?',
    options: ['1', '-1', '0', '0.5'],
    correct: 2,
  },
  {
    question: 'Qual è la differenza principale tra setTint e setTintFill?',
    options: [
      'setTint funziona solo sugli sprite, setTintFill sulle immagini',
      'setTint moltiplica i colori della texture, setTintFill li sostituisce completamente',
      'setTint accetta valori RGB, setTintFill accetta valori esadecimali',
      'Non c\'è differenza, sono sinonimi',
    ],
    correct: 1,
  },
  {
    question: 'Qual è la differenza tra Image e Sprite in Phaser?',
    options: [
      'Image supporta le animazioni, Sprite no',
      'Sprite supporta le animazioni, Image no',
      'Image è più grande di Sprite',
      'Non c\'è differenza pratica',
    ],
    correct: 1,
  },
  {
    question: 'Cosa fa il parametro repeat: -1 nella configurazione di un\'animazione?',
    options: [
      'Riproduce l\'animazione al contrario',
      'Esegue l\'animazione una sola volta',
      'Ripete l\'animazione all\'infinito',
      'Ferma l\'animazione dopo un secondo',
    ],
    correct: 2,
  },
  {
    question: 'A cosa serve la TileSprite?',
    options: [
      'Visualizzare sprite con più livelli di colore',
      'Creare sfondi con texture ripetuta, ad esempio per effetti parallasse',
      'Gestire collisioni tra tile',
      'Animare immagini statiche',
    ],
    correct: 1,
  },
  {
    question: 'Quale metodo del Group restituisce tutti gli elementi che contiene?',
    options: ['.getAll()', '.children()', '.getChildren()', '.list()'],
    correct: 2,
  },
]
