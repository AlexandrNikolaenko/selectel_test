import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { MenuStateService } from './menu-state/menu-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly menuState = inject(MenuStateService);

  protected readonly isMenuPage = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url.startsWith('/menu')),
    ),
    { initialValue: this.router.url.startsWith('/menu') },
  );

  protected readonly headerTitle = computed(() => this.menuState.activeMenuTitle());
  protected readonly headerCount = computed(() => this.menuState.selectedCount());
  protected readonly headerTotal = computed(() => this.menuState.selectedTotalValue());
}
