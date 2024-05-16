import sanitizeHTML from 'sanitize-html';

export abstract class View<T, K = HTMLElement> {
	protected constructor(protected readonly container: K) {}

	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	protected setInnerHTML(element: HTMLElement, value: string) {
		element.innerHTML = sanitizeHTML(value);
	}

	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) {
				element.setAttribute('disabled', 'disabled');
			} else {
				element.removeAttribute('disabled');
			}
		}
	}

	render(data?: Partial<T>): K {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
