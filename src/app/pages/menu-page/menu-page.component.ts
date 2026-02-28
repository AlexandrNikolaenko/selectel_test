import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { MenuStateService } from '../../menu-state/menu-state.service';

@Component({
  selector: 'app-menu-page',
  imports: [CurrencyPipe],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css',
})
export class MenuPageComponent {
  readonly state = inject(MenuStateService);

  onMenuSelect(menuId: string) {
    this.state.setActiveMenu(menuId);
  }

  onItemToggle(menuId: string, itemId: string, checked: boolean) {
    this.state.setItemSelected(menuId, itemId, checked);
  }
}

