import { computed, Injectable, signal } from '@angular/core';

export type MenuItem = {
  id: string;
  label: string;
  value: number;
};

export type Menu = {
  id: string;
  title: string;
  items: readonly MenuItem[];
};

type MenuSelections = Record<string, Record<string, boolean>>;

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  readonly menus: readonly Menu[] = [
    {
      id: 'breakfast',
      title: 'Завтрак',
      items: [
        { id: 'eggs', label: 'Яичница', value: 120 },
        { id: 'oatmeal', label: 'Овсянка', value: 90 },
        { id: 'coffee', label: 'Кофе', value: 60 },
      ],
    },
    {
      id: 'lunch',
      title: 'Обед',
      items: [
        { id: 'soup', label: 'Суп', value: 150 },
        { id: 'salad', label: 'Салат', value: 110 },
        { id: 'tea', label: 'Чай', value: 40 },
      ],
    },
    {
      id: 'dinner',
      title: 'Ужин',
      items: [
        { id: 'pasta', label: 'Паста', value: 220 },
        { id: 'fish', label: 'Рыба', value: 260 },
        { id: 'water', label: 'Вода', value: 20 },
      ],
    },
  ] as const;

  readonly activeMenuId = signal<string>(this.menus[0]?.id ?? '');

  private readonly selectionsByMenu = signal<MenuSelections>({});

  readonly activeMenu = computed<Menu | null>(() => {
    const id = this.activeMenuId();
    return this.menus.find((m) => m.id === id) ?? null;
  });

  readonly activeMenuTitle = computed(() => this.activeMenu()?.title ?? '');

  readonly selectedCount = computed(() => {
    const menu = this.activeMenu();
    if (!menu) return 0;
    const selected = this.selectionsByMenu()[menu.id] ?? {};
    return menu.items.reduce((acc, item) => acc + (selected[item.id] ? 1 : 0), 0);
  });

  readonly selectedTotalValue = computed(() => {
    const menu = this.activeMenu();
    if (!menu) return 0;
    const selected = this.selectionsByMenu()[menu.id] ?? {};
    return menu.items.reduce((acc, item) => acc + (selected[item.id] ? item.value : 0), 0);
  });

  setActiveMenu(menuId: string) {
    if (this.menus.some((m) => m.id === menuId)) {
      this.activeMenuId.set(menuId);
    }
  }

  isItemSelected(menuId: string, itemId: string): boolean {
    return !!this.selectionsByMenu()[menuId]?.[itemId];
  }

  setItemSelected(menuId: string, itemId: string, selected: boolean) {
    this.selectionsByMenu.update((prev) => ({
      ...prev,
      [menuId]: {
        ...(prev[menuId] ?? {}),
        [itemId]: selected,
      },
    }));
  }
}

