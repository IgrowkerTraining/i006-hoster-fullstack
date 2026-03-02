export type TabRules<TItem, TTab extends string> = Partial<
    Record<TTab, ((item: TItem) => boolean) | null | undefined>
>;

/**
 * Filtra items según el tab activo.
 * - Si activeTab === allTab => devuelve items tal cual.
 * - Si no hay regla para ese tab => devuelve items tal cual (safe default).
 * - Si la regla es null/undefined => devuelve items tal cual.
 */
export function filterByTab<TItem, TTab extends string>(
    items: readonly TItem[],
    activeTab: TTab,
    rules: TabRules<TItem, TTab>,
    allTab: TTab
): TItem[] {
    if (activeTab === allTab) return [...items];

    const rule = rules[activeTab];
    if (!rule) return [...items];

    return items.filter(rule);
}