export class NavigationMenuPage {
  visitNavPrimaryMenu() {
    cy.visit("/");
    return cy.get("button[data-testid='nav-primary-menu-button']");
  }

  getDavidsThemeItem() {
    return cy.get("a[href='/theme/davids']");
  }

  getClassicThemeItem() {
    return cy.get("a[href='/theme/default']");
  }

  getCloseView() {
    return cy.get("button[data-testid='nav-primary-menu-close-button']");
  }
}
