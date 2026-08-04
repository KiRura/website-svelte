<svelte:head>
	<title>FAQ</title>
</svelte:head>

<main class="container">
	<h1>FAQ</h1>

	<h2>何故上下に同じナビゲーションバー・ボタンが？</h2>
	<pre><code>@media (min-width: var(--breakpoints-md))</code></pre>
	<p>が動作しないから。</p>

	<h2>何故アニメーションが無い？</h2>
	<p>
		macOS上のGeckoエンジン(WebRender有効化)で大きい文字をtransformで動かすとM5のGPU使用率が100%になるから。
	</p>

	<h2>何故レイアウトの欠片も無い？</h2>
	<p>文書中心にしたいと思ったから。</p>

	<h2>何故Sass/Lessを使わない？</h2>
	<p>
		CSSが人間の書くものでなかったら人間都合でしかない冗長なプロパティ名達は全部省略されていたはず。if分岐などCSSと重複する実装/提案もそこそこにある。
	</p>

	<h2>CSS-in-JSは？</h2>
	<p>
		やれ型付けだのなんだの言う癖してCSSの関数は全部文字列で扱うあたりが気に食わない。
	</p>

	<h2>フォント指定機能は実装しない？</h2>
	<pre><code
			>{`:root {
   sans-serif: Inter, "IBM Plex Sans JP", sans-serif;
   monospace: "Monaspace Neon Var", "IBM Plex Sans JP", monospace;
}`}</code
		></pre>
	<p>が実現するまではしない。</p>

	<h2>何故設定をlocalStorage / IndexedDBに保存しない？</h2>
	<p>
		全部をjsonの体をなした文字列にして一つのキーに突っ込めば万事解決ではあるが、気に食わないので設定項目ごとにキーを対応させようとしたところ、TypeScriptの避けられないガバ仕様でfor-inのキーが確定でstring一本になるため、どうしようもない。
	</p>
	<p>
		IndexedDBはPromiseを返す方が無いのが気に食わないが、軽く調べたらどうやらそれを実装した<a
			href="https://github.com/jakearchibald/idb"
			target="_blank">ライブラリ</a
		>があるらしい。
	</p>
</main>
