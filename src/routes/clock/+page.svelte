<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { container, progress as _progress } from "styled-system/recipes";
	import { differenceInMilliseconds } from "date-fns";
	import { wrap } from "styled-system/patterns";
	import { Progress } from "@ark-ui/svelte/progress";

	const progressClass = _progress();

	let now = $state(new Date());

	$effect(() => {
		const interval = setInterval(() => (now = new Date()), 1);

		return () => clearTimeout(interval);
	});

	const { year, month, day, date, hours, minutes, seconds } = $derived({
		year: now.getFullYear(),
		month: now.getMonth(),
		day: now.getDay(),
		date: now.getDate(),
		hours: now.getHours(),
		minutes: now.getMinutes(),
		seconds: now.getSeconds(),
	});

	const progresses = $derived([
		{
			key: "year",
			label: `${year}年`,
			max: differenceInMilliseconds(new Date(year + 1, 0), new Date(year, 0)),
			value: differenceInMilliseconds(now, new Date(year, 0)),
		},
		{
			key: "month",
			label: `${month + 1}月`,
			max: differenceInMilliseconds(
				new Date(year, month + 1),
				new Date(year, month),
			),
			value: differenceInMilliseconds(now, new Date(year, month)),
		},
		{
			key: "day",
			label: `${["日", "月", "火", "水", "木", "金", "土"][day]}曜日`,
			max: differenceInMilliseconds(
				new Date(year, month, 7 - day + date),
				new Date(year, month, date - day),
			),
			value: differenceInMilliseconds(now, new Date(year, month, date - day)),
		},
		{
			key: "date",
			label: `${date}日`,
			max: differenceInMilliseconds(
				new Date(year, month, date + 1),
				new Date(year, month, date),
			),
			value: differenceInMilliseconds(now, new Date(year, month, date)),
		},
		{
			key: "hours",
			label: `${hours}時`,
			max: differenceInMilliseconds(
				new Date(year, month, date, hours + 1),
				new Date(year, month, date, hours),
			),
			value: differenceInMilliseconds(now, new Date(year, month, date, hours)),
		},
		{
			key: "minute",
			label: `${minutes}分`,
			max: differenceInMilliseconds(
				new Date(year, month, date, hours, minutes + 1),
				new Date(year, month, date, hours, minutes),
			),
			value: differenceInMilliseconds(
				now,
				new Date(year, month, date, hours, minutes),
			),
		},
		{
			key: "second",
			label: `${seconds}秒`,
			max: differenceInMilliseconds(
				new Date(year, month, date, hours, minutes, seconds + 1),
				new Date(year, month, date, hours, minutes, seconds),
			),
			value: differenceInMilliseconds(
				now,
				new Date(year, month, date, hours, minutes, seconds),
			),
		},
	]);
</script>

<main class={cx(container(), css({ py: "8" }))}>
	<div class={wrap()}>
		{#each progresses as progress (progress.key)}
			<Progress.Root
				max={progress.max}
				bind:value={progress.value}
				class={progressClass.root}
				--size="192px"
				--thickness="4px"
			>
				<Progress.Label class={progressClass.label}>
					{#snippet asChild()}
						<time
							datetime={now.toISOString()}
							class={css({ fontFamily: "mono" })}
						>
							{progress.label}
						</time>
					{/snippet}
				</Progress.Label>
				<Progress.ValueText
					class={cx(progressClass.valueText, css({ fontFamily: "mono" }))}
				>
					{(
						Math.trunc((progress.value / progress.max) * 100 * 10 ** 6) /
						10 ** 6
					)
						.toFixed(6)
						.padStart(9, "0")}%
				</Progress.ValueText>
				<Progress.Circle class={progressClass.circle}>
					<Progress.CircleTrack class={progressClass.circleTrack} />
					<Progress.CircleRange class={progressClass.circleRange} />
				</Progress.Circle>
			</Progress.Root>
		{/each}
	</div>
</main>
