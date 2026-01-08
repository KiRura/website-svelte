export const theme = {
	tokens: {
		orange: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fed7aa",
			300: "#fdba74",
			400: "#fb923c",
			500: "#f97316",
			600: "#ea580c",
			700: "#92310a",
			800: "#6c2710",
			900: "#3b1106",
			950: "#220a04",
			get fg() {
				return {
					light: this[700],
					dark: this[300],
				};
			},
			get subtle() {
				return {
					light: this[100],
					dark: this[900],
				};
			},
		},
		yellow: {
			50: "#fefce8",
			100: "#fef9c3",
			200: "#fef08a",
			300: "#fde047",
			400: "#facc15",
			500: "#eab308",
			600: "#ca8a04",
			700: "#b45309",
			800: "#92400e",
			900: "#78350f",
			get fg() {
				return {
					light: this[800],
					dark: this[200],
				};
			},
		},
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
			get fg() {
				return {
					light: this[700],
					dark: this[300],
				};
			},
		},
	},
};
