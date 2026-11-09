import {
	collections,
	DEFAULT_THEME,
	parsePreference,
	THEME_COOKIE,
	type Appearance,
	type CollectionId,
	type ThemePreference
} from '#lib/data/themes.js';

export class ThemeController {
	collection = $state<CollectionId>('ozone');
	appearance = $state<Appearance>('dark');
	committed = $state<ThemePreference | null>(null);
	previewing = $state(false);
	message = $state('Explore an identity. Lock it when it feels like you.');
	ready = $state(false);
	open = $state(false);

	constructor(preference: ThemePreference | null) {
		const initial = preference ?? DEFAULT_THEME;
		this.collection = initial.collection;
		this.appearance = initial.appearance;
		this.committed = preference;
	}

	get current() {
		return collections.find((item) => item.id === this.collection)!;
	}
	get label() {
		return this.previewing ? 'Preview' : this.committed ? 'Locked' : 'Default';
	}

	mount() {
		this.ready = true;
		this.apply();
	}

	private apply() {
		if (!this.ready) return;
		document.documentElement.dataset.collection = this.collection;
		document.documentElement.dataset.appearance = this.appearance;
	}

	preview(collection: CollectionId) {
		this.collection = collection;
		this.previewing = true;
		this.message = `Previewing ${this.current.name}, ${this.appearance}. Your locked preference is unchanged.`;
		this.apply();
	}

	setAppearance(appearance: Appearance) {
		this.appearance = appearance;
		this.previewing = true;
		this.message = `Previewing ${this.current.name}, ${appearance}. Lock to remember this combination.`;
		this.apply();
	}

	lock() {
		const preference: ThemePreference = {
			version: 1,
			collection: this.collection,
			appearance: this.appearance
		};
		try {
			document.cookie = `${THEME_COOKIE}=${encodeURIComponent(JSON.stringify(preference))}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
			const raw = document.cookie
				.split('; ')
				.find((cookie) => cookie.startsWith(THEME_COOKIE + '='))
				?.slice(THEME_COOKIE.length + 1);
			const saved = parsePreference(raw ? decodeURIComponent(raw) : null);
			if (
				!saved ||
				saved.collection !== preference.collection ||
				saved.appearance !== preference.appearance
			)
				throw new Error('Storage unavailable');
			this.committed = preference;
			this.previewing = false;
			this.message = `${this.current.name} / ${this.appearance} locked. This browser will remember your choice.`;
		} catch {
			this.message =
				'Preview is active, but this browser could not save your preference. Please allow site storage and try again.';
		}
	}

	returnToLocked() {
		if (!this.committed) return;
		this.collection = this.committed.collection;
		this.appearance = this.committed.appearance;
		this.previewing = false;
		this.message = `Returned to your locked ${this.current.name} / ${this.appearance} identity.`;
		this.apply();
	}

	reset() {
		try {
			document.cookie = `${THEME_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
			if (document.cookie.split('; ').some((cookie) => cookie.startsWith(THEME_COOKIE + '=')))
				throw new Error('Storage unavailable');
			this.committed = null;
			this.collection = DEFAULT_THEME.collection;
			this.appearance = DEFAULT_THEME.appearance;
			this.previewing = false;
			this.message = 'Reset to Ozone / dark. No locked preference is stored.';
			this.apply();
		} catch {
			this.message =
				'This browser could not clear your preference. Please allow site storage and try again.';
		}
	}
}
