import cardGrid, {News as NewsCards} from '../components/card_grid/card_grid.component.yml';
import heading from '../components/heading/heading.component.yml';

import './page-preview.css'

// Explicitly importing grandchild components css since this is not properly
// imported by storybook.
import '../components/card/card.css';

const iconUsage = Object.entries({
  alarm: "TBD",
  assignment: "TBD",
  barChart3: "Use to indicate Library Databases.",
  bullhorn: "Indicates announcements or social media.",
  book_2: "TBD",
  book_ribbon: "TBD",
  bookmarks: "TBD",
  calendar: "Use for events, dates, or scheduling.",
  chevronRight: "Indicates navigation or moving forward.",
  computer: "Indicates there is an electronic resource.",
  crowdsource: "TBD",
  diversity_3: "TBD",
  docs: "Indicates there is a physical file or document.",
  edit_square: "Indicates editing or modifying content.",
  email: "Represents email, messaging, or contact.",
  fax: "Use for fax numbers or fax-related actions.",
  full_coverage: "Indicates newspaper search results.",
  globe: "TBD",
  globeBook: "Indicates Interlibrary Loan.",
  group: "TBD",
  help: "Use for help, support, or assistance.",
  info: "Represents information or details.",
  institution: "TBD",
  inventory: "Indicates Archives or Collections.",
  library_books: "TBD",
  linkOut: "Use for external links or resources.",
  locationPin: "Indicates locations, addresses, or maps.",
  map: "Represents maps, navigation, or directions.",
  menu_book: "TBD",
  newspaper: "Represents news, articles, or publications.",
  openBook: "TBD",
  person: "Indicates users, individuals, or profiles.",
  phone: "Represents phone numbers or contact by phone.",
  schedule: "Use to indicate library hours or scheduling.",
  school: "TBD",
  search: "Use for search, find, or lookup actions."
}).map(([iconName, description]) => ({
  card_title: iconName,
  card_body: description,
  card_icon: iconName,
  card_link: '#'
}));

export default {
  title: 'PSU Libraries: Icon Usage',
  render: () => {return `<div>

    ${heading.component({ content: 'Icon Usage', heading_html_tag: 'h1', heading_utility_classes: ['page-title', 'mb-4']})}

    <p>The following here is a list of icons available in the PSU Libraries design system, along with their intended usage within the libraries' websites.</p>

    ${cardGrid.component({
      card_link_stretched: true,
      card_type: 'icon',
      card_columns: 4,
      gap: 'sm',
      items: iconUsage,
    })}

    </div>`;
  },
}

export const Basic = {}
