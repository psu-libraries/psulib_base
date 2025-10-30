/**
 * @file
 * JavaScript for the card grid component.
 *
 * This script randomizes the order of cards in a card grid when the
 * `data-randomize-cards` attribute is set to true.
 * It uses the `once` utility to ensure the randomization happens only once
 * per page load.
 */
(function (Drupal, once) {
  Drupal.behaviors.randomizeCards = {
    attach: function (context, settings) {
      // Select the target list and ensure the behavior is applied only once.
      once('randomize-cards', '.card-grid--randomize-card', context).forEach(function (cardGrid) {
        let cards = cardGrid.querySelector('.card-grid__cards');
        const rows = Array.from(cards.children);
        // Shuffle the list rows.
        for (let i = rows.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        // Append the shuffled rows back to the list.
        rows.forEach(row => cards.appendChild(row));

        cardGrid.classList.add('cards-randomized');
      });
    }
  };
})(Drupal, once);
