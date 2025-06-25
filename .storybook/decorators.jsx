// Global decorators.
const withGlobalWrapper = (Story) => `
  <div class="container">
    ${Story()}
  </div>
`;

const withBackground = (Story) => `
  <div class="bg-primary p-5">
    ${Story()}
  </div>
`;

export { withGlobalWrapper, withBackground };
