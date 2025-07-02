import cardGrid, {News as NewsCards} from '../components/card_grid/card_grid.component.yml'
import event from '../components/event/event.component.yml'
import footer, {Libraries as LibrariesFooter} from '../components/footer/footer.component.yml'
import header, {Libraries as LibrariesHeader} from '../components/header/header.component.yml'
import heading from '../components/heading/heading.component.yml'
import imageTextOverlap from '../components/image_text_overlap/image_text_overlap.component.yml'
import imageFile from '../.storybook/public/sample.jpg';
import librarySearch from '../components/library_search/library_search.component.yml';
import './page-preview.css'

// Explicitly importing grandchild components css since this is not properly
// imported by storybook.
import '../components/card/card.css';
import '../components/icon/icon.css';

export default {
  title: 'PSU Libraries Homepage',
  render: () => {return `<div class="remove-sb-margin">
    ${header.component({...LibrariesHeader.args})}

    <div class="container-fluid">
      <div class="pt-4 pb-1 full-bleed full-bleed--slate-light">
        ${librarySearch.component({
          title: 'What can we help you find?',
          placeholder: 'Search the catalog, articles, and more...',
          action: 'https://libraries.psu.edu/search/all',
          links: [
            { text: 'Search Catalog', url: '#' },
            { text: 'Search Databases', url: '#' },
            { text: 'Search eJournals', url: '#' },
            { text: 'Course Reserves', url: '#' },
          ],
        })}

      </div>
      <div class="py-3">
        ${cardGrid.component({
          card_link_stretched: true,
          card_type: 'icon',
          items: [
            { card_title: 'Rooms & Spaces', card_body: 'Find a place to study.', card_link: '#', card_icon: 'institution' },
            { card_title: 'Hours & Locations', card_body: 'Visit us when we\'re open.', card_link: '#', card_icon: 'alarm' },
            { card_title: 'Subject & Course Guides', card_body: 'Access library guides by our subject experts and instructors.', card_link: '#', card_icon: 'openBook' },
            { card_title: 'Citation Help', card_body: 'Get help citing your research.', card_link: '#', card_icon: 'help' },
            { card_title: 'Databases', card_body: 'Access thousands of our licensed databases.', card_link: '#', card_icon: 'barChart3' },
            { card_title: 'InterLibrary Loan', card_body: 'Borrow materials from other libraries.', card_link: '#', card_icon: 'email' },
          ],
        })}
      </div>
      <div class="py-5 full-bleed full-bleed--navy">
        <div class="text-center">
          ${heading.component({ content: 'Research Help', heading_html_tag: 'h2', heading_utility_classes: ['h3', 'mb-4']})}
          <p class="mb-4">Not sure what to do? Contact one of our subject experts, ask for help to get on the right research path.</p>
          <a href="#" class="btn btn-outline-light">Get Help ></a> <a href="#" class="btn btn-outline-light">Research Resources ></a>

          ${cardGrid.component({
            title: 'Experts',
            card_link_stretched: true,
            items: [
              { card_title: 'Russel Hall', card_body: 'Business and Economics<br>Communcations<br>History', card_image_src: imageFile, card_link: '#' },
              { card_title: 'Sarah Hartman Caverly', card_body: 'Accounting<br>Business and Economics<br>Electrical Engineering', card_image_src: imageFile, card_link: '#' },
              { card_title: 'Andrea Pritt', card_body: 'Biochemistry<br>Biology<br>Engineering', card_image_src: imageFile, card_link: '#' },
            ],
          })}
        </div>
      </div>

      <div class="py-3 ">
        ${imageTextOverlap.component({
          image_src: imageFile,
          title: 'J.Jeff Ungar',
          body: '<p>J.Jeff Ungar is the Special Collections Librarian for Cataloging and Metadata Services at Penn State University Libraries. He has been with the Libraries since 2010, and has a background in both library science and information technology.</p>',
          cta_button: {
            title: 'Learn More',
            url: '#'
          }
        })}
      </div>

      <div class="py-3 full-bleed full-bleed--limestone-light">
        ${cardGrid.component({
          title: 'Featured Collections',
          body: '<p>Explore our featured collections, showcasing unique and rare items from our archives.</p>',
          card_link_stretched: true,
          items: [
            { card_title: 'Historical Recipe Books', card_body: 'These unique handwritten recipe books (1697-1846) from the Eberly Family Special Collections Library include British and Scottish food recipes as well as medicinal and textile dying recipes.', card_image_src: imageFile, card_link: '#' },
            { card_title: 'The English Emblem Book Project', card_body: 'The English emblem books scanned for this project are cultural artifacts frequently used in the analysis of reading practices, printing history, Elizabethan popular culture, the use of allegory, and the relationship of word to image.', card_image_src: imageFile, card_link: '#' },
            { card_title: 'The People’s Contest', card_body: 'The People\'s Contest: A Civil War Era Digital Archive is a collaborative project of the Penn State University Libraries and the Richards Civil War Center.', card_image_src: imageFile, card_link: '#'},
          ],
        })}
      </div>

      ${cardGrid.component({
        title: 'Library News',
        ...NewsCards.args
      })}

      ${cardGrid.component({
        title: 'Library Events',
        card_link_stretched: true,
        cards: () => `
          ${event.component({ title: 'Penn State Brandywine - Virtual Spend a Summer Evening', date: 'Jun 16, 2025', time: '10:00 AM ET', location: 'Pattee Library, Room 101', cta_button: { title: 'Register', url: '#' } })}
          ${event.component({ title: 'Spend a Summer Evening Tour', date: 'July 1, 2025', time: '2:00 PM ET', location: 'Online', cta_button: { title: 'Register', url: '#' } })}
          ${event.component({ title: 'PSU Libraries Discovery Days', date: 'January 16, 2025', time: '9:00 AM ET', location: 'Pattee Library, Room 101', cta_button: { } })}
        `,
        cta_button: {
          title: 'See More +',
          url: 'https://www.psu.edu/news/university-libraries'
        }
      })}

    </div>
    ${footer.component({...LibrariesFooter.args})}</div>`;
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings)
  },
}

export const Basic = {}
