import { writeFileSync } from "node:fs";

const rate = 24000;
const samples = Math.round((rate * 902) / 30);
const wav = Buffer.alloc(44 + samples * 2);
wav.write("RIFF");
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24);
wav.writeUInt32LE(rate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(samples * 2, 40);

const melody = [72, 76, 79, 76, 74, 77, 81, 77, 71, 74, 79, 74, 69, 72, 76, 72];
const bass = [48, 53, 55, 45];
const accents = [
  1.4, 2.07, 2.72, 3.37, 4.1, 5.7, 6.4, 7.1, 10.3, 11.9, 13, 18.15, 23.4, 25.5,
  26.4, 28.45,
];
const tone = (midi, time) =>
  Math.sin(2 * Math.PI * 440 * 2 ** ((midi - 69) / 12) * time);

for (let i = 0; i < samples; i++) {
  const time = i / rate;
  const tick = Math.floor(time / 0.265);
  const step = time % 0.265;
  const beat = time % 0.53;
  const measure = Math.floor(tick / 4) % bass.length;
  const note = melody[tick % melody.length];
  const keys =
    (tone(note, step) + tone(note + 12, step) * 0.2) *
    Math.exp(-step * 13) *
    0.055;
  const low = tone(bass[measure], beat) * Math.exp(-beat * 6) * 0.09;
  const kick =
    Math.sin(2 * Math.PI * (47 * beat + 3.6 * (1 - Math.exp(-beat * 24)))) *
    Math.exp(-beat * 32) *
    0.09;
  const accentTime = time - accents.findLast((start) => time >= start);
  const accent =
    accentTime < 0.19
      ? tone(88, accentTime) * Math.exp(-accentTime * 28) * 0.12
      : 0;
  const fade = Math.min(1, time * 4, (samples / rate - time) * 2);
  wav.writeInt16LE(
    Math.round((keys + low + kick + accent) * fade * 32767),
    44 + i * 2,
  );
}

writeFileSync(new URL("../public/soundtrack.wav", import.meta.url), wav);
