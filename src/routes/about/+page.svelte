<svelte:head>
	<title>概要</title>
</svelte:head>

<main class="container">
	<h1>概要</h1>

	<h2>基調</h2>
	<ul>
		<li>最新安定版のChromiumのみを想定</li>
		<li>文書</li>
		<li>
			文書を読ませる以上、ブラウザはあらゆる既定値を好きなものに指定できるはず
		</li>
		<ul>
			<li>
				Chromiumブラウザでは<code>sans-serif</code>や<code>monospace</code
				>に複数のフォントを指定できない
			</li>
			<li>Chromiumブラウザではあらゆる色について指定できない</li>
			<li>
				Firefox系ブラウザでは大体のものは<a href="about:config" target="_blank"
					>about:config</a
				>で指定できるので比較的良心的
			</li>
			<ul>
				<li>モバイル向け安定版Firefoxだと塞がれている点が惜しい</li>
			</ul>
			<li>どのブラウザでもUAスタイルシートにあるmarginなどを調整できない</li>
			<li>どのブラウザでも行間の既定値を指定できない</li>
		</ul>
		<li>
			簡潔な実装で済むものやリーダービュー/リーディングモードにありがちなものに限り指定可能にしたのがこのサイト
		</li>
	</ul>

	<h2>Firefox系ブラウザ</h2>
	<p>
		<code>overflow: hidden</code>や<code>position: absolute</code
		>などで通常のレイアウトに影響しないはずのgridコンテナ要素によってスクロールが勝手に動くバグがあったり、文字の描画に極端なGPUコストがかかっていたり、アニメーションを付けないと初回で描画できないバグがあったりなど、実装に不安要素しかないためお見送り。
	</p>

	<h2>実装したくないもの</h2>
	<p>既存資産を無駄にしてしまう系は総じて見送っている。</p>

	<h3>色</h3>
	<p>
		ブラウザ側の実装として<code>Canvas</code>/<code>CanvasText</code>や<code
			>ButtonFace</code
		>/<code>ButtonText</code
		>など、様々なトークンが存在するが、いずれもCSSからそれの色指定を変えることはできないため、お見送り。
	</p>

	<h3>フォント</h3>
	<p>
		色と同様に、CSSでは<code>sans-serif</code>や<code>monospace</code
		>などの指定フォントを変えられない。
	</p>

	<h3>余白</h3>
	<p>
		こちらはより酷く、そもそもトークンが存在せず、UAスタイルシートに数値がハードコードされているため制御不能。
	</p>

	<h3>レスポンシブ</h3>
	<p>
		随一値をハードコードする必要が無くなる<a
			href="https://developer.mozilla.org/ja/docs/Web/CSS/Reference/At-rules/@custom-media"
			target="_blank">カスタムメディアクエリ</a
		>がFirefox系以外の全てのブラウザで未実装(しかもFirefox系でも既定で無効化状態)のため、お見送り。
	</p>

	<h3>設定の永続化</h3>
	<p>
		オブジェクトのキーの数と名前が不変であり、かつ値は変わることを許容する機構がJavaScript/TypeScriptに存在しないため、クライアントサイドへの<a
			href="https://zod.dev/"
			target="_blank">Zod</a
		>の導入を検討しつつも一旦お見送り。
	</p>

	<h2>使いたくないもの</h2>

	<h3>Saas/Scss</h3>
	<p>
		良いなと思いつつも、if分岐やネストなどはCSSにも追加されつつあり、重複する機能が多いので微妙。
	</p>

	<h3>"型安全"なCSS-in-JS</h3>
	<p>CSSの関数を文字列で扱う時点で型安全ではない。</p>

	<h3>Vue</h3>
	<p>
		タグの属性の値の文字列の中に処理を書けるようにしてしまっている点が残念だと思った。
	</p>
	<figure>
		<blockquote>
			<p>
				All Vue templates are syntactically valid HTML that can be parsed by
				spec-compliant browsers and HTML parsers.
			</p>
		</blockquote>
		<figcaption>
			<cite
				><a
					href="https://vuejs.org/guide/essentials/template-syntax.html"
					target="_blank">Template Syntax</a
				></cite
			> | Vue.js
		</figcaption>
	</figure>
	<p>とはいえ、文字列は文字列である。</p>

	<h3>TSX</h3>
	<p>
		スタイリングだけは別途.cssで書く必要があるのでコンポーネントとして扱いづらい。
	</p>

	<h3>TailwindCSS</h3>
	<p>
		人間が「文書スタイリング」と「UIデザインのスタイリング」の狭間に苦しんだ結果<em
			>現状の最善</em
		>として生まれてしまった化け物。
	</p>
</main>
