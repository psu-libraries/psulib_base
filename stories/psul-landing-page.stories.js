import footer, { Libraries as LibrariesFooter } from '../components/footer/footer.component.yml'
import header, { Libraries as LibrariesHeader } from '../components/header/header.component.yml'
import dyanmicHero from '../components/dynamic_hero/dynamic_hero.component.yml';
import breadcrumbs from '../components/breadcrumbs/breadcrumbs.component.yml';
import inPageNav from '../components/in_page_nav/in_page_nav.component.yml';
import factTiles from '../components/fact_tiles/fact_tiles.component.yml';
import cardGrid, {News as NewsCards} from '../components/card_grid/card_grid.component.yml';

import './page-preview.css'

// Explicitly importing grandchild components css since this is not properly
// imported by storybook.
import '../components/card/card.css';

export default {
  title: 'PSU Libraries: Landing Page',
  render: () => {
    return `<div class="remove-sb-margin">
    ${header.component({ ...LibrariesHeader.args })}

    ${dyanmicHero.component({
      eyebrow: 'Research',
      title: 'Library Guides',
      body: 'Explore our resources, services, and collections to support your research and learning.',
      background_gradient: 'light',
      cta_button_first: {
        text: 'Explore Libraries',
        url: '#'
      },
      cta_button_second: {
        text: 'Get Help',
        url: '#'
      },
    })}

    ${inPageNav.component({
      title: 'Library Guides',
      cta_button_first: {
        text: 'View Guides',
        url: '#'
      },
      cta_button_second: {
        text: 'Find an Expert',
        url: '#'
      },
      items: [
        { title: 'Campus Details', url: '#Campus Details' },
        { title: 'Explore', url: '#Explore' },
        { title: 'Whats New', url: '#Whats New' },
        { title: 'Guides', url: '#Guides' },
        { title: 'Whats New', url: '#Whats New' },
        { title: 'More Guides', url: '#Guides' },
      ]
    })}

    <div class="container-fluid">
      ${breadcrumbs.component({
      items: [
        { text: 'Home', url: '/' },
        { text: 'Research', url: '/research' },
        { text: 'Library Guides', url: '' },
      ],
      classes: ['mb-3']
    })}
      <div class="row my-4">
        <div class="col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
          <p>Ipsum eu viverra montes lacinia felis blandit bibendum in. Erat duis tellus laoreet habitasse dolor. Id tortor nostra sem potenti ultrices. Blandit mollis nisi curabitur ultrices lectus pede ullamcorper pharetra magna morbi. Elit consectetur per vulputate litora lacus.</p>

          <p>Lectus id mauris odio auctor platea taciti eget montes diam netus per. Consequat integer mauris dictum class dis sed. Neque ridiculus sed aptent dignissim dui eleifend potenti. Porta nisl purus in curae cras ultricies dictumst ornare. Est habitant lacinia egestas massa nostra. Scelerisque magna dis nam parturient urna dictum mauris elementum congue. Si elit fusce est cras eros turpis euismod. Velit posuere venenatis magna phasellus sem nisi efficitur tincidunt viverra egestas etiam.</p>

          <p>Metus taciti volutpat dictumst proin turpis aenean molestie nullam ridiculus elit rutrum. Risus quis eleifend convallis amet vitae dapibus curae tellus. Placerat curae urna habitasse ut interdum. Auctor ligula condimentum hendrerit ridiculus turpis phasellus torquent. Praesent risus nec orci dictumst egestas quisque letius cubilia lorem ullamcorper. Mattis iaculis maecenas bibendum consectetur vel lobortis libero in. Phasellus ridiculus lorem mattis fermentum maecenas turpis urna feugiat suscipit commodo pede.</p>

          <p>Posuere neque ac vivamus eget vestibulum maecenas ullamcorper. Vulputate sed imperdiet nam fusce si curae lorem habitant feugiat volutpat. Elementum litora massa phasellus luctus conubia bibendum. Mattis quam interdum aliquet eleifend cras sagittis at.</p>

          <p>Blandit pharetra libero bibendum convallis ridiculus augue pellentesque class. Himenaeos nunc hendrerit accumsan sapien nec vulputate efficitur in dis. Ullamcorper eros auctor dis sociosqu arcu nulla. Ligula nostra quisque aliquet nisl potenti. Lorem class sociosqu vivamus dictum congue rhoncus. Sociosqu faucibus mus ultricies efficitur phasellus. Quam conubia maecenas blandit nostra sem vel per lectus. Pede maecenas rutrum imperdiet lectus dis ullamcorper.</p>

          <p>Dictumst ex dis himenaeos aliquam ridiculus in litora etiam est. Pharetra libero himenaeos consectetur hac letius sed. Quisque inceptos lectus tellus mus luctus ac sed cras. Luctus rhoncus velit per netus vestibulum vitae ut vehicula lobortis enim auctor.</p>
        </div>
      </div>
    </div>


    ${footer.component({ ...LibrariesFooter.args })}</div>`;
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings)
  },
}

export const ImpactPage = {
  title: 'PSU Libraries: Impact',
  render: () => {return `<div class="remove-sb-margin">
    ${header.component({...LibrariesHeader.args})}

    ${dyanmicHero.component({
      eyebrow: 'Giving',
      title: 'Your Donations at Work',
      body: 'There are a number of ways to support the University Libraries, and your choice to make a gift is much more than a financial transaction; it’s personal.',
      background_gradient: 'light',
      cta_button_first: {
        text: 'Ways to Give >',
        url: '#'
      },
      cta_button_second: {
        text: 'Endowments',
        url: '#'
      },
    })}

    ${inPageNav.component({
      title: 'Give Now',
      cta_button_first: {
        text: 'Give Today',
        url: '#'
      },
      cta_button_second: {
        text: 'Impact',
        url: '#'
      },
      items: [
        { title: 'Stats', url: '#Campus Details' },
        { title: 'Stories', url: '#Explore' },
      ]
    })}

    <div class="container-fluid">
      <div class="row my-4">
        <div class="col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
          <h2>Your Gift Matters</h2>
          <p>Ipsum eu viverra montes lacinia felis blandit bibendum in. Erat duis tellus laoreet habitasse dolor. Id tortor nostra sem potenti ultrices. Blandit mollis nisi curabitur ultrices lectus pede ullamcorper pharetra magna morbi. Elit consectetur per vulputate litora lacus.</p>

          <p>Your support of these priorities enables us to continue creating a vibrant Community, fostering collaborative learning Commons, and preserving invaluable and diverse Collections for future generations.</p>
        </div>
      </div>
      <div class="pt-4 pb-1 full-bleed full-bleed--navy">
        ${factTiles.component({
          title: 'By the Numbers',
          body: 'Placerat orci habitant malesuada vestibulum letius iaculis feugiat sapien. Fermentum vitae nullam tristique tempor integer semper diam hendrerit aliquam venenatis. A pede eros ultricies ridiculus placerat. Consequat fames letius odio consectetuer nisi rhoncus sodales senectus elementum curabitur amet. Sapien maecenas hendrerit netus aliquam donec quam. Dapibus congue lorem ornare vitae lobortis inceptos maecenas commodo accumsan. Massa mus arcu gravida taciti sem pretium.',
          items: [
            {stat: '$1.44B', title: 'In annual research expenditures.'},
            {stat: 'Top 6%', title: 'Globally in employer reputation and career outcomes.', description: 'QS World University Rankings, 2026'},
            {stat: '800K+', title: 'Alumni network that connects you for life.'},
            {stat: '123', title: 'Sesame st'},
            {stat: '2.4B', title: 'Books in our Collection'},
            {stat: '2.4B', title: 'Books in our Collection'}
          ]
        })}

      </div>

      ${cardGrid.component({
        title: 'Library News',
        ...NewsCards.args
      })}

    </div>
    ${footer.component({...LibrariesFooter.args})}</div>`;
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings)
  },
}

export const Basic = {}
