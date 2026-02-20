<?php

declare(strict_types=1);

namespace Drupal\psulib_base\Hook;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hooks for altering the Dynamic Hero.
 */
class SettingsFormAlterHook {
  use StringTranslationTrait;

  /**
   * Constructs the SettingsFormAlterHook object.
   */
  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
    private readonly ModuleHandlerInterface $moduleHandler,
  ) {}

  /**
   * Implements hook_preprocess_HOOK() for page.
   *
   * Add the federated footer to all pages.
   */
  #[Hook('form_system_theme_settings_alter')]
  public function preprocessPage(array &$form, FormStateInterface $form_state): void {
    $form['psulib_base_settings'] = [
      '#type' => 'details',
      '#title' => $this->t('PSU Library Base Settings'),
      '#description' => $this->t('Displaying Federated PSU Brand Bar and Footer
        requires the psulib_base_helper module to pull the Federated data from the
        API.'),
      '#open' => TRUE,
    ];

    $show_federated_footer_disabled = !$this->moduleHandler->moduleExists('psulib_base_helper');

    $form['psulib_base_settings']['show_federated_footer'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Federated Footer'),
      '#default_value' => $this->configFactory->get('psulib_base.settings')->get('show_federated_footer'),
      '#description' => $this->t('This setting controls whether the federated footer is displayed.'),
      '#disabled' => $show_federated_footer_disabled,
    ];

    $form['psulib_base_settings']['show_federated_brand_bar'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Federated Brand Bar'),
      '#default_value' => $this->configFactory->get('psulib_base.settings')->get('show_federated_brand_bar'),
      '#description' => $this->t('This setting controls whether the federated brand bar is displayed.'),
      '#disabled' => TRUE,
    ];

  }

}
