# ESLint → oxlint 移行検討レポート

## はじめに

本レポートは、[`@wakamsha/eslint-config`](../../eslint-config) で利用しているルールのうち、**oxlint v1.69.0 がまだサポートしていないもの**を洗い出し、それぞれが何を検出するルールなのか（概要）と、ESLint から oxlint へ移行した際にどの程度の懸念となるかを整理したものです。

[README](../README.md) で述べているとおり、oxlint は ESLint との高い互換性を志向しつつ猛烈な速度でルールを拡充していますが、まだ ESLint と完全に同等のルールセットには至っていません。移行を検討するうえでの最大の関心事は「**移行によって失われるルールが具体的に何で、自分たちのプロジェクトにとってどれほど重要なのか**」です。本レポートはその判断材料を提供します。

- 調査対象: oxlint **v1.69.0** / `@wakamsha/eslint-config` **v9.0.0**
- 元データ: `packages/comparison/test/{essentials,react,typescript}/diff.js` が算出する差分（ESLint 側で定義されているが oxlint 側に存在しないルール）
- 差分件数: **essentials 53 件 / react 54 件 / typescript 9 件**（合計 116 件）

> [!NOTE]
> 「有効状況」列は、`diff.js` 内の手書きアノテーション（✅）ではなく、**`@wakamsha/eslint-config` を実際に解決した設定**（`packages/comparison/test/**/__snapshots__/eslint.test.ts.snap`）から取得した実際の severity（`error` / `warn` / `off`）を記載しています。手書きの ✅ には実態とずれているもの（例: `require-atomic-updates` は ✅ と注記されているが設定上は `off`）があるため、本レポートでは解決済み設定を正としています。

## 凡例と評価方針

各ルールには以下の重要度を付与します。

| 重要度 | 意味 |
| :---: | :--- |
| 🟢 **懸念なし** | 非推奨(Deprecated)/凍結(Frozen)、設定上 `off`、または tsc・型検査など別ツールが同等の保証を提供しており、移行で失っても実害がないもの。 |
| 🟡 **代替で吸収可** | フォーマッタ（Prettier 等）が担うフォーマット系、スタイル/好みの問題で安全性に影響しないもの、または将来的に oxlint の追従が見込めるもの。 |
| 🔴 **要検討** | 実ロジック・実バグの検出に効き、代替手段が乏しく、失われると検出漏れが生じうるもの。 |

> [!IMPORTANT]
> **重要度は「eslint-config で有効か否か」だけでは決めていません。** ルールが有効（`error`/`warn`）であっても、フォーマッタが担う・型検査が同等の保証をする・古い構文や Class Component 限定で実害が小さい、といった場合は 🟢/🟡 になります。重要度は **そのルールが実際に何を検出するか・代替手段があるか** をルールごとに個別判断して付与しています。「有効状況」列は判断材料として併記しているだけです。

## サマリ

| カテゴリ | 差分件数 | 🔴 要検討 | 🟡 代替で吸収可 | 🟢 懸念なし |
| :--- | :---: | :---: | :---: | :---: |
| Essentials | 53 | 3 | 19 | 31 |
| React | 54 | 1 | 38 | 15 |
| TypeScript | 9 | 1 | 2 | 6 |
| **合計** | **116** | **5** | **59** | **52** |

**総評**: oxlint 未サポートの 116 ルールのうち、約半数（52 件）は非推奨/凍結・設定上 `off`・tsc が担保するもので **そもそも懸念になりません**。残りの大半（59 件）もフォーマッタや好みの問題、あるいは将来 oxlint が追従すると見込まれるものです。**移行時に実質的な検出漏れが生じうる「要検討（🔴）」は 5 件のみ**であり、いずれも後述の緩和策があります。総じて、本 config において ESLint → oxlint 移行による Lint カバレッジ低下の懸念は限定的と言えます。

---

## Essentials（53 件）

### 🔴 要検討（3 件）

| ルール | 概要 | 有効状況 | 補足・緩和策 |
| :--- | :--- | :---: | :--- |
| `import/no-extraneous-dependencies` | `package.json` の依存に宣言されていないパッケージの import を禁止する。 | error | 依存関係の衛生を守る実用的なルールで tsc にも同等機能はない。移行後に失われる代表例。`knip` 等の別ツールや、CI での依存チェックで補完を検討。 |
| `import/no-relative-packages` | 別ワークスペースパッケージへの相対パス import（`../other-pkg/...`）を禁止する。 | error | モノレポのパッケージ境界を守るルール。oxlint に同等機能なし。モノレポでなければ無関係。境界維持が重要なら ESLint 併用を検討。 |
| `no-unreachable-loop` | 最大 1 回しか実行されないループ（実質ループになっていない）を検出する。 | error | 実バグの検出に効くロジック系ルール。代替が乏しい。oxlint の今後の追従に期待。 |

### 🟡 代替で吸収可（19 件）

| ルール | 概要 | 有効状況 | 補足 |
| :--- | :--- | :---: | :--- |
| `import/no-import-module-exports` | ES の `import` と CommonJS の `module.exports` の混在を禁止する。 | error | CJS/ESM 混在という限定的な状況向け。ESM 前提なら発生しない。 |
| `import/no-useless-path-segments` | `./foo/../bar` のような冗長なパス指定を禁止する。 | error | import パスの整形に近い軽微なクリーンアップ。 |
| `import/order` | import 文の並び順をグループ単位で強制する。 | error | 並び順は本質的に整形の問題。フォーマッタ系ツールでの整列で代替可能。 |
| `no-invalid-this` | クラス/関数コンテキスト外の `this` を検出する。 | error | TypeScript の `noImplicitThis` が概ね同等の保証を提供する。 |
| `no-octal-escape` | 文字列リテラル中の 8 進エスケープ（`\071`）を禁止する。 | error | strict mode / ESM では構文エラーになるため実害は小さい。 |
| `no-restricted-syntax` | 設定で `for-in` / ラベル文 / `with` を禁止。 | error | `with`（`no-with`）と ラベル（`no-labels`）は oxlint が個別サポート済み。`for-in` 禁止のみ未カバーだが `guard-for-in` で一部補完可。 |
| `promise/no-return-in-finally` | `.finally()` コールバック内の `return`（値が破棄される）を検出する。 | warn | 発生頻度が低い軽微なロジック注意喚起。warn 運用。 |
| `unicorn/expiring-todo-comments` | 有効期限・条件付き TODO コメントを検出する。 | error | 開発プロセス支援系。安全性には影響しない。 |
| `unicorn/isolated-functions` | 外部スコープを参照すべきでない関数（`page.evaluate` 等）での参照を検出する。 | error | 用途が限定的でニッチ。 |
| `unicorn/no-for-loop` | インデックス操作の `for` ループより `for...of` を推奨する。 | error | モダン化のためのスタイル系。 |
| `unicorn/no-named-default` | `import { default as x }` のような書き方を禁止する。 | error | スタイルの問題。 |
| `unicorn/no-unnecessary-polyfills` | 不要な polyfill の利用を検出する。 | error | 依存・対象環境の文脈に依存するニッチなルール。 |
| `unicorn/no-useless-iterator-to-array` | イテレータに対する不要な `.toArray()`/スプレッドを検出する。 | error | 軽微な最適化・スタイル。 |
| `unicorn/prefer-export-from` | `import` してから `export` する代わりに `export ... from` を推奨する。 | error | スタイルの問題。 |
| `unicorn/prefer-simple-condition-first` | 論理式で単純な条件を先に置くことを推奨する。 | error | スタイルの問題。 |
| `unicorn/prefer-single-call` | `Array#push` や `classList.add` の複数回呼び出しを 1 回にまとめることを推奨する。 | error | スタイル・軽微な性能。 |
| `unicorn/prefer-switch` | 多分岐の `if-else` より `switch` を推奨する。 | error | スタイルの問題。 |
| `unicorn/prevent-abbreviations` | 識別子の略語（`e`, `el`, `props` 等の許可リスト外）を抑制する。 | error | 命名スタイルの問題で賛否が分かれやすい。安全性には影響しない。 |
| `unicorn/template-indent` | 複数行テンプレートリテラルのインデントを整える。 | error | フォーマット系。フォーマッタで代替可能。 |

### 🟢 懸念なし（31 件）

**非推奨(Deprecated) / 凍結(Frozen)** — 古い構文向け、または他ツールと重複しており利用が縮小傾向。oxlint が未提供でも移行の懸念になりません。

| ルール | 概要 | 区分 |
| :--- | :--- | :--- |
| `arrow-spacing` | アロー関数 `=>` 周辺の空白を整える。 | Deprecated（フォーマッタ管轄） |
| `line-comment-position` | 行コメントの位置を制限する。 | Deprecated |
| `multiline-comment-style` | 複数行コメントのスタイルを統一する。 | Deprecated |
| `no-new-object` | `new Object()` を禁止する。 | Deprecated（後継 `no-object-constructor` は oxlint 提供済み） |
| `no-new-symbol` | `new Symbol()` を禁止する。 | Deprecated（後継 `no-new-native-nonconstructor` は oxlint 提供済み） |
| `camelcase` | 変数名等の camelCase を強制する。 | Frozen（TS では `naming-convention` が担う） |
| `consistent-this` | `this` のエイリアス変数名を統一する。 | Frozen |
| `dot-notation` | `obj["x"]` より `obj.x` を推奨する。 | Frozen（`@typescript-eslint/dot-notation` は oxlint 提供済み） |
| `id-denylist` | 禁止識別子名を設定する。 | Frozen |
| `no-undef-init` | `let x = undefined` を禁止する。 | Frozen |
| `one-var` | 変数宣言をまとめる/分ける方針を強制する。 | Frozen |

**設定上 `off`**（eslint-config で有効化していない）— 移行で失うものがありません。

| ルール | 概要 |
| :--- | :--- |
| `consistent-return` | 関数の return が値あり/なしで一貫しているかを検出する。 |
| `require-atomic-updates` | `await` を跨いだ競合的な変数更新を検出する（誤検知が多く `off`）。 |
| `import/dynamic-import-chunkname` | 動的 import の webpack チャンク名コメントを強制する。 |
| `import/no-deprecated` | `@deprecated` 指定された import の利用を検出する。 |
| `import/no-internal-modules` | パッケージ内部モジュールへの直接 import を禁止する。 |
| `import/no-restricted-paths` | 指定パス間の import を禁止する。 |
| `import/no-unused-modules` | どこからも import されていないモジュールを検出する。 |
| `promise/no-native` | ネイティブ `Promise` の利用を検出する。 |
| `unicorn/better-regex` | 正規表現をより簡潔な形に矯正する。 |
| `unicorn/consistent-destructuring` | 分割代入の一貫性を強制する。 |
| `unicorn/no-keyword-prefix` | `new`/`class` 等の予約語プレフィックスを持つ命名を禁止する。 |
| `unicorn/no-unused-properties` | 未使用のオブジェクトプロパティを検出する。 |
| `unicorn/prefer-json-parse-buffer` | `JSON.parse` に Buffer を渡すことを推奨する。 |
| `unicorn/string-content` | 文字列内の特定パターン（記号類）を矯正する。 |

**tsc / パーサが担保** — TypeScript・strict mode 側で同等以上に検出されます。

| ルール | 概要 |
| :--- | :--- |
| `import/export` | 不正な export（重複 default 等）を検出する。tsc が検出。 |
| `import/named` | 名前付き import が対象に存在するか検証する。tsc が検出。 |
| `import/no-unresolved` | import が解決可能か検証する。tsc の moduleResolution が担保。 |
| `no-octal` | 旧式の 8 進数リテラル（`071`）を禁止する。strict mode/ESM では構文エラー。 |
| `no-dupe-args` | 関数引数名の重複を検出する。strict mode では構文エラー。 |
| `no-undef` | 未定義変数の参照を検出する。tsc が型レベルで検出。 |

---

## React（54 件）

> [!NOTE]
> `eslint-plugin-react` は後方互換性のため createClass / Class Component 時代の古いルールを多数残しています。一方 oxlint は Hooks 登場以降のユースケースに絞ってルールを提供しているため、差分は必然的に多くなりますが、これは意図された結果です。
>
> また `eslint-plugin-react-hooks` は v6 で **React Compiler 由来の新ルール**（`config`, `purity`, `immutability`, `set-state-in-*` など）を大量に追加しました。oxlint はまだこれらに追従できていませんが、これらは React Compiler の解析エンジンに依存する新しい（実験的・opt-in の）ルール群であり、いずれ oxlint も追従すると見込まれます。

### 🔴 要検討（1 件）

| ルール | 概要 | 有効状況 | 補足・緩和策 |
| :--- | :--- | :---: | :--- |
| `react/jsx-no-leaked-render` | `{count && <X/>}` のように falsy 値（`0` 等）がそのままレンダリングされる「リーク」を防ぐ。 | error | 画面に `0` が表示される実バグを防ぐルール。oxlint に同等機能なし。`{count > 0 && ...}` / 三項演算子の徹底で運用補完。 |

### 🟡 代替で吸収可（38 件）

**フォーマット系（JSX レイアウト）** — `eslint-plugin-react` 側でも非推奨化されフォーマッタ移管が進んでいる。Prettier 等で代替可能。

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `react/jsx-child-element-spacing` | JSX 子要素間の空白を制御する。 | error |
| `react/jsx-closing-bracket-location` | 閉じ `>` の位置を揃える。 | error |
| `react/jsx-closing-tag-location` | 閉じタグの位置を揃える。 | error |
| `react/jsx-curly-newline` | JSX 式中括弧内の改行を制御する。 | error |
| `react/jsx-curly-spacing` | JSX 式中括弧内の空白を制御する。 | error |
| `react/jsx-equals-spacing` | 属性の `=` 周辺の空白を制御する。 | error |
| `react/jsx-first-prop-new-line` | 最初の prop の改行位置を制御する。 | error |
| `react/jsx-indent` | JSX のインデントを制御する。 | error |
| `react/jsx-indent-props` | prop のインデントを制御する。 | error |
| `react/jsx-max-props-per-line` | 1 行あたりの prop 数を制限する。 | error |
| `react/jsx-one-expression-per-line` | 1 行 1 式に制限する。 | error |
| `react/jsx-props-no-multi-spaces` | prop 間の連続空白を禁止する。 | error |
| `react/jsx-tag-spacing` | タグ内の空白を制御する。 | error |
| `react/jsx-wrap-multilines` | 複数行 JSX の括弧囲みを強制する。 | error |
| `react/jsx-sort-props` | prop の並び順を強制する。 | error |

**スタイル / 好みの問題** — 安全性には影響しない。

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `react/destructuring-assignment` | props/state の分割代入の方針を統一する。 | error |
| `react/function-component-definition` | 関数コンポーネントの定義形式（アロー関数等）を強制する。 | error |
| `react/jsx-no-bind` | JSX prop 内のインライン関数/bind を抑制する（性能ヒント）。 | error |
| `react/no-invalid-html-attribute` | `rel` 等の HTML 属性の不正な値を検出する。 | error |

**Class Component 時代のルール** — Hooks/関数コンポーネント中心なら影響は限定的。

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `react/no-deprecated` | 非推奨の React API（`componentWillMount` 等）の利用を検出する。 | error |
| `react/no-typos` | ライフサイクル/static メンバ名のタイポを検出する。 | error |
| `react/no-unused-prop-types` | 未使用の propTypes を検出する。 | error |
| `react/no-unused-state` | 未使用の Class state を検出する。 | error |

**React Compiler 由来の新ルール（react-hooks v6）** — 実際の React 正当性バグ（純粋性違反・レンダー中の副作用等）を捉える価値あるルール群だが、React Compiler 解析に依存する新しい実験的ルールであり oxlint の追従待ち。

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `react-hooks/component-hook-factories` | コンポーネント/Hook を生成する高階関数を検出する。 | error |
| `react-hooks/config` | React Compiler の設定オプションを検証する。 | error |
| `react-hooks/error-boundaries` | 子のエラー処理に try/catch でなく Error Boundary を使うよう促す。 | error |
| `react-hooks/gating` | gating モードの設定を検証する。 | error |
| `react-hooks/globals` | レンダー中のグローバル変数の代入/変更を禁止する。 | error |
| `react-hooks/immutability` | props/state など不変であるべき値の変更を禁止する。 | error |
| `react-hooks/incompatible-library` | メモ化と非互換なライブラリ利用を検出する。 | warn |
| `react-hooks/preserve-manual-memoization` | 手動メモ化が Compiler に保持されるかを検証する。 | error |
| `react-hooks/purity` | コンポーネント/Hook の純粋性（既知の非純粋関数）を検証する。 | error |
| `react-hooks/refs` | レンダー中の ref 読み書きを禁止し正しい利用を促す。 | error |
| `react-hooks/set-state-in-effect` | effect 内での同期的な setState を禁止する。 | error |
| `react-hooks/set-state-in-render` | レンダー中の setState を禁止する。 | error |
| `react-hooks/static-components` | 毎レンダーで再生成されない静的なコンポーネントであることを検証する。 | error |
| `react-hooks/unsupported-syntax` | React Compiler が未対応の構文を検出する。 | warn |
| `react-hooks/use-memo` | 戻り値のない `useMemo` 利用を検出する。 | error |

### 🟢 懸念なし（15 件）

**設定上 `off`**（eslint-config で有効化していない）

| ルール | 概要 |
| :--- | :--- |
| `react/boolean-prop-naming` | boolean prop の命名規則を強制する。 |
| `react/default-props-match-prop-types` | defaultProps と propTypes の整合を検証する。 |
| `react/forbid-foreign-prop-types` | 他コンポーネントの `propTypes` 参照を禁止する。 |
| `react/jsx-uses-react` | （旧 JSX 変換向け）`React` の使用扱いを補正する。新 JSX 変換では不要。 |
| `react/jsx-uses-vars` | JSX で使われる変数を「使用済み」と扱う。 |
| `react/prefer-exact-props` | 厳密な props 型を推奨する。 |
| `react/require-default-props` | 任意 prop に defaultProps を要求する。 |
| `jsx-a11y/label-has-for` | label と入力要素の関連付けを要求する（**非推奨ルール**、後継は `label-has-associated-control` で oxlint 提供済み）。 |

**Class Component 限定（実害が小さい）** — Class Component を使わない方針なら無関係。TS プロジェクトでは型が propTypes を代替する。

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `react/no-access-state-in-setstate` | `setState` 内で `this.state` を直接参照することを禁止する。 | error |
| `react/no-arrow-function-lifecycle` | ライフサイクルメソッドをアロー関数で定義することを禁止する。 | error |
| `react/prefer-stateless-function` | state を持たない Class を関数コンポーネントにするよう促す。 | error |
| `react/prop-types` | props の型チェック（propTypes）を要求する。**TypeScript では型が完全に代替**。 | error |
| `react/require-render-return` | Class の `render` が値を返すことを要求する。 | error |
| `react/sort-comp` | Class メンバの並び順を強制する。 | error |
| `react/static-property-placement` | Class の static プロパティ配置を強制する。 | error |

> 補足: 上記の Class 系/`prop-types` 系は設定上 `error` ですが、本 config が想定する「TypeScript + 関数コンポーネント」構成では検出対象がほぼ発生せず、型システムが同等以上の保証を与えるため 🟢 と評価しています。

---

## TypeScript（9 件）

> [!NOTE]
> TypeScript 系ルールは型情報を必要とするものが多く、oxlint では型対応の [`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint) で順次対応が進んでいます。また、ESLint 側の `@typescript-eslint/xxx` ルールの多くは **同名のコアルールを TS 向けに拡張したもの**で、コアルール自体は oxlint が提供済みのケースがあります。

### 🔴 要検討（1 件）

| ルール | 概要 | 有効状況 | 補足・緩和策 |
| :--- | :--- | :---: | :--- |
| `@typescript-eslint/no-unnecessary-condition` | 型情報から常に真/偽になる条件（不要な条件分岐・冗長な null チェック）を検出する。 | error | 型を活かした実バグ検出に有用。型対応が必要なため `oxlint-tsgolint` の今後の対応に期待。`strictNullChecks` 等の tsc 設定で一部補完。 |

### 🟡 代替で吸収可（2 件）

| ルール | 概要 | 有効状況 | 補足 |
| :--- | :--- | :---: | :--- |
| `@typescript-eslint/naming-convention` | 変数・関数・型などの命名規則を細かく強制する。 | error | 命名スタイルの問題で安全性には影響しない。oxlint 側の対応待ち。 |
| `@typescript-eslint/prefer-optional-chain` | `a && a.b` より `a?.b`（オプショナルチェーン）を推奨する。 | error | モダン化のためのスタイル系。 |

### 🟢 懸念なし（6 件）

**コアルールが oxlint 提供済み** — `@typescript-eslint/xxx` はコアルールの TS 拡張版で、コアルール自体は oxlint がサポート済み。基本的な検出は維持されます。

| ルール | 概要 | 有効状況 | oxlint 提供のコアルール |
| :--- | :--- | :---: | :--- |
| `@typescript-eslint/no-array-constructor` | `new Array()` を禁止する。 | error | `no-array-constructor` |
| `@typescript-eslint/no-empty-function` | 空の関数を検出する。 | error | `no-empty-function` |
| `@typescript-eslint/no-unused-expressions` | 使われていない式を検出する。 | error | `no-unused-expressions` |
| `@typescript-eslint/no-unused-vars` | 未使用の変数/引数を検出する。 | error | `no-unused-vars` |
| `@typescript-eslint/no-useless-constructor` | 不要なコンストラクタを検出する。 | error | `no-useless-constructor` |

**設定上 `off`**

| ルール | 概要 | 有効状況 |
| :--- | :--- | :---: |
| `@typescript-eslint/no-use-before-define` | 定義前の利用を禁止する（本 config では `off`）。 | off |

---

## 移行判断の指針

移行可否は「oxlint 未サポートルールの総数」や「✅ の数」ではなく、**個別判断の結果として残る『要検討（🔴）』が自プロジェクトにとって許容できるか**で判断するのが妥当です。本 config で 🔴 と評価したのは以下の 5 件のみです。

| ルール | カテゴリ | 緩和策 |
| :--- | :--- | :--- |
| `import/no-extraneous-dependencies` | Essentials | `knip` 等の依存解析ツール、または CI での依存チェックで補完。 |
| `import/no-relative-packages` | Essentials | モノレポでパッケージ境界維持が重要な場合のみ。必要なら当該ルールに限り ESLint を併用。 |
| `no-unreachable-loop` | Essentials | 代替が乏しい。oxlint の今後の追従を待つ。レビューで補完。 |
| `react/jsx-no-leaked-render` | React | `{cond > 0 && ...}` や三項演算子の徹底をコーディング規約で補完。 |
| `@typescript-eslint/no-unnecessary-condition` | TypeScript | 型対応の `oxlint-tsgolint` の対応進展を待つ。`strictNullChecks` で一部補完。 |

### まとめ

- 未サポート 116 件のうち、**約半数（52 件）はそもそも懸念にならない**（非推奨/凍結・設定 `off`・tsc が担保）。
- さらに 59 件は **フォーマッタや好みの問題、または将来 oxlint が追従する見込み**のもの。フォーマット系は Prettier 等、`react-hooks` の React Compiler 系は今後の追従でカバーが見込める。
- **実質的な検出漏れ懸念は 5 件**で、いずれも代替ツール・コーディング規約・将来対応で緩和可能。

以上より、本 config において **ESLint → oxlint 移行による Lint カバレッジ低下の懸念は限定的**であり、上記 5 件の緩和策を用意できれば移行は十分現実的と評価できます。

---

> 本レポートのルール一覧と件数は `packages/comparison/test/{essentials,react,typescript}/diff.js` の差分出力（それぞれ 53 / 54 / 9 件）に基づきます。各ルールの有効状況は `__snapshots__/eslint.test.ts.snap`（解決済み設定）から取得しています。oxlint・各プラグインのバージョン更新に伴い差分は変動するため、本レポートも適宜見直してください。
