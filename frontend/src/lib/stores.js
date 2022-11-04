import { writable } from "svelte/store";

export let posts = writable([]);
export let jwt = writable('');