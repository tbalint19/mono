// Reexport your entry components here
import { accordion } from "./animation/accordion.js";
import Modal from "./components/Modal.svelte";
import { href } from "$lib/directive/href.js";
import { copyOnClick } from "./directive/copyOnClick.js"
import { clickText } from "./directive/clickText.js";
import { viewport } from "./directive/viewport.js";

export {
  // animations
  accordion,

  // components
  Modal,

  // directives
  href,
  copyOnClick,
  clickText,
  viewport,
}