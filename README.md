# 小克剪辑台

用 Remotion 重绘的 30 秒手绘动效。画面采用米白纸纹、深棕手绘轮廓、珊瑚色方块角色和低饱和薄荷色控件。手机预览、素材、字幕样式、时间轴和角色均可在源码中编辑。

## 预览和渲染

需要 Node.js 20.19+（20 系列）、22.13+（22 系列）或 24+。

```sh
npm ci
npm run dev
```

```sh
npm run lint
npx remotion render src/index.ts EditingMotion out/editing-motion.mp4
```

输出为 1280×720、30 fps，902 帧。音乐和提示音由本仓库的音频脚本合成，可用 `node scripts/soundtrack.mjs` 重新生成。

## 时间线

| 片段 | 动效 |
| --- | --- |
| 0–5 秒 | 开场输入窗口、剪辑台、四次素材拖拽和音频波形 |
| 5–11 秒 | 角色添加转场、镜头推近、拉面翻页切换柴犬 |
| 11–18 秒 | 字幕、撤销提示、调色和速度滑块 |
| 18–25 秒 | 节拍标记、舞池与导出进度 |
| 25–30 秒 | 编辑台淡化，手机回放和 Opus 5.5 标题出现 |

视觉与声音为独立重绘与合成。小幅差异包括手写字体、素材细节、配乐和部分镜头运动。

随附的 Noto Serif SC 字体子集按 [SIL Open Font License](public/noto-serif-sc-OFL.txt) 分发。

