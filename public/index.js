// @ts-check
/// <reference lib="dom" />
"use strict";

const form = document.getElementsByName("tracker").item(0);
assert(form, HTMLFormElement);

/*****************************************************************************
 * enabled
 *****************************************************************************/

const enabled = form.elements.namedItem("enabled");
assert(enabled, HTMLInputElement);

listen(enabled, ["change"], (event) => {
  submit();
  event.preventDefault();
});

/*****************************************************************************
 * gameId
 *****************************************************************************/

const gameId = form.elements.namedItem("gameId");
assert(gameId, HTMLInputElement);

listen(gameId, ["blur", "submit"], (event) => {
  form.submit();
  event.preventDefault();
});

/*****************************************************************************
 * achievementId
 *****************************************************************************/

const achievementId = form.elements.namedItem("achievementId");
assert(achievementId, HTMLInputElement);

/*****************************************************************************
 * cards
 *****************************************************************************/

const cards = Array.from(form.querySelectorAll("[data-card]"));

/**
 * @param {Event} event
 */
const handleClickCard = (event) => {
  const card = event.currentTarget;
  assert(card, Element);

  achievementId.value = card.getAttribute("data-id") ?? "";

  for (const card of cards) card.removeAttribute("data-checked");
  card.setAttribute("data-checked", "");

  submit();
  event.preventDefault();
};

for (const card of cards) listen(card, ["click"], handleClickCard);

/*****************************************************************************
 * submit
 *****************************************************************************/

const submit = () =>
  fetch(window.location.href, { method: "POST", body: new FormData(form) });

/*****************************************************************************
 * utils
 *****************************************************************************/

/**
 * @template T
 * @template U
 * @param {T} value
 * @param {{new(...args: any[]): U }} klass
 * @throws {Error}
 * @returns {asserts value is U}
 */
function assert(value, klass) {
  if (value instanceof klass) return;
  throw new Error(`Expected ${klass.name}`);
}

/**
 * @param {Element} element
 * @param {string[]} events
 * @param {(ev: Event) => unknown} handler
 */
function listen(element, events, handler) {
  /**
   * @param {Event} event
   */
  const listener = (event) => {
    handler(event);
  };

  for (const event of events) element.addEventListener(event, listener);
}
