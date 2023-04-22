import { writable, type Writable } from "svelte/store";
import type { GoogleAuthUser } from "./types";

export const user: Writable<GoogleAuthUser | null> = writable(null);