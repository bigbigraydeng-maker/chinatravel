'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export type TourTab = {
  id: string;
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: TourTab[];
  /** 默认打开哪个 —— 产品页默认是行程,那是访客第一个要看的东西 */
  defaultTabId: string;
};

/**
 * 产品页分页容器。
 *
 * 关键约束:**所有面板都渲染进 DOM,非当前页只用 CSS 隐藏**。
 * 常见做法是只渲染当前面板,但产品页有自然排名 —— 那样做等于把行程之外的
 * 内容从服务端 HTML 里删掉,Google 就抓不到了。内容全留,权重略低,好过丢失。
 *
 * 面板内容由服务端组件渲染后作为 props 传进来,所以分页不影响 SSR。
 */
export default function TourTabs({ tabs, defaultTabId }: Props) {
  const [active, setActive] = useState(
    tabs.some((t) => t.id === defaultTabId) ? defaultTabId : tabs[0]?.id
  );
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // tabs 是父组件内联构造的,每次渲染都是新引用。effect 不能依赖它,
  // 否则任何一次重渲染都会重跑「按锚点切页」,把手动切过页的访客拽回去。
  const tabIds = useRef(tabs.map((t) => t.id));
  tabIds.current = tabs.map((t) => t.id);

  /**
   * 带锚点进来时切到对应分页。
   * 不维护「锚点→分页」映射表 —— 直接在各面板里找这个 id,
   * 这样以后往面板里加带 id 的区块不用回来改这里。
   */
  useEffect(() => {
    const activateFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const owning = tabIds.current.find(
        (id) => id === hash || panelRefs.current[id]?.querySelector(`#${CSS.escape(hash)}`)
      );
      if (!owning) return;

      setActive(owning);
      // 等面板显示出来再滚,否则目标还是 display:none,量不到位置
      requestAnimationFrame(() => {
        const target = document.getElementById(hash) ?? panelRefs.current[owning];
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    activateFromHash();
    // 站内锚点链接是同文档跳转,组件不会重新挂载,只能靠 hashchange
    window.addEventListener('hashchange', activateFromHash);
    return () => window.removeEventListener('hashchange', activateFromHash);
  }, []);

  const selectTab = (id: string) => {
    setActive(id);
    // replaceState 而非 pushState —— 切分页不该塞满浏览器的后退历史
    window.history.replaceState(null, '', `#${id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    selectTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tour details"
        className="sticky top-16 z-20 -mx-4 mb-8 flex gap-1 overflow-x-auto border-b border-warm-200 bg-white/95 px-4 backdrop-blur md:mx-0 md:px-0"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition ${
                selected
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:border-warm-300 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          ref={(el) => {
            panelRefs.current[tab.id] = el;
          }}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          className="space-y-12"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
