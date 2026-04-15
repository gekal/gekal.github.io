# Design System — Apple-Inspired

このサイトは Apple の Human Interface Guidelines と Apple.com のビジュアル言語を参考にしたデザインシステムを採用しています。

---

## 1. デザイン哲学

| 原則 | 説明 |
|------|------|
| **Clarity（明確さ）** | テキスト・アイコン・コントロールは読みやすく、意図が即座に伝わること |
| **Deference（奥行き）** | UIはコンテンツを引き立て、競合しない |
| **Depth（深度）** | ガラスエフェクト・レイヤー・モーションで空間を演出 |

---

## 2. カラーパレット

### Light mode（メイン）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--apple-blue` | `#0071E3` | プライマリアクション、リンク |
| `--apple-blue-hover` | `#0077ED` | ホバー状態 |
| `--surface` | `#FFFFFF` | ページ背景 |
| `--surface-secondary` | `#F5F5F7` | セクション背景（Apple グレー） |
| `--surface-tertiary` | `#FBFBFD` | カード背景 |
| `--text-primary` | `#1D1D1F` | 見出し・本文 |
| `--text-secondary` | `#6E6E73` | サブテキスト |
| `--text-tertiary` | `#AEAEB2` | プレースホルダー |
| `--separator` | `#D2D2D7` | ボーダー、区切り線 |
| `--separator-opaque` | `rgba(0,0,0,0.08)` | カードボーダー |

### Dark mode（ダークセクション用）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--dark-bg` | `#000000` | ヒーロー・CTAセクション背景 |
| `--dark-surface` | `#1D1D1F` | ダークカード背景 |
| `--dark-surface-2` | `#2D2D2F` | ダーク第二層 |

---

## 3. タイポグラフィ

Apple は SF Pro を使用しますが、本サイトでは互換フォントを採用。

| レベル | フォント | サイズ | ウェイト | 用途 |
|--------|---------|--------|---------|------|
| Display | Inter | 80–96px | 700 | ヒーロー大見出し |
| Headline 1 | Inter | 48–56px | 700 | セクション見出し |
| Headline 2 | Inter | 28–32px | 600 | サブセクション |
| Body | Inter | 17px | 400 | 本文 |
| Caption | Inter | 12–13px | 400/500 | ラベル・補足 |

### フォントスタック

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display',
             'Helvetica Neue', Arial, sans-serif;
```

---

## 4. スペーシング

Apple は 8px グリッドを基本にします。

| サイズ | 値 | 用途 |
|--------|-----|------|
| `xs` | 4px | アイコン間隔 |
| `sm` | 8px | インライン要素間 |
| `md` | 16px | コンポーネント内余白 |
| `lg` | 24px | コンポーネント間 |
| `xl` | 40px | セクション内余白 |
| `2xl` | 80px | セクション間余白 |
| `3xl` | 120px | 大型セクション |

---

## 5. 角丸 (Border Radius)

| トークン | 値 | 用途 |
|---------|-----|------|
| `rounded-sm` | 6px | タグ、バッジ |
| `rounded-md` | 10px | ボタン、入力欄 |
| `rounded-lg` | 14px | カード |
| `rounded-xl` | 18px | モーダル、パネル |
| `rounded-2xl` | 22px | 大型カード |
| `rounded-3xl` | 28px | CTAセクション |
| `rounded-full` | 9999px | ピル型要素 |

---

## 6. シャドウ

```css
/* Subtle — カード */
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06);

/* Lifted — ホバー時 */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);

/* Modal */
box-shadow: 0 22px 70px rgba(0, 0, 0, 0.20);
```

---

## 7. ガラスエフェクト (Frosted Glass)

```css
/* Navigation bar */
background: rgba(255, 255, 255, 0.72);
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
border-bottom: 1px solid rgba(0, 0, 0, 0.08);
```

---

## 8. ボタン

### Primary (Apple Blue)

```css
background: #0071E3;
color: #FFFFFF;
border-radius: 980px; /* pill */
padding: 12px 24px;
font-size: 17px;
font-weight: 400;
```

### Secondary (Outline)

```css
background: transparent;
border: 1.5px solid #0071E3;
color: #0071E3;
border-radius: 980px;
padding: 12px 24px;
```

### Hover states

- Primary: `background: #0077ED`
- Secondary: `background: rgba(0,113,227,0.06)`

---

## 9. アニメーション

Apple は控えめで滑らかなアニメーションを好みます。

| 種類 | イージング | 時間 |
|------|-----------|------|
| フェードイン | `cubic-bezier(0.4, 0, 0.2, 1)` | 400ms |
| スライドアップ | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 600ms |
| ホバー拡大 | `cubic-bezier(0.4, 0, 0.2, 1)` | 200ms |
| スプリング | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 400ms |

---

## 10. グリッドとレイアウト

- 最大幅: `1024px`（Apple は幅広めのコンテンツ幅）
- 内余白: `24px`（モバイル）/ `48px`（デスクトップ）
- カラム: 12カラムグリッド（Tailwind の `grid-cols-12`）
- セクション縦余白: `80–120px`

---

## 11. コンポーネントチェックリスト

- [x] Navigation — frosted glass、スクロール時に強調
- [x] Hero — フルスクリーン、大型タイポグラフィ
- [x] Card — 白背景、subtle shadow、hover lift
- [x] Badge/Tag — pill型、Apple blue or gray
- [x] Button — pill型 primary / outline
- [x] Section divider — `background: #F5F5F7`
- [x] Footer — ミニマル、Apple.com スタイル

---

## 12. 参考

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple.com](https://www.apple.com)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
