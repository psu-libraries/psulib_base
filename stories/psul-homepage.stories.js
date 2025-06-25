import cardGrid from '../components/card_grid/card_grid.component.yml'
import heading from '../components/heading/heading.component.yml'
import footer from '../components/footer/footer.component.yml'
import newsCards from '../components/news_cards/news_cards.component.yml'
import imageTextOverlap from '../components/image_text_overlap/image_text_overlap.component.yml'

export default {
  title: 'PSU Libraries Homepage',
  render: () => {
    return `<div class="container-fluid">
      <div class="py-5 full-bleed full-bleed--slate-light">
        ${heading.component({ content: 'What can we help you find?', heading_html_tag: 'h1', heading_utility_classes: ['h3']})}
        <form class="row g-3">
          <div class="col-auto">
            <label for="search1" class="visually-hidden">Password</label>
            <input type="text" class="form-control" size="100" id="search1" placeholder="Search for books, articles, and more...">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">Search</button>
          </div>
          <div class="text-end">
            <ul class="list-inline">
              <li class="list-inline-item"><a href="#" class="btn btn-sm btn-link">Search Catalog > </a></li>
              <li class="list-inline-item"><a href="#" class="btn btn-sm btn-link">Search Databases > </a></li>
              <li class="list-inline-item"><a href="#" class="btn btn-sm btn-link">Search eJournals > </a></li>
              <li class="list-inline-item"><a href="#" class="btn btn-sm btn-link">Course Reserves > </a></li>
            </ul>
          </div>
        </form>
      </div>
      <div class="py-5">
        Quick links go here.
      </div>
      <div class="py-5 full-bleed full-bleed--navy">
        <div class="text-center">
          ${heading.component({ content: 'Research Help', heading_html_tag: 'h2', heading_utility_classes: ['h3', 'mb-4']})}
          <p class="mb-4">Not sure what to do? Contact one of our subject experts, ask for help to get on the right research path.</p>
          <a href="#" class="btn btn-outline-light">Get Help ></a> <a href="#" class="btn btn-outline-light">Research Resources ></a>

          ${cardGrid.component({
            title: 'Experts',
            items: [
              { card_title: 'Russel Hall', card_body: 'Business and Economics<br>Communcations<br>History', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
              { card_title: 'Sarah Hartman Caverly', card_body: 'Accounting<br>Business and Economics<br>Electrical Engineering', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
              { card_title: 'Andrea Pritt', card_body: 'Biochemistry<br>Biology<br>Engineering', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
            ],
          })}
        </div>
      </div>

      <div class="py-3 ">
        ${imageTextOverlap.component({
          image_src: '../.storybook/public/sample.jpg',
          title: 'J.Jeff Ungar',
          body: '<p>J.Jeff Ungar is the Special Collections Librarian for Cataloging and Metadata Services at Penn State University Libraries. He has been with the Libraries since 2010, and has a background in both library science and information technology.</p>',
          cta_button: {
            title: 'Learn More',
            url: '#'
          }
        })}
      </div>

      <div class="py-5 full-bleed full-bleed--limestone-light">
        ${cardGrid.component({
          title: 'Featured Collections',
          body: '<p>Explore our featured collections, showcasing unique and rare items from our archives.</p>',
          items: [
            { card_title: 'Historical Recipe Books', card_body: 'These unique handwritten recipe books (1697-1846) from the Eberly Family Special Collections Library include British and Scottish food recipes as well as medicinal and textile dying recipes.', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
            { card_title: 'The English Emblem Book Project', card_body: 'The English emblem books scanned for this project are cultural artifacts frequently used in the analysis of reading practices, printing history, Elizabethan popular culture, the use of allegory, and the relationship of word to image.', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
            { card_title: 'The People’s Contest', card_body: 'The People\'s Contest: A Civil War Era Digital Archive is a collaborative project of the Penn State University Libraries and the Richards Civil War Center.', card_image_src: '../.storybook/public/sample.jpg', card_link: '#', card_link_stretched: true },
          ],
        })}
      </div>

      ${newsCards.component({
        title: 'Library News',
        items: [
          { title: 'Read banned books', date: 'January 16, 2025', image: '../.storybook/public/sample.jpg', url: '#' },
          { title: 'Libraries writing retreat provides graduate students support, community', date: 'June 12, 2025', image: '../.storybook/public/sample.jpg', url: '#' },
          { title: 'Read banned books', date: 'January 16, 2025', image: '../.storybook/public/sample.jpg', url: '#' },
          { title: 'Read banned books', date: 'January 16, 2025', image: '../.storybook/public/sample.jpg', url: '#' },
        ],
        cta_button: {
          title: 'See More +',
          url: 'https://www.psu.edu/news/university-libraries'
        }
      })}

    </div>
    ${footer.component()}`;
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings)
  },
}

export const Basic = {}

          // - card_title: 'Card Title'
          //   card_body: 'Card body text goes here.'
          //   card_image_src: '../../.storybook/public/sample.jpg'
          //   card_image_alt: 'Image description'
          //   card_link_url: '#'
          //   card_link_text: 'Learn More'
